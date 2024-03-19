const db = require("../models/index");


exports.getSizeOfProduct = (id) => new Promise(async (resolve, reject) => {
    try {
        const productSize = await db.ProductSize.findAll({
            where: {product_id: id},
            attributes:{
                exclude: ["size_id"]
            },
            include:[
                {
                    model: db.Size,
                    as: "sizeData"
                }
            ]
        });

        // Extract colorData from the result
        const sizeData = productSize.map(item => item.sizeData);

        resolve({
            err: sizeData.length > 0 ? 0 : 1,
            mess: sizeData.length > 0 ? "Got" : "Product color is empty",
            sizeData: sizeData
        })

    } catch (error) {
        reject(error);
    }

})