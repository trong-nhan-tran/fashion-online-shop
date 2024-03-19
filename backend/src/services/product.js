const db = require("../models/index");
const { Op } = require("sequelize")


exports.getOneProduct = (product_id) => new Promise(async (resolve, reject) => {
    try {
        const product = await db.Product.findOne({
            where: {product_id : product_id},
            include: [
                {
                    model: db.Category,
                    as: "categoryData",
                },
                {
                    model: db.Type,
                    as: "typeData",
                }
            ]
        })

        resolve({
            err: product? 0: 1,
            mess: product? "Got": "Not found this product",
            productData: product
        })

    } catch (error) {
        reject(error);
    }

})

exports.getProducts = ({ page, limit, order,...query }) => new Promise(async (resolve, reject) => {
    try {
        const queries = {raw: true, nest: true};
        const offset = (!page || +page<=1)? 0: (+page-1);
        const flimit = (+limit) || (+process.env.LIMIT_PRODUCT);
        queries.offset = offset * flimit;
        queries.limit = flimit;

        const { search} = query;
        console.log(search)
        if (order) queries.order = [order];
        console.log(query)

        // Kiểm tra xem search có tồn tại hay không
        if (search) {
            query.product_name = {[Op.substring]: search};
        }

        const { count, rows } = await db.Product.findAndCountAll({
            where: query,
            ...queries,
            attributes:{
                exclude: ["category_id", "type_id"]
            },
            
        });

        resolve({
            err: rows? 0: 1,
            mess: rows? "Got": "Products list is empty",
            count: count,
            productList: rows
        })

    } catch (error) {
        console.log(error)
        reject(error);
    }

})





exports.getAllProducts = () => new Promise(async (resolve, reject) => {
    try {
        const products = await db.Product.findAll();

        resolve({
            err: products? 0: 1,
            mess: products? "Got": "Products list is empty",
            productList: products
        })

    } catch (error) {
        reject(error);
    }

})

exports.createProduct = ({product_name, description, price, category_id, type_id, thumbnail}) => new Promise(async (resolve, reject) => {
    try {
        const [product, created] = await db.Product.findOrCreate(
            {
                where: {product_name},
                defaults:{
                    product_name,
                    description,
                    price,
                    category_id: +category_id,
                    type_id : +type_id,
                    thumbnail
                }
            }
        );

        resolve({
            err: created? 0: 1,
            mess: created? "Created a successful product": "Product already exists",
            product: product
        })

    } catch (error) {
        reject(error);
    }

})

exports.updateProduct = ({product_id, product_name, description, price, category_id, type_id, thumbnail}) => new Promise(async (resolve, reject) => {
    try {
        let product = await db.Product.findByPk(product_id);

        if (product){
            await product.update({
                product_name: product_name,
                description: description,
                price: price,
                category_id: category_id,
                type_id: type_id,
                thumbnail: thumbnail
            })
            resolve({
                err: 0,
                mess: "Updated product",
                product: product
            })
        }else{
            resolve({
                err: 1,
                mess: "Not found this product",
                product: product
            })
        }


    } catch (error) {
        reject(error);
    }

})

exports.deleteProduct = (product_id) => new Promise(async (resolve, reject) => {
    try {
        const deleted = await db.Product.destroy(
            {
                where: {product_id: product_id},
                
            }
        );

        resolve({
            err: deleted? 0: 1,
            mess: deleted? "Deleted the product successfully": "Product does not exist",
        })

    } catch (error) {
        reject(error);
    }

});



