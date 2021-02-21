const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
    UserRegister,
    UserLogin,
    GenerateJWT
} = require('../service/user');

const middlewareAuth = async (req, res, next) => {
    const {
        JWT_SECRET
    } = process.env;

    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(401).json({
            message: 'Need authorization for this endpoint'
        });
    }

    const splittedToken = bearerHeader.split(' ');

    try {
        await jwt.verify(splittedToken[1], JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    next();
}

router.get('/', (_, res) => {
    return res.status(200).json("OK");
});

router.post('/check_token', middlewareAuth, (_, res) => {
    return res.status(200).json({
        message: "Token Active"
    });
});

router.post("/register", async (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (username === '' || password === '') {
        return res.status(400).json({
            message: "Input field should not be empty"
        });
    }

    const {
        success,
        error
    } = await UserRegister({
        username,
        password
    });

    if (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

    if (!success) {
        return res.status(400).json({
            message: "User had been registered before"
        });
    }

    return res.status(200).json({
        message: "Register success."
    });
});

router.post("/login", async (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (username === '' || password === '') {
        return res.status(400).json({
            message: "Input field should not be empty"
        });
    }

    const {
        success,
        error
    } = await UserLogin({
        username,
        password
    });

    if (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

    if (!success) {
        return res.status(401).json({
            message: "Username or password is wrong"
        });
    }

    const {
        token,
        error: err
    } = await GenerateJWT({
        username
    });

    if (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

    return res.status(200).json({
        token,
        payload: {
            username
        }
    });

});

module.exports = router;