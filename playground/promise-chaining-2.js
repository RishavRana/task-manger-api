require("../src/db/mongoose");
const Tasks = require("../src/models/tasks");

// Tasks.findOneAndDelete("62f3e76829b3952eb08deff9")
//     .then((task) => {
//         console.log(task);
//         return Tasks.countDocuments({ completed: false });
//     })
//     .then((task2) => {
//         console.log(task2);
//     })
//     .catch((e) => {
//         console.log(e);
//     });

const deleteTaskAndCount = async(id) => {
    await Tasks.findByIdAndDelete(id);
    const count = await Tasks.countDocuments({ completed: false });
    return count;
};

deleteTaskAndCount("62f412cf8fd02030189099db")
    .then((count) => {
        console.log(count);
    })
    .catch((e) => {
        console.log(e);
    });