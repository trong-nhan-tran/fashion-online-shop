const db = require("../models/index");

exports.createColorOfProduct = ({product_id, color_name}) => new Promise(async (resolve, reject) => {
    try {
        const [color, created] = await db.Color.findOrCreate(
            {
                where: {color_name: color_name},
                defaults:{
                    color_name: color_name
                }
            }
        );
        
        if(color){
            const [product_color, product_color_created] = await db.ProductColor.findOrCreate(
                {
                    where: {
                        color_id : color.color_id,
                        product_id: product_id
                    },
                    defaults:{
                        color_id : color.color_id,
                        product_id: product_id
                    }
                }
            );

            resolve({
                err: product_color_created? 0: 1,
                mess: product_color_created? "Created a successfully color and add this color for product": "Product already exists this color",
                productColor: product_color
            })
        }
        

    } catch (error) {
        reject(error);
    }

})