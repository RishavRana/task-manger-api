const express = require("express");

const auth = require("../middlewares/auth.js");
const tasks = require("../models/tasks");

const router = new express.Router();

//TASKS DOCUMENT/TABLE ENDPOINTS____________

//Post data or create data in document.

router.post("/tasks", auth, async(req, res) => {
    // const task = new tasks(req.body);
    try {
        const user = await req.user;
        const task = new tasks({
            ...req.body,
            owner: user._id,
        });

        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

//Find all entrys of document.
// GET /tasks?completed=true
//GET  /tasks?limit=10&skip=10
//GET /tasks?sortBy=createdAt:desc

router.get("/tasks", auth, async(req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === "true";
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1; //terniary operator
    }

    try {
        const user = await req.user;
        // const task = await tasks.find({ owner: user._id });
        await user
            .populate({
                path: "tasks",
                match: match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort,
                },
            })
            .execPopulate();
        res.status(201).send(user.tasks);
    } catch (e) {
        res.send("ERROR in GET Task");
    }
});

//Find Task by its ID.

router.get("/tasks/:id", auth, async(req, res) => {
    const _id = req.params.id;
    try {
        // const task = await tasks.findById(_id);
        const user = await req.user;
        const task = await tasks.findOne({ _id, owner: user._id });
        if (!task) {
            return res.status(404).send("Given Id is incorrect !!!");
        }
        res.status(201).send(task);
    } catch (e) {
        res.send("ERROR in GET Task");
    }
});

//Update Task

router.patch("/tasks/:id", auth, async(req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidUpdate = updates.every((updates) =>
        allowedUpdates.includes(updates)
    );
    if (!isValidUpdate) {
        return res.status(405).send({ error: "Invalid Update!!" });
    }

    try {
        // const task = await tasks.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true,
        // });
        const user = await req.user;
        const task = await tasks.findOne({ _id, owner: user._id });

        updates.forEach((update) => {
            task[update] = req.body[update];
        });

        await task.save();

        if (!task) {
            return res.status(404).send("No task Found to update!!");
        }
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

//Delete Task

router.delete("/tasks/:id", auth, async(req, res) => {
    try {
        const user = await req.user;
        const task = await tasks.findOneAndDelete({
            _id: req.params.id,
            owner: user._id,
        });
        if (!task) {
            return res.status(400).send("Invalid Id");
        }
        res.send(task);
    } catch (e) {
        res.status(404).send(e);
    }
});

module.exports = router;