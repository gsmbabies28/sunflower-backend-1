var express = require('express');
var router = express.Router();
const {checkSchema,query,param,body} = require('express-validator')
const {schemaProducts} =require('../utils/validators/productsValidatorSchema')
const productController = require('../controllers/products')

router.route('/')
.get(query('name').escape()
,query('page').escape()
,query('category').escape()
,query('isAvailable').escape()
,query('color').escape()
,query('sort').escape()
,productController.getAllProducts )  
.post(checkSchema( schemaProducts ),productController.addProducts );

router.route('/:id')
.patch( productController.editProduct )
.get( param('id').escape(), productController.getProductByID )
.delete( productController.deleteProduct )

router.get('/details/:name', param('name').escape().trim(), productController.getProductByName),
router.get('/getProductsByArray', body('products').isArray(), productController.getProductsByArray );

router.get('/featured/all', productController.getFeaturedProducts)
router.get('/alsoLikeProduct/all', productController.getAlsoLikeProduct)
router.post('/upload', productController.upload)


module.exports = router;