const express = require('express');
const router = express.Router();
const { UserRegister, UserLogin } = require('../controllers/user');

router.get('/', (req, res) => {
    res.json("OK");
});

router.post("/register", UserRegister);

router.post("/login", UserLogin);

module.exports = router;