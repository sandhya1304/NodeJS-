const joi = require("joi");
// const val = require("validator")

const registerValidation = (data)=>{
    const Schema = joi.object({
        name : joi.string().required().min(2).max(8),
        email : joi.string().required().email(),
        mobile : joi.number().required().min(100000000).max(9999999999),
        password : joi.string().required().min(5).max(8)
    })

    return Schema.validate(data)

}

const loginvalidation = (data)=>{
    const Schema = joi.object({
        email:joi.string().email().required(),
        password : joi.string().required().min(5).max(8)
    })
    
return Schema.validate(data);

}

//Authntication
//otp and jwt

module.exports.registerValidation = registerValidation;
module.exports.loginvalidation = loginvalidation;