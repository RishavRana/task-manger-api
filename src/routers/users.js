const express = require("express");
const User = require("../models/users");
const auth = require("../middlewares/auth");

const sharp = require('sharp')
const multer = require("multer");

const { sendWelcomeMail, sendCancelMail } = require('../emails/account')

const router = new express.Router();

//USER TABLE/DOCUMENT ENDPOINT_______

//Create a user in User table....

router.post("/users", async(req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        sendWelcomeMail(user.email, user.name)
        const token = await user.generateToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(404).send(e);
    }
});

//User Login Endpoint

router.post("/users/login", async(req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateToken();
        // res.send({ user: user.getPublicData(), token });
        res.send({ user, token });
    } catch (e) {
        res.status(404).send();
    }
});

//Logout User

router.post("/users/logout", auth, async(req, res) => {
    try {
        const user = await req.user;
        reqToken = await req.token;
        user.tokens = user.tokens.filter((token) => {
            return token.token !== reqToken;
        });
        await user.save();

        res.send();
    } catch (e) {
        res.status(404).send("Please Authenticate AGain");
    }
});

//logout ALL Users

router.post("/users/logoutAll", auth, async(req, res) => {
    try {
        const user = await req.user;
        user.tokens = [];
        await user.save();
        res.send();
    } catch (e) {
        res.status(404).send("ERROR!!!");
    }
});

//Find all Users of User table

router.get("/users/me", auth, async(req, res) => {
    try {
        const user = await req.user;
        res.send(user);
    } catch (e) {
        res.status(404).send("Please Authenticate");
    }
});

//Find User by its ID....

router.get("/users/:id", async(req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).send("user not find");
        }
        res.status(202).send(user);
    } catch (e) {
        res.status(404).send(e);
    }
});

//Update User Endpoint
router.patch("/users/me", auth, async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "age", "email", "password"];
    const isValidUpdate = updates.every((updates) =>
        allowedUpdates.includes(updates)
    );
    if (!isValidUpdate) {
        return res.status(405).send("Error:  Invalid Update!!");
    }

    try {
        const user = await req.user;
        const userUpdate = await User.findById(user._id);

        updates.forEach((update) => (userUpdate[update] = req.body[update]));
        await userUpdate.save();

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true,
        // });

        // if (!userUpdate) {
        //     res.status(400).send("No User Found");
        // }

        res.status(201).send(userUpdate);
    } catch (e) {
        res.status(404).send(e);
    }
});

//Delete User By its ID

router.delete("/users/me", auth, async(req, res) => {
    try {
        const user = await req.user;
        // const userD = await User.findByIdAndDelete(user._id);
        // if (!userD) {
        //     return res.status(400).send("Cannot find User");
        // }
        if (!user) {
            return res.status(404).send("Already Deleted");
        }
        await user.remove();
        sendCancelMail(user.email, user.name)

        res.send(user);
    } catch (e) {
        res.status(404).send({ error: "Unwanted Error" });
    }
});

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload a Image"));
        }
        cb(undefined, true);
    },

});

router.post("/users/me/avatar", auth, upload.single("avatar"), async(req, res) => {
    const user = await req.user
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

    user.avatar = buffer
    await user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ Error: error.message })
})

router.delete("/users/me/avatar", auth, async(req, res) => {
    const user = await req.user
    user.avatar = undefined
    await user.save()
    res.send()
})

router.get("/users/:id/avatar", async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error("CAnt Find USER oR its PROFILE PIC")
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(400).send({ Error: error.message })
    }
})


module.exports = router;