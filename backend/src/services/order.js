const db = require("../models/index");
const { Op } = require('sequelize');


exports.getProductCart = (email) => new Promise(async (resolve, reject) => {
    let error = null;
    try {
        const cart = await db.Order.findOne(
            {
                where: {
                    email: email,
                    status_id: 1
                }
            }
        );

        if(cart){
            let {count, rows} = await db.OrderDetail.findAndCountAll({
                where: {
                    order_id: cart.order_id
                },
                include:[
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
            })

            resolve({
                err: error,
                mess: "Retrieved products from cart successfully",
                count: count,
                products: rows
            })
        }

    } catch (err) {
        error = err;
        console.log(error)
        reject(error);
    }
})


exports.placeOrder = ({order_id, customer_name, address, order_phone}) => new Promise(async (resolve, reject) => {
    let error = null;
    try {
        const cart = await db.Order.findOne({
            where: {
                order_id: order_id
            }
        });

        if (cart) {
            await cart.update({
                customer_name: customer_name,
                address: address,
                order_phone: order_phone,
                status_id: 2
            });

            resolve({
                err: 0,
                mess: "Place order successfully",
                order: cart
            });
        } else {
            resolve({
                err: 1,
                mess: "Not found cart",
                order: cart
            });
        }
    } catch (err) {
        error = err;
        console.log(error)
        reject(error);
    }
});

exports.getOrderHistory = (email) => new Promise(async (resolve, reject) => {
    let error = null;
    try {
        const orders = await db.Order.findAll({
            where: {
                email: email,
                status_id: {
                    [Op.ne]: 1
                }
            },
            include: [
                {
                    model: db.Status,
                    as: "statusData",
                    attributes: ["status_name"]
                },
                {
                    model: db.OrderDetail,
                    as: "orderDetailData",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                    include: [
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
            ]
        });

        resolve({
            err: orders?0: 1,
            mess: orders?"Get order history successfully": "Not found cart",
            orders: orders
        });
        

    } catch (err) {
        error = err;
        console.log(error)
        reject(error);
    }
});

exports.getAllOrder = ({ page, limit, order, search, ...query }) => new Promise(async (resolve, reject) => {
    let error = null;
    try {
        const queries = {raw: true, nest: true};
        const offset = (!page || +page<=1)? 0: (+page-1);
        const flimit = (+limit) || (+process.env.LIMIT_PRODUCT);
        queries.offset = offset * flimit;
        queries.limit = flimit;
        if (order) queries.order = [order];
        query.status_id = { [Op.ne]: 1 };
        if (search) {
            query = {
                ...query,
                [Op.or]: [
                    { customer_name: { [Op.substring]: search } },
                    { address: { [Op.substring]: search } },
                    { order_phone: { [Op.substring]: search } },
                    { '$statusData.status_name$': { [Op.substring]: search } }
                ]
            };
        }
        const {count, rows} = await db.Order.findAndCountAll({
            where: query,
            ...queries,
            include: [
                {
                    model: db.Status,
                    as: "statusData",
                    attributes: ["status_name"]
                },
                
            ]
        });

        resolve({
            err: rows?0: 1,
            mess: rows?"Get orders successfully": "Not found order",
            count: count,
            orders: rows
        });
        

    } catch (err) {
        error = err;
        console.log(error)
        reject(error);
    }
})
exports.getOneOrder = (order_id) => new Promise(async (resolve, reject) => {
    let error = null;
    try {
        
        const order = await db.Order.findByPk(order_id);

        resolve({
            err: order?0: 1,
            mess: order?"Get order successfully": "Not found order",
            orderData: order
        });
        

    } catch (err) {
        error = err;
        console.log(error)
        reject(error);
    }
})
exports.getUpdateStatusOrder = ({order_id, status_id}) => new Promise(async (resolve, reject) => {
    let error = null;
    try {
        
        let order = await db.Order.findByPk(order_id);
        if (order){
            await order.update({
                status_id: status_id
            })
            resolve({
                err: 0,
                mess: "Update status order successfully",
            });
        }

        else{
            resolve({
                err: 1,
                mess: "Not found order",
            });
        }
        

    } catch (err) {
        error = err;
        console.log(error)
        reject(error);
    }
})
exports.deleteOrder = (order_id) => new Promise(async (resolve, reject) => {
    try {
        let order = await db.Order.findByPk(order_id);

        if(order){
            await db.OrderDetail.destroy({
                where: {
                    order_id: order_id
                }
            });
            await order.destroy();
            resolve({
                err: 0,
                mess: "Deleted the order successfully",
            })
        }
        else{
            resolve({
                err: 1,
                mess: "Order does not exist",
            })
        }

    } catch (error) {
        console.log(error)
        reject(error);
    }

});