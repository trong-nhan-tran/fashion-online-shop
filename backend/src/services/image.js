const db = require("../models/index");

exports.getImageWithColor = (product_id) => new Promise(async (resolve, reject) => {
    try {
        const imageColor = await db.Image.findAll({
            where: {
                product_id: product_id,
            },
            include:[
                {
                    model: db.Product,
                    attributes: ["product_name"],
                    as: "productData"
                },
                {
                    model: db.Color,
                    as: "colorData"
                }
            ]
        });

        resolve({
            err: imageColor.length? 0: 1,
            mess: imageColor.length? "Got": "Product color is empty",
            imageColor: imageColor
        })

    } catch (error) {
        console.log(error)
        reject(error);
    }

});

exports.getImageAndGroupByColor = (product_id) => new Promise(async (resolve, reject) => {
    try {
        const imageColor = await db.Image.findAll({
            where: {
                product_id: product_id,
            },
            attributes:{
                exclude: ["createdAt", "updatedAt"],

            },
            include:[
                {
                    model: db.Color,
                    attributes: ["color_name"],
                    as: "colorData"
                }
            ]
        });

        // Phân loại hình ảnh theo màu sắc
        let colorGroups = imageColor.reduce((groups, image) => {
            let colorID = image.color_id;
            if (!groups[colorID]) {
                groups[colorID] = [];
            }
            groups[colorID].push(image);
            return groups;
        }, {});

        resolve({
            err: imageColor.length? 0: 1,
            mess: imageColor.length? "Got": "Product color is empty",
            imageColor: colorGroups
        })

    } catch (error) {
        console.log(error)
        reject(error);
    }
})


exports.createImage = ({product_id, color_id, image_path}) => new Promise(async (resolve, reject) => {
    try {
        const [image, created] = await db.Image.findOrCreate(
            {
                where: {product_id, color_id, image_path},
                defaults:{
                    product_id,
                    color_id: +color_id,
                    image_path
                }
            }
        );

        resolve({
            err: created? 0: 1,
            mess: created? "Created a successful image": "Image already exists",
            image: image
        })

    } catch (error) {
        reject(error);
    }

})

exports.deleteImage = ({product_id, color_id, image_path}) => new Promise(async (resolve, reject) => {
    try {
        const image = await db.Image.findOne({where: {product_id, color_id, image_path}});
        if (image) {
            await image.destroy();
            resolve({
                err: 0,
                mess: "Image deleted successfully",
                image: image
            });
        } else {
            resolve({
                err: 1,
                mess: "Image not found",
                image: null
            });
        }
    } catch (error) {
        reject(error);
    }
});
