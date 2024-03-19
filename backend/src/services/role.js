const db = require("../models/index");
exports.getAllRole = () => new Promise(async (resolve, reject) => {
    try {
        const roles = await db.Role.findAll();

        resolve({
            err: roles? 0: 1,
            mess: roles? "Got": "Not found any role",
            roleData: roles
        })

    } catch (error) {
        reject(error); 
    }

})
