// import express and create instance
const express = require('express')
const app = express();

// serve a static website
app.use("/static", express.static("public"))

// serve a dynamic GET endpoint with text
app.get("/", (req, response) => {
    const message = `This a ${req.method} request from the browser.`;
    response.send(message)
})

// serve data in JSON format
app.get("/data", (req, res) => {
    const data = {
        method: req.method,
        num: Math.random(),
        str: "Hello, World!"
    }
    res.json(data);
})

module.exports = app;