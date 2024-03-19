const db = require("../models/index");

exports.addProductToCart = ({ email, product_id, color_id, size_id, quantity }) => new Promise(async (resolve, reject) => {
    let error = null;
    try {
        const [cart, created] = await db.Order.findOrCreate(
            {
                where: {
                    email: email,
                    status_id: 1
                },
                defaults: {
                    email: email,
                    status_id: 1
                }
            }
        );

        if (cart) {
            let product = await db.OrderDetail.findOne({
                where: {
                    order_id: cart.order_id,
                    product_id: product_id,
                    color_id: color_id,
                    size_id: size_id
                }
            })

            if (product) {
                await product.update({ quantity: product.quantity + quantity });
                resolve({
                    err: error,
                    mess: "Product already exists in the cart, quantity updated",
                    product: product
                })
            } else {
                product = await db.OrderDetail.create({
                    order_id: cart.order_id,
                    product_id: product_id,
                    color_id: color_id,
                    size_id: size_id,
                    quantity: quantity
                });

                resolve({
                    err: error,
                    mess: "Add product to cart successfully",
                    product: product
                })
            }


        }

    } catch (err) {
        error = err;
        console.log(error)
        reject(error);
    }
})


exports.deleteProductFromCart = ({ order_id, product_id, color_id, size_id }) => new Promise(async (resolve, reject) => {
    let error = null;
    try {
        let product = await db.OrderDetail.findOne({
            where: {
                order_id: order_id,
                product_id: product_id,
                color_id: color_id,
                size_id: size_id
            }
        })

        if (product) {
            await product.destroy();
            resolve({
                err: error,
                mess: "Product removed from cart successfully",
                product: product
            })
        } else {
            resolve({
                err: error,
                mess: "Product not found in cart",
            })
        }


    } catch (err) {
        error = err;
        console.log(error)
        reject(error);
    }
})


exports.getOneOrderDetail = (order_id) => new Promise(async (resolve, reject) => {
    let error = null;
    try {
        const order_detail = await db.OrderDetail.findAll(
            {
                where: {
                    order_id: order_id
                },
                include:[
                    {
                        model: db.Order,
                        as: "orderData",

                    },
                    {
                        model: db.Product,
                        as: "productData",
                        attributes: ["product_name", "price"]
                    },
                    {
                        model: db.Color,
                        as: "colorData",
                        attributes: ["color_name"],
                        include: [
                            {
                                model: db.Image,
                                as: 'imageData',
                                attributes:["image_path"]
                            }
                        ]
                    },
                    {
                        model: db.Size,
                        as: "sizeData",
                        attributes: ["size_name"]
                    },
                ]
            }
        );

        resolve({
            err: order_detail? 0: 1,
            mess: order_detail? "Get order detail successfully": "Not found any products on order",
            orderDetailData: order_detail
        })
    

    } catch (err) {
        error = err;
        console.log(error)
        reject(error);
    }
})