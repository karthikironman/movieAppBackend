
let userService = require('../../services/v1/user.service');
let otpPhoneService = require('../../services/v1/otpPhone.service')
const utils = require('../utils/utils');
const jwt = require('../../middleware/jwt');
const sms = require('../utils/sms');
const { users } = require('../../database/models/schema');
const addUser = async (req, reply) => {
    let msg = {
        success: 'successful',
        invalid: 'invalid payload / missing payload',
        failure: 'failure',
        alreadyPresent: ' Phone number already present, please consider login'
    }
    try {
        //check the payload
        //validate the payload
        let requiredItems = ['name', 'email', 'role', 'password'];
        let isValidPayload = utils.validateFieldLoop(req.body, requiredItems);
        //can also add password validation here.... but let me skip it for now
        if (isValidPayload) {
            let { name, email, role, password } = req.body;
            let expectedRole = ['admin', 'operator'];
            let validRole = expectedRole.includes(role);
            let validEmail = utils.emailValidation(email);
            if (validRole && validEmail) {
                let existingEmailCount = await userService.checkEmail(email);
                if (existingEmailCount.length === 0) {
                    let result = await userService.addUser(name, email, password, role);
                    utils.sendResponseV1(true, msg.success, 0, result, "", reply)
                } else {
                    utils.sendResponseV1(false, msg.alreadyPresent, 0, "email already existing, please login", "", reply)
                }

            } else {
                utils.sendResponseV1(false, msg.invalid, 0, 'failed in validation', '', reply)
            }
        } else {
            utils.sendResponseV1(false, msg.invalid, 0, 'failed in validation', '', reply)
        }
    } catch (err) {
        utils.sendResponseV1(false, msg.failure, 0, 'failed', err, reply)
    }

}
const getUsers = async (req,reply) => {
    let msgs = {
       success:'success',
       failure:'failure'
    }
    try{
        let data = await userService.getUser();
        utils.sendResponseV1(false, msgs.success, 0, data, '', reply)
    }catch(err){
        utils.sendResponseV1(false, msgs.failure, 0, {}, '', reply)
    }
}
const login = async (req, reply) => {
    let msg = {
        success: 'login processes',
        wrongPassword: 'wrong password',
        emailNotRegistered: 'Phone Number doesnt exists, you must register first',
        invalid: 'invalid / Missing Parameters'
    }
    let requiredItems = ['email', 'password'];
    let isValidPayload = utils.validateFieldLoop(req.body, requiredItems);
    if (isValidPayload) {
        let { email, password } = req.body;
        let emailExists = await userService.checkEmail(email);
        if (emailExists.length == 0) {
            utils.sendResponseV1(true, msg.emailNotRegistered, 0, { registered: false, data: {} }, '', reply);
        } else {
            let loginInformation = await userService.getByEmailNPassword(email, password);
            if (loginInformation.length > 0) {
                utils.sendResponseV1(true, msg.success, 0, { registered: true, data: loginInformation, password: true }, '', reply);
            } else {
                utils.sendResponseV1(true, msg.wrongPassword, 0, { registered: true, data: loginInformation, password: false }, '', reply);
            }
        }
    } else {
        utils.sendResponseV1(false, msg.invalid, 0, {}, '', reply);
    }
}
module.exports = {
    addUser,
    getUsers,
    login
}


// const apply = async (req, reply) => {
//     let msgs = {
//         anonymous: 'anonymous error',
//         successMsg: 'operation success',
//         failedMsg: 'operation failed',
//         invalid: 'missing or invalid payload'
//     }
//     try {
//         let expectedArray = ['sex']
//         let checkParam = utils.validateFieldLoop(req.body, expectedArray);
//         if (checkParam) {
//             let validValues = ['male', 'female']
//             checkParam = validValues.includes(req.body.sex);
//         }
//         if (!checkParam) {
//             utils.sendResponseV1(false, msgs.invalid, 0, {}, "", reply);
//         }
//         if (!reply.sent) {
//             let result = await userService.insertTemplateUser(req.body.sex);
//             //construct token
//             let tokenData = {
//                 id: result._id
//             }
//             let token = jwt.generateToken(tokenData)
//             utils.sendResponseV1(true, msgs.successMsg, 1, { token }, "", reply);
//         }
//     } catch (err) {
//         utils.sendResponseV1(false, msgs.failedMsg, 0, {}, err, reply);
//     }
// }
// const deleteIncompleteUser = async (req, reply) => {
//     let msgs = {
//         anonymous: 'anonymous error',
//         successMsg: 'operation success',
//         failedMsg: 'operation failed',
//         invalid: 'missing or invalid payload'
//     }
//     try {
//         let token = req.headers.authorization;
//         let tokenData = jwt.decodeJwtToken(token);
//         let user_id = tokenData.id;
//         let result = await userService.delteUserById(user_id);
//         utils.sendResponseV1(true, msgs.successMsg, 0, result, "", reply);
//     } catch (err) {
//         utils.sendResponseV1(false, msgs.failedMsg, 0, {}, err, reply);
//     }
// }
// const updateUser = async (req, reply) => {
//     let msgs = {
//         anonymous: 'anonymous error',
//         successMsg: 'operation success',
//         failedMsg: 'operation failed',
//         invalid: 'missing or invalid payload'
//     }
//     try {
//         let expectedArray = ["name", "caste", "height", "weight", "skin_tone", "occupation", "self_description"];
//         expectedArray = [...expectedArray, "partner_expectation", "salary", "siblings", "interests", "location"];
//         let checkParam = utils.validateFieldLoop(req.body, expectedArray);
//         if (!checkParam) {
//             utils.sendResponseV1(false, msgs.invalid, 0, {}, msgs.invalid, reply);
//         } else {
//             let token = req.headers.authorization;
//             let tokenData = jwt.decodeJwtToken(token);
//             let user_id = tokenData.id;
//             let result = await userService.updateUserOnboarding(user_id, req.body)
//             utils.sendResponseV1(true, msgs.successMsg, 0, result, "", reply);
//         }
//     } catch (err) {
//         utils.sendResponseV1(false, msgs.failedMsg, 0, {}, err, reply);
//     }
// }