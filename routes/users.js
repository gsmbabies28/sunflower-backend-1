var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');
const { checkSchema, checkExact } = require("express-validator");
const {schemaUser} = require("../utils/validators/usersValidatorSchema");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post(
  '/register', 
  checkSchema(schemaUser), 
  checkExact(), 
  userController.Register
);

module.exports = router;
