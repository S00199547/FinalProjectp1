const mongoose = require('mongoose');
//const router= require('../routes/devices')
const Joi= require('joi');
const { string } = require('joi');

//Electronics Devices Schema
const deviceSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true

        
    },
    price: {
        type:Number,
        required:true

    },
    companyname:{
    type:String,
    required:true

    },
    nested:{person:{name:String,phone:Number}}
});


function validateDevice(device){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().integer().min(0),
        companyname: Joi.string(),
        person:Joi.object().keys({
            name:Joi.string(),
            phone:Joi.number()
        })
    })
    return schema.validate(device);
};

const Device=mongoose.model('Device' , deviceSchema)

exports.Device= Device

exports.validate=validateDevice;



