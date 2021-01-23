const express = require('express');
const router = express.Router();
const { UserRegister } = require('../controllers/user');

router.get('/', (req, res) => {
    res.json("OK");
});

router.post("/register", UserRegister);

module.exports = router;