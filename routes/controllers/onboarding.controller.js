// const userService = require('../../services/v1/user.service');
const utils = require('../utils/utils');
const jwt = require('../../middleware/jwt');
const apply = async (req, reply) => {
    let msgs = {
        anonymous: 'anonymous error',
        successMsg: 'operation success',
        failedMsg: 'operation failed',
        invalid: 'missing or invalid payload'
    }
    try {
        let expectedArray = ['sex']
        let checkParam = utils.validateFieldLoop(req.body, expectedArray);
        if(checkParam){
            let validValues = ['male','female']
            checkParam = validValues.includes(req.body.sex);
        }
        if (!checkParam) {
            utils.sendResponseV1(false, msgs.invalid, 0, {}, "", reply);
        }
        if (!reply.sent) {
            let result = await userService.insertTemplateUser(req.body.sex);
            //construct token
            let tokenData = {
                id:result._id
            }
            let token = jwt.generateToken(tokenData)
            utils.sendResponseV1(true, msgs.successMsg, 1, {token}, "", reply);
        }
    } catch (err) {
        utils.sendResponseV1(false, msgs.failedMsg, 0, {}, err, reply);
    }
}
const deleteIncompleteUser = async (req,reply) => {
    let msgs = {
        anonymous: 'anonymous error',
        successMsg: 'operation success',
        failedMsg: 'operation failed',
        invalid: 'missing or invalid payload'
    }
    try{
        let token = req.headers.authorization;
        let tokenData = jwt.decodeJwtToken(token);
    let user_id = tokenData.id;
        let result = await userService.delteUserById(user_id);
        utils.sendResponseV1(true, msgs.successMsg, 0, result, "", reply);
    }catch(err){
        utils.sendResponseV1(false, msgs.failedMsg, 0, {}, err, reply);
    }
}
const updateUser = async (req,reply)=>{
    let msgs = {
        anonymous: 'anonymous error',
        successMsg: 'operation success',
        failedMsg: 'operation failed',
        invalid: 'missing or invalid payload'
    }
    try{
        let expectedArray = ["name","caste","height","weight","skin_tone","occupation","self_description"];
        expectedArray = [...expectedArray,"partner_expectation","salary","siblings","interests","location"];
        let checkParam = utils.validateFieldLoop(req.body,expectedArray);
        if(!checkParam){
            utils.sendResponseV1(false, msgs.invalid, 0, {}, msgs.invalid, reply);
        }else{
            let token = req.headers.authorization;
            let tokenData = jwt.decodeJwtToken(token);
            let user_id = tokenData.id;
            let result = await userService.updateUserOnboarding(user_id,req.body)
            utils.sendResponseV1(true, msgs.successMsg, 0, result, "", reply);
        }
    }catch(err){
        utils.sendResponseV1(false, msgs.failedMsg, 0, {}, err, reply);
    }
}
const addUser = async (req,reply)=>{
    //check the payload
    //validate the payload
    console.log(req.headers)
    let msg = {
        invalid: 'invalid payload / missing payload'
    }
    let requiredItems = ['name','phone','email'];
    let isValidPayload = utils.validateFieldLoop(req.body, requiredItems);
    if(isValidPayload){
        console.log('valid payload pa pb')
    }else{
        console.log('in valid payload pa pb')
    }
}

module.exports = {
    apply,
    deleteIncompleteUser,
    updateUser,
    addUser
}