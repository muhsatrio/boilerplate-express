const {user} = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserRegister = async (req, res) => {
    const { username, password } = req.body;

    console.log(username);

    const hashedPass = bcrypt.hashSync(password, saltRounds);

    try {

        const result = await user.findOne({
            where: {
                username
            },
            raw: true,
        });

        if (result!=null) {
            return res.status(400).json({
                status: 400,
                message: "Username sudah terdaftar, silahkan pilih username lain",
            })
        }

        await user.create({
            username,
            password: hashedPass,
        }, {
            fields: ['username', 'password']
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error,   
        });
    }

    return res.status(200).json({
        status: 200,
        message: "Success",
    });
}

const UserLogin = async (req, res) => {
    const { username, password } = req.body;

    try {

        let isAuthenticated = true;

        const result = await user.findOne({
            where: {
                username
            },
            raw: true,
        });

        if (result==null) {
            isAuthenticated = false;
        }

        else {
            isAuthenticated = bcrypt.compareSync(password, result.password);
        }

        if (!isAuthenticated) {
            return res.status(401).json({
                status: 401,
                message: "Username atau password salah, silahkan login kembali",
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error,   
        });
    }

    res.cookie('userLogged', username);

    console.log(req.cookies.userLogged);

    return res.status(200).json({
        status: 200,
        message: "Login Berhasil",
    });
}

module.exports = {
    UserRegister,
    UserLogin
};