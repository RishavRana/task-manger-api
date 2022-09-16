const mongoose = require("mongoose");

const validator = require("validator");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const Task = require("../models/tasks");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 18,
        validate(value) {
            if (value < 0) {
                throw new Error("Please provide a valid age");
            }
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("provide a valid email!!");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Pass does not contain Password!!!");
            }
        },
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true,
});

userSchema.virtual("tasks", {
    ref: "tasks",
    localField: "_id",
    foreignField: "owner",
});

//for using manual method getPublicData() change the name of toJSON to getPublicData
//toJSON is a automated method which change user that get sent automatically without password and tokens array.

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

//methods mrthod are created for instances(user)

userSchema.methods.generateToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

//Statics use to create method for  Model(User)

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to Login!!!");
    }
    return user;
};

//Hash encrypt plain text password before saving
userSchema.pre("save", async function(next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

userSchema.pre("remove", async function(next) {
    const user = this;
    await Task.deleteMany({
        owner: user._id,
    });
    next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;