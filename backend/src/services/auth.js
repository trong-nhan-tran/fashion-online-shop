const db = require("../models/index");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => brcypt.hashSync(password, brcypt.genSaltSync(10));
exports.register = ({ first_name, last_name, email, password }, res) => new Promise(async (resolve, reject) => {
    try {
        const [user, created] = await db.User.findOrCreate({
            where: { email: email },
            defaults: { email, first_name, last_name,
                password: hashPassword(password)
            }
        });
        const accessToken = created
            ? jwt.sign({ email: user.email, password: user.password, role_id: user.role_id }, 
                process.env.JWT_SECRET, { expiresIn: "7d" })
            : null;
        const refreshToken = created
            ? jwt.sign({ email: user.email }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: "10d" })
            : null;
        if (refreshToken) {
            await db.User.update({
                    refresh_token: refreshToken
                },
                {
                    where: { email: user.email }
                }
            )
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 10 * 60 * 60 * 1000 });
        }
        resolve({
            err: created ? 0 : 1,
            mess: created ? "Register successfully" : "Email is used",
            "accessToken": accessToken ? `Bear ${accessToken}` : null,
            "refreshToken": refreshToken ? `Bear ${refreshToken}` : null
        })
    } catch (error) {
        reject(error);
    }

})


exports.login = ({ email, password }, res) => new Promise(async (resolve, reject) => {
    try {

        const user = await db.User.findOne({
            where: { email: email },
            raw: true
        })

        const checkPassword = user && brcypt.compareSync(password, user.password)

        const accessToken = checkPassword
            ? jwt.sign({ email: user.email, password: user.password, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: "3d" })
            : null;

        const refreshToken = checkPassword
            ? jwt.sign({ email: user.email }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: "10d" })
            : null;

        const userRole = checkPassword ? user.role_id : null;
        if (refreshToken != null) {
            await db.User.update(
                {
                    refresh_token: refreshToken
                },
                {
                    where: { email: user.email }
                }
            )
            // Set the refreshToken in a HttpOnly cookie

            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 10 * 60 * 60 * 1000 });
        }
        resolve({
            err: accessToken ? 0 : 1,
            mess: accessToken ? "Login successfully" : user ? "Password is wrong" : "Email is not exist",
            "accessToken": accessToken ? `Bear ${accessToken}` : null,
            "refreshToken": refreshToken ? `Bear ${refreshToken}` : null,
            "role": userRole
        });


    } catch (error) {
        reject(error);
    }

})


exports.refreshTokenService = (refresh_token) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({
            where: { refresh_token }
        })

        if (!user) {
            resolve({
                err: 1,
                mess: "Refresh token is not exist"

            });
        }
        else {
            jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH_TOKEN, (err) => {

                if (err) {
                    resolve({
                        err: 1,
                        mess: "Refresh token is expired, require login"

                    });
                }
                else {
                    const newAccessToken = jwt.sign({ id: user.id, email: user.email, password: user.password, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15s" })
                    resolve({
                        err: newAccessToken ? 0 : 1,
                        mess: newAccessToken ? "OK" : "Fail to generate new access token",
                        "newAccessToken": `Bear ${newAccessToken}`

                    });

                }
            })
        }
    } catch (error) {
        reject(error);
    }

})



exports.logout = (refresh_token, res) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({
            where: { refresh_token }
        })

        if (!user) {
            resolve({
                err: 1,
                mess: "User not found"
            });
            return;
        }

        await db.User.update(
            {
                refresh_token: null
            },
            {
                where: { id: user.id }
            }
        )

        // Clear the refreshToken cookie
        res.clearCookie('refreshToken', { httpOnly: true, secure: true });

        resolve({
            err: 0,
            mess: "Logout successfully"
        });

    } catch (error) {
        reject(error);
    }

})



exports.updatePassword = ({ email, current_password, new_password }) => new Promise(async (resolve, reject) => {
    try {

        let user = await db.User.findOne({
            where: { email: email }
        });
        console.log(user)
        if (user) {
            const checkPassword = brcypt.compareSync(current_password, user.password);
            if (checkPassword) {
                await user.update({ password: hashPassword(new_password) });
                resolve({
                    err: 0,
                    mess: "Update password successfully"
                });
            }
            else {
                resolve({
                    err: 1,
                    mess: "Current password is wrong"
                });
            }

        } else {
            resolve({
                err: 1,
                mess: "Not found account"
            });
        }

    } catch (error) {
        reject(error);
    }

})
exports.updateInformation = ({ email, first_name, last_name, phone }) => new Promise(async (resolve, reject) => {
    try {

        let user = await db.User.findOne({
            where: { email: email }
        });
        console.log(user)
        if (user) {
            await user.update({
                first_name: first_name,
                last_name: last_name,
                phone: phone
            });
            resolve({
                err: 0,
                mess: "Update Information successfully"
            });

        } else {
            resolve({
                err: 1,
                mess: "Not found account"
            });
        }

    } catch (error) {
        reject(error);
    }

})