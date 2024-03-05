var express = require('express');
var router = express.Router();
const {checkSchema,query,param} = require('express-validator')
const {schemaProducts} =require('../utils/validators/productsValidatorSchema')
const productController = require('../controllers/products')

router.route('/')
.get(query('name').escape()
,query('page').escape()
,query('category').escape()
,productController.getAllProducts)  
.post(checkSchema(schemaProducts),productController.addProducts );

router.route('/:id')
.patch( productController.editProduct )

router.get('/details/:name', param('name').escape().trim(), productController.getProductByName)
router.get('/featured', productController.getFeaturedProducts)
router.get('/alsoLikeProduct', productController.getAlsoLikeProduct)
router.post('/upload', productController.upload)


module.exports = router;