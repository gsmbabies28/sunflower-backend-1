var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const { checkSchema, checkExact } = require("express-validator");
const {schemaUser} = require("../utils/validators/usersValidatorSchema");
const {schemaLogin} = require("../utils/validators/loginValidatorSchema");
const {verify,verifyAdmin} = require('../auth');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post(
  '/register', 
  checkSchema(schemaUser), 
  checkExact(), 
  userController.register
);

router.post(
  '/login', 
  checkSchema(schemaLogin), 
  checkExact(), 
  userController.login
);

router.get(
  '/getUserDetails', 
  verify,
  userController.getUserDetails
);

module.exports = router;
