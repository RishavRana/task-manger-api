const { findByIdAndUpdate, countDocuments } = require("../src/models/users");
const User = require("../src/models/users");

require("../src/db/mongoose");

const findUpdateAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age });
    const count = await User.countDocuments({ age: age });
    return count;
};

findUpdateAndCount("62f2cd5300607219b40f759f", 19)
    .then((count) => {
        console.log("2nd Upadate");
        console.log(count);
    })
    .catch((e) => {
        console.log(e);
    });

const update = async(id, name) => {
    const user = await User.findByIdAndUpdate(id, { name });
    return user;
};

update("62f2cd5300607219b40f759f", "RRR")
    .then((user) => {
        console.log(user);
    })
    .catch((e) => {
        console.log(e);
    });

// User.findByIdAndUpdate("62f2cd5300607219b40f759f", { name: "RRRR" })
//     .then((user1) => {
//         console.log(user1);
//         return User.countDocuments({});
//     })
//     .then((count) => {
//         console.log(count);
//     })
//     .catch((e) => {
//         console.log(e);
//     });