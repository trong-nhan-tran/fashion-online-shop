const db = require("../models/index");
const { Op } = require('sequelize');
exports.getAllStatuses = () => new Promise(async (resolve, reject) => {
    try {
        const status = await db.Status.findAll({
            where: {
                status_id: {
                    [Op.ne]: 1
                }
            }
        });

        resolve({
            err: status? 0: 1,
            mess: status? "Got": "Not found any status",
            statusData: status
        })

    } catch (error) {
        reject(error); 
    }

})