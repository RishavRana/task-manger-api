const express = require("express");
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");

require("./db/mongoose");

const userRouter = require("./routers/users");
const taskRouter = require("./routers/tasks");
const app = express();
const port = process.env.PORT;

// app.use((req, res, next) => {
// if (req.method === "GET") {
//     return res.send("Cant get through");
// }
// next();
// });
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log("Server is up and running on " + port);
});

// const tasks = require("./models/tasks");
// const User = require("./models/users");

// const main = async() => {
// const task = await tasks.findById("63169752cb85700884158d71");
// await task.populate("owner").execPopulate();
// console.log(task.owner);

//     const user = await User.findById("63161d7a3df662451ce7bf72");
//     await user.populate("tasks").execPopulate();
//     console.log(user.tasks);
// };
// main();
// const bcrypt = require("bcrypt");
// const myFunction = async() => {
//     const password = "red1234!";
//     const hashedPass = await bcrypt.hash(password, 8);
//     console.log(hashedPass);

//     const isMatch = await bcrypt.compare("Red!2213", hashedPass);
//     console.log(isMatch);
// };

// myFunction();

// const myFun = async() => {
//     const token = jwt.sign({ _id: "web" }, "tokenId", { expiresIn: "2 minutes" });
//     console.log(token);

//     const verify = jwt.verify(token, "tokenId");
//     console.log(verify);
// };
// myFun();

// const multer = require("multer");
// const upload = multer({
//     dest: "images",
//     limits: {
//         fileSize: 1000000,
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error("Can only accept word Files !!!"));
//         }
//         cb(undefined, true);
//     },
// });
// app.post("/upload", upload.single("upload"), (req, res) => {
//     res.send(req.body);
// });