const db = require("../models/index");

exports.createSizeOfProduct = ({product_id, size_name}) => new Promise(async (resolve, reject) => {
    try {
        const [size, created] = await db.Size.findOrCreate(
            {
                where: {size_name},
                defaults:{
                    size_name
                }
            }
        );


        if(size){
            const [product_size, product_size_created] = await db.ProductSize.findOrCreate(
                {
                    where: {
                        size_id : size.size_id,
                        product_id: product_id
                    },
                    defaults:{
                        size_id : size.size_id,
                        product_id: product_id
                    }
                }
            );
            
            resolve({
                err: product_size_created? 0: 1,
                mess: product_size_created? "Created a successfully size and add this size for product": "Product already exists this size",
                productSize: product_size
            })

        }

    } catch (error) {
        reject(error);
    }

})