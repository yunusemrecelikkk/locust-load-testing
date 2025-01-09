const express = require("express");
const app = express();
const PORT = 3000;
const HOSTNAME = "0.0.0.0";
const AUTH_TOKEN = "secret-token";

app.get("/login", (req, res) => {
    res.json({
        token: AUTH_TOKEN
    });
});

const loginMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token !== AUTH_TOKEN) {
        res.status(401).send("Unauthorized");
    } else {
        next();
    }
};

app.get("/secret", loginMiddleware, (req, res) => {
    res.send("Welcome to the secret page")
})

// Listen on all interfaces (0.0.0.0)
const server = app.listen(PORT, HOSTNAME, () => {
    const address = server.address();
    const host = address.address === HOSTNAME ? 'localhost' : address.address; // Adjust for 0.0.0.0
    console.log("Node server for Locust is up");
    console.log(`App URL: http://${host}:${address.port}`);
});