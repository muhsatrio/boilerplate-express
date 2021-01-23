const userModel = require('../models/user');

const UserRegister = (req, res) => {
    const { username, password_1, password_2 } = req;
    console.log(username, password_1, password_2);
    return res.json("OK");
}

module.exports = {
    UserRegister
};