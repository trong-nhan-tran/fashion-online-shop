const db = require("../models/index");
const brcypt = require("bcrypt");
const { Op } = require("sequelize")


const hashPassword = (password) => brcypt.hashSync(password, brcypt.genSaltSync(10));

exports.getOneUser = (email) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({
            where: {email},
            attributes:{
                exclude: ["password"]
            },
            include:[
                {
                    model: db.Role, 
                    as: "roleData",
                }
            ]
        })

        resolve({
            err: user? 0: 1,
            mess: user? "Got": "Not found this user",
            userData: user
        })

    } catch (error) {
        reject(error);
    }

})

exports.getAllUser = ({ page, limit, order, search, ...query }) => new Promise(async (resolve, reject) => {
    try {
        const queries = {raw: true, nest: true};
        const offset = (!page || +page<=1)? 0: (+page-1);
        const flimit = (+limit) || (+process.env.LIMIT_PRODUCT);
        queries.offset = offset * flimit;
        queries.limit = flimit;
        if (order) queries.order = [order];
        if (search) {
            query = {
                ...query,
                [Op.or]: [
                    { first_name: { [Op.substring]: search } },
                    { last_name: { [Op.substring]: search } },
                    { email: { [Op.substring]: search } },
                    { '$roleData.role_name$': { [Op.substring]: search } }
                ]
            };
        }

        const { count, rows } = await db.User.findAndCountAll({
            where: query,
            ...queries,
            attributes:{
                exclude: ["password", "role_id", "refresh_token"]
            },
            include:[
                {
                    model: db.Role, 
                    as: "roleData",
                }
            ]
        });

        resolve({
            err: rows? 0: 1,
            mess: rows? "Got": "Not found any user",
            count: count,
            users: rows
        })

    } catch (error) {
        console.log(error)
        reject(error); 
    }

})



exports.updateUser = ({ first_name, last_name, email, phone, role_id }) => new Promise(async (resolve, reject) => {
    try {
        let user = await db.User.findByPk(email);
        if(user){
            await user.update({
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                role_id: role_id
            })
            resolve({
                err: 0,
                mess: "Updated user successfully"
            })
        }
        else{
            resolve({
                err: 1,
                mess: "Not found this user"
            })
        }

    } catch (error) {
        reject(error);
    }

});

exports.createUser = ({ first_name, last_name, email, phone, password, role_id }) => new Promise(async (resolve, reject) => {
    try {
        console.log(first_name, last_name, email, password);
        const newPassword = hashPassword(password);
        const [user, created] = await db.User.findOrCreate({
            where: { email: email },
            defaults: {
                email,
                phone,
                first_name,
                last_name,
                role_id,
                password: hashPassword(password)
            } 
        });


        resolve({
            err: created ? 0 : 1,
            mess: created ? "Create user successfully" : "Email is used",
        })

    } catch (error) {
        reject(error);
    }

})
exports.deleteUser = (email) => new Promise(async (resolve, reject) => {
    try {
        const deleted = await db.User.destroy({
            where: {email: email}
        });

        resolve({
            err: deleted ? 0 : 1,
            mess: deleted ? "Deleted user successfully" : "Not found this user",
        })

    } catch (error) {
        console.log(error)
        reject(error);
    }

})