// import express and create instance
const express = require('express')
const app = express();
const User = require("./models/User")

// use express.json()
app.use(express.json())

// create a new user through POST request
app.post("/", async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        if (!user) {
            throw new Error("No user created");
        }
        res.send(user.username);
    } catch (error) {
        next(error);
    }
})

// get all users - GET request
app.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll();
        if (!users) {
            throw new Error("No users found");
        }
        res.send(users);
    } catch (error) {
        next(error);
    }
})


// get ONE users - GET /:username request
app.get("/:username", async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { username: req.params.username}
        });
        if (!user) {
            throw new Error("No user found");
        }
        res.send(user);
    } catch (error) {
        next(error);
    }
})

// update a user - PUT /:username request
app.put("/:username", async (req, res, next) => {
    try {
        const updatedUser = await User.update(req.body, {
            where: { username: req.params.username}
        });
        console.log(updatedUser)
        if (updatedUser[0] === 0) { // means that no records were updated, success would be something like [1]
            throw new Error("No update made");
        }
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
})

// update a user - DELETE /:username request
app.delete("/:username", async (req, res, next) => {
    try {
        const deleted = await User.destroy({
            where: { username: req.params.username}
        });
        console.log(deleted)
        if (deleted === 0) { // means that no records were deleted, success would be something like 1
            throw new Error("No user deleted");
        }
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
})



module.exports = app;