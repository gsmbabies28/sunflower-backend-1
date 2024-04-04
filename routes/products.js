var express = require('express');
var router = express.Router();
const {checkSchema,query,param,body, checkExact,oneOf} = require('express-validator')
const {schemaProducts} =require('../utils/validators/productsValidatorSchema');
const {searchValidatorSchema} = require('../utils/validators/searchValidatorSchema')
const productController = require('../controllers/products')

router.route('/')
.get(
    checkSchema(searchValidatorSchema,['query']),
    productController.getAllProducts 
)  
.post(
    checkSchema( schemaProducts ), 
    checkExact(), 
    productController.addProducts 
);

router.route('/:id')
.patch( body("*").escape(), productController.editProduct )
.get( param('id').escape(), productController.getProductByID )
.delete( productController.deleteProduct )

router.get('/details/:name', 
    param('name').trim().escape(),
    productController.getProductByName
);

router.get('/getProductsByArray', body('products').isArray(), productController.getProductsByArray );

router.get('/featured/all', productController.getFeaturedProducts)
router.get('/alsoLikeProduct/all', productController.getAlsoLikeProduct)
router.post('/upload', productController.upload)


module.exports = router;