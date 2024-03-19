const db = require("../models/index");


exports.getAllCategories = () => new Promise(async (resolve, reject) => {
    try {
        const categories = await db.Category.findAll({
            attributes: ["category_id", "category_name"]
        });

        resolve({
            err: categories? 0: 1,
            mess: categories? "Got": "Categories is empty",
            categories: categories 
        })

    } catch (error) {
        reject(error);
    }

})

exports.createCategory = ({category_value}) => new Promise(async (resolve, reject) => {
    try {
        const [category, created] = await db.Category.findOrCreate(
            {
                where: {category_value},
                defaults:{
                    category_value
                }
            }
        );

        resolve({
            err: created? 0: 1,
            mess: created? "Created a successful category": "category already exists",
            category: category
        })

    } catch (error) {
        reject(error);
    }

})
