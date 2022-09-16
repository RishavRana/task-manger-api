// CRUD - create, read, update, delete

//npm i mongodb - cmd to install mongodb npm module.
const mongodb = require("mongodb");

//MongoClient gives up neccesary fn to connect our database.
const MongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;

const id = new objectId();
// console.log(id);
// console.log(id.getTimestamp());

// const connectionURL = process.env.MONGODB_URL
//connection to localhost url that is up and running by commanding /Users/public/mongodb/bin/mongod.exe --dbpath=/Users/public/mongodb-data

// database name
const databaseName = "task-manager";

//Here we used the connect method to connect to the specific server
MongoClient.connect(
    process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
        if (error) {
            return console.log(error);
        }

        //connecting the databse task-manager
        const db = client.db(databaseName);

        //Delete_________

        // db.collection("users")
        //     .deleteOne({ name: "Rana" })
        //     .then((result) => {
        //         console.log("Success!!");
        //     })
        //     .catch((error) => {
        //         console.log("Error!!");
        //     });

        //DeleteMany____

        // db.collection("users")
        //     .deleteMany({
        //         name: "Rana",
        //     })
        //     .then((result) => {
        //         console.log("Deleted", result.deletedCount);
        //     })
        //     .catch((error) => {
        //         console.log("Error!!");
        //     });

        //Update Many
        // db.collection("Tasks")
        //     .updateMany({
        //         completed: true,
        //     }, {
        //         $set: {
        //             completed: false,
        //         },
        //     })
        //     .then((result) => {
        //         console.log("Success!!", result.modifiedCount);
        //     })
        //     .catch((error) => {
        //         console.log("Error!!");
        //     });

        //Update One at a time
        // db.collection("users")
        //     .updateOne({
        //         _id: new objectId("62eea6777ae22c32d4487353"),
        //     }, {
        //         $set: {
        //             name: "sam",
        //             age: 28,
        //         },
        //     })
        //     .then((result) => {
        //         console.log("Success");
        //     })
        //     .catch((error) => {
        //         console.log("Error!!");
        //     });

        // db.collection("users")
        //     .updateOne({ _id: new objectId("62ed4b3b35d6ea06385a11a5") }, {
        // $set: {
        //     name: "mike",
        //     age: 24,
        // },
        //         $inc: {
        //             age: 1,
        //         },
        //     })
        //     .then((result) => {
        //         console.log("Success!!", result);
        //     })
        //     .catch((error) => {
        //         console.log("error!", error);
        //     });

        //Read  or Find from table to read.

        // db.collection("users").findOne({ _id: new objectId("62eea6777ae22c32d4487353") },
        //     (error, result) => {
        //         if (error) {
        //             return console.log("Error Encountered");
        //         }
        //         console.log(result);
        //     }
        // );
        // db.collection("users")
        //     .find({ age: 21 })
        //     .toArray((error, result) => {
        //         console.log(result);
        //     });
        // db.collection("users")
        //     .find({ name: "Rana" })
        //     .count((error, count) => {
        //         console.log(count);
        //     });

        // db.collection("Tasks")
        //     .find({ completed: false })
        //     .toArray((error, task) => {
        //         console.log(task);
        //     });

        // db.collection("users").insertOne({
        //         name: "Rana",
        //         age: 21,
        //     },
        //     (error, result) => {
        //         if (error) {
        //             return console.log(error);
        //         }
        //         console.log(result.ops);
        //     }
        // );

        //Inser many feilds at a time

        // db.collection("users").insertMany(
        //     [{
        //             name: "Jenny",
        //             age: 23,
        //         },
        //         {
        //             name: "John",
        //             age: 32,
        //         },
        //     ],
        //     (error, result) => {
        //         if (error) {
        //             return console.log("Got a Error");
        //         }
        //         console.log(result.ops);
        //     }
        // );

        // db.collection("Tasks").insertMany(
        //     [{
        //             task: "Laundry",
        //             completed: true,
        //         },
        //         {
        //             task: "Study",
        //             completed: false,
        //         },
        //     ],
        //     (error, result) => {
        //         if (error) {
        //             return console.log("GOt an Error");
        //         }
        //         console.log(result.ops);
        //     }
        // );

        //Insert One

        // db.collection("users")
        // .insertOne({
        //     name: "Rana",
        //     age: 23,
        // })
        // .then((result) => {
        //     console.log("Iserted!");
        // })
        // .catch((error) => {
        //     console.log("error!!");
        // });
    }
);