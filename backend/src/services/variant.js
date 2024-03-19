const db = require("../models/index");

exports.getVariantOfProduct = (product_id) => new Promise(async (resolve, reject) => {
    try {
        const variant = await db.Variant.findAll({
            where: {
                product_id: product_id,
            },
            include:[
                {
                    model: db.Product,
                    attributes: ["product_name", "thumbnail"],
                    as: "productData"
                },
                {
                    model: db.Color,
                    as: "colorData"
                },
                {
                    model: db.Size,
                    as: "sizeData"
                },
            ]
        });

        resolve({
            err: variant.length? 0: 1,
            mess: variant.length? "Got": "Variant of this product is empty",
            variantData: variant
        })

    } catch (error) {
        console.log(error)
        reject(error);
    }

})

exports.createVariant = ({product_id, color_id, size_id}) => new Promise(async (resolve, reject) => {
    try {
        const [variant, created] = await db.Variant.findOrCreate(
            {
                where: {
                    product_id: +product_id, 
                    color_id: +color_id, 
                    size_id: +size_id
                },
                defaults:{
                    product_id: +product_id,
                    color_id: +color_id,
                    size_id: +size_id,
                }
            }
        );

        resolve({
            err: created? 0: 1,
            mess: created? "Created a successful variant": "Variant already exists",
            variant: variant? variant: null
        })

    } catch (error) {
        console.log(error)
        reject(error);
    }

})

exports.deleteVariant = ({product_id, color_id, size_id}) => new Promise(async (resolve, reject) => {
    try {
        const variant = await db.Variant.findOne({
            where: {product_id, color_id, size_id}
        });
        if (variant) {
            await variant.destroy();
            resolve({
                err: 0,
                mess: "Variant deleted successfully",
                variant: variant
            });
        } else {
            resolve({
                err: 1,
                mess: "Variant not found",
                variant: null
            });
        }
    } catch (error) {
        reject(error);
    }
});
