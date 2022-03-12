const express = require('express');
const {Device, validate} = require('../models/devices');
const router = express.Router();
const Joi= require('joi')

const validationMiddleware=require('../middleware/jwtvalidation');


//Get All Electronics Devices
router.get('/',async(req,res) =>{
    try{
        const devices = await Device.find()
        res.json(devices)
    }
    catch(err){
        res.send('Error' + err)
    }
})

//Add Filter,limit 
router.get('/', async(req,res)=>{

    const {name, price, companyname,limit}= req.query;

    let filter={};
    if(name) {
    filter.name= { $regex: `${title}`, $options: 'i' };;
}
    if(companyname){
    filter.companyname== { $regex: `${title}`, $options: 'i' };;   
}
    

  if(isNaN(price)){
    filter.price= price
}
    let limitNumber= parseInt(limit)
    if(isNaN(limitNumber)){
    limitNumber=0
}
console.table(filter);

const devices=await Device
.find(filter).limit(limitNumber)
.select('DeviceName valuation CompanyName')

res.json(devices)
})
//Electronics Devices by Id
router.get('/:id',validationMiddleware.validJWTNeeded, async(req,res) =>{
    try{
        const devices = await Device.findById(req.params.id)
        res.json(devices)
    }
    catch(err){
        res.status(404).send('Error' + err)
    }
})

//Post Electronics Devices
router.post('/', validationMiddleware.validJWTNeeded,async(req,res)=> 
{

    console.table(req.body)

    const device = new Device({
        name:req.body.name,
        price: req.body.price,
        companyname: req.body.companyname
    })
    try{
        const d1 = await device.save();
        res.json(d1)
    }
    catch(err){
        res.status(500).json(err);
   }


})
//Put for Electronics Devices
router.put('/:id', async(req, res) =>
 {    
    const result = validate(req.body) 
    if (result.error)    
        {      res.status(400).json(result.error);      
           return; 
        } 
    try{    const devices = await Device.findByIdAndUpdate(req.params.id, req.body, 
    {new: true}
    );    
    if (devices)
    {        
        res.json(devices);      
    }      
      else{     
           res.status(404).json('Not found');     
         }    }  
      catch{    res.status(404).json('Not found: id is wrong');  
    }
}
);module.exports = router


//Delete function for Electronics Devices
router.delete('/:id' ,validationMiddleware.validJWTNeeded, async(req,res)=>{
    try{
        const device = await Device.findByIdAndDelete(req.params.id);
        res.send(device)
    }
    catch{
        res.send(404).json(`Device with id ${req.params.id} was not found`);
    }
});

module.exports = router