// import Router from express, create an instance of router
const { Router } = require("express")
const router = Router()
const checkPasswordStrength = require("../middleware/index")

const { check, validationResult } = require('express-validator') 

// const express = require("express")
// const router = express.Router()

const User = require("../models/User")

// change all instance of app to router

// create a new user through POST request
router.post("/", checkPasswordStrength, async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        if (!user) {
            throw new Error("No user created");
        }
        // updated responses to be in JSON format
        res.send({ user: user.username });
    } catch (error) {
        next(error);
    }
})

// get all users - GET request
router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll();
        if (!users) {
            throw new Error("No users found");
        }
        res.send({ users });
    } catch (error) {
        next(error);
    }
})


// get ONE users - GET /:username request
router.get("/:username", async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { username: req.params.username}
        });
        if (!user) {
            throw new Error("No user found");
        }
        res.send({ user });
    } catch (error) {
        next(error);
    }
})

// update a user - PUT /:username request
router.put("/:username", [check('username').not().isEmpty(), check('email').contains("@")], async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { 
            res.json({error: errors.array() })
        } else {
            const updatedUser = await User.update(req.body, {
                where: { username: req.params.username}
            });
            console.log({ updatedUser })
            if (updatedUser[0] === 0) { // means that no records were updated, success would be something like [1]
                throw new Error("No update made");
            }
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(erorr)
        next(error);
    }
})

// update a user - DELETE /:username request
router.delete("/:username", async (req, res, next) => {
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

// export router
module.exports = router;

