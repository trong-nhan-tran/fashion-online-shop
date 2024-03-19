const db = require("../models/index");
const { Op } = require("sequelize");

exports.getProductColor = (id) => new Promise(async (resolve, reject) => {
    try {
        const productColor = await db.ProductColor.findAll({
            where: {product_id: id},
            attributes:{
                exclude: ["color_id", "createdAt", "updatedAt"]
            },
            include:[
                {
                    model: db.Color,
                    as: "colorData",
                    attributes:{
                        exclude: ["createdAt", "updatedAt"]
                    },
                }
            ]
        });

        // Extract colorData from the result
        const colorData = productColor.map(item => item.colorData);

        resolve({
            err: colorData.length > 0 ? 0 : 1,
            mess: colorData.length > 0 ? "Got" : "Product color is empty",
            colorData: colorData
        })

    } catch (error) {
        reject(error);
    }

})
