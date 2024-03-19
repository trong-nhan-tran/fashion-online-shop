const db = require("../models/index");

exports.getAllTypes = () => new Promise(async (resolve, reject) => {
    try {
        const types = await db.Type.findAll({
            attributes: ["type_id", "type_name"]
        });

        resolve({
            err: types? 0: 1,
            mess: types? "Got": "Types is empty",
            types: types 
        })

    } catch (error) {
        reject(error);
    }

})

exports.createType = ({type_name}) => new Promise(async (resolve, reject) => {
    try {
        const [type, created] = await db.Type.findOrCreate(
            {
                where: {type_name},
                defaults:{
                    type_name
                }
            }
        );

        resolve({
            err: created? 0: 1,
            mess: created? "Created a successful type": "type already exists",
            type: type
        })

    } catch (error) {
        reject(error);
    }

})
