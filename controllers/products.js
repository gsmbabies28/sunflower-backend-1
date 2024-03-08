const { validationResult, matchedData } = require('express-validator');
var path = require('path');
const Products = require('../models/Products');


//[GET-section]
//get all active products
module.exports.getAllProducts = async (req, res) => {
    try {
        const result = validationResult(req)
        if(!result.isEmpty()) 
            return res.status(400).send({error: result.array()})
        const data = matchedData(req);
        // if(isNaN(data.page)||data.page==0)
        //     return res.status(400).send({error: "Invalid query parameter"})
        const pageNumber = parseInt(data.page); // Page number (1-based index)
        const pageSize = 16;
        const skip = (pageNumber - 1) * pageSize;
        let query;

        if(data.category){
            query = {category: data.category};
        }

        const products = await Products.find({name:{$regex: data.name,$options:'i'},isActive:true,...query}).sort({name:1}).skip(skip).limit(pageSize).exec()
        const totalPage = await Products.countDocuments(query);
        return res.status(200).send({msg: products, totalPage: Math.ceil(totalPage/pageSize)})
    } catch (error) {
        return res.status(500).send({error: error});
    }   
}

//get single active products
module.exports.getProductByName = async ( req, res ) => {
    try {
        const result = validationResult(req)
        if(!result.isEmpty()) 
            return res.status(400).send({error: result.array()})
        const data = matchedData(req);
        const trimmedData = data.name.replace(/[-]/g, ' ');
        console.log(trimmedData)
        const products = await Products.findOne({name:trimmedData,isActive:true})
        if(!products) 
            return res.status(404).send({msg:"No product found"});
        return res.status(200).send({msg: products})
    } catch (error) {
        return res.status(500).send({error: error});
    }   
}

//get product by ID
module.exports.getProductByID = async ( req, res ) => {
    try {
        const data = matchedData(req);
        const product = await Products.findById(data.id);
        if(!product) {
            return res.status(404).send({msg: 'No product found'})
        }
            return res.status(200).send({msg: product})
    } catch (error) {
        return res.sendStatus(500);
    }
}

// get featured products
module.exports.getFeaturedProducts = async (req, res) => {
    try {
        const products = await Products.aggregate([{$match:{isActive:true}},{$sample:{size:8}}])
        if(!products.length) return res.status(404).send({error: "Error in fetching data"}) 
        return res.status(200).send({msg: products})
    } catch (error) {
        return res.sendStatus(500);
    }
}

//get alsolikeproduct
module.exports.getAlsoLikeProduct = async (req, res) => {
    try {
        const products = await Products.aggregate([{$match:{isActive:true}},{$sample:{size:4}}])
        if(!products.length) return res.status(404).send({error: "Error in fetching data"}) 
        return res.status(200).send({msg: products})
    } catch (error) {
        return res.sendStatus(500);
    }
}

//get new Arrival products
module.exports.getNewArrival = async (req,res) => {
    try {
        const products = await Products.find({})
    } catch (error) {
        console.error(error);
        res.status(500).send("Someting went wrong")
    }
}

//[POST-section]

//add product 
module.exports.addProducts = async (req, res) => {
    
    try {
        const result = validationResult(req);
        if(result.isEmpty()){
            const data= matchedData(req)
            const product = await Products.create(data);
            return res.status(200).send({msg: product })
        }
         return res.status(400).send({error: result.array()})
    } catch (error) {
        return res.sendStatus(500);
    }
    
}


//[Patch-section]

module.exports.editProduct = async ( req, res ) => {

    const id = req.params.id
    try {
        const product = await Products.findByIdAndUpdate(id, {...req.body},{new:true});
        return res.status(200).send({msg: product})
    } catch (error) {
        return res.sendStatus(500) 
    }

}


module.exports.upload = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const uploadedFile = req.files.image
    const parentDir = path.resolve(__dirname, '..')
    const uploadPath = parentDir+'/public/images/' + uploadedFile.name;
    uploadedFile.mv(uploadPath, (err)=>{
        if(err) return res.status(500).send(err)
        return res.status(201).send({msg: uploadPath})
    })
}

//[Delete section]
module.exports.deleteProduct = ( req, res ) => {
    console.log('delete product')
}