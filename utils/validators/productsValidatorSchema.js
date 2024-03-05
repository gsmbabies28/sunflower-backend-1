const Products = require('../../models/Products');
module.exports.schemaProducts = {
    name: {
        notEmpty: {
            errorMessage: "Please input a product name"
        },
        isString: true,
        escape: true,
        custom : {
            options: async (value) => {
                const products = await Products.findOne({name:value})
                if(products){
                    throw new Error('Product already exist')
                }
            },
        }
    },
    size: {
        isString: true,
        escape: true,
    },
    price: {
        isNumeric: true,
    },
    category: {
        isString: true,
        escape: true
    },
    color: {
        isString: true,
        escape: true
    },
    img: {
        isString: true,
    }
}