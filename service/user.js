const {
    user
} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserRegister = async ({
    username,
    password
}) => {
    const {
        BCRYPT_SALT
    } = process.env;

    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT));
    const hashedPass = await bcrypt.hash(password, salt);

    try {
        const result = await user.findOne({
            where: {
                username
            },
            raw: true,
        });

        if (result != null) {
            return {
                success: false,
                error: null
            };
        }

        await user.create({
            username,
            password: hashedPass,
        }, {
            fields: ['username', 'password']
        });

        return {
            success: true,
            error: null
        };

    } catch (error) {
        return {
            success: false,
            error: error
        };
    }
}

const UserLogin = async ({
    username,
    password: passwordInput
}) => {
    try {
        const {
            password
        } = await user.findOne({
            where: {
                username
            },
            attributes: ['password'],
            raw: true,
        });

        if (!password) {
            return {
                success: false,
                error: null
            };
        }

        const isValid = await bcrypt.compare(passwordInput, password);

        if (!isValid) {
            return {
                success: false,
                error: null
            };
        }

    } catch (error) {
        return {
            success: false,
            error: error
        };
    }

    return {
        success: true,
        error: null
    };

}

const GenerateJWT = async ({
    username
}) => {
    const {
        JWT_EXPIRY_TIME,
        JWT_SECRET
    } = process.env;

    try {
        const token = await jwt.sign({
            username
        }, JWT_SECRET, {
            expiresIn: parseInt(JWT_EXPIRY_TIME) * 60 * 60
        });

        return {
            token,
            error: null
        };
    } catch (error) {
        return {
            token: null,
            error: error
        }
    }
}

module.exports = {
    UserRegister,
    UserLogin,
    GenerateJWT
};