const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

// const tasks = mongoose.model("tasks", {
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     completed: {
//         type: Boolean,
//         required: false,
//         default: false,
//     },
// });