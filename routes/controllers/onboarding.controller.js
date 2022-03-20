const onboardingService = require('../../services/v1/onboarding.service');
const utils = require('../utils/utils');
const jwt = require('../../middleware/jwt');
const sms = require('../utils/sms')
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
        if (checkParam) {
            let validValues = ['male', 'female']
            checkParam = validValues.includes(req.body.sex);
        }
        if (!checkParam) {
            utils.sendResponseV1(false, msgs.invalid, 0, {}, "", reply);
        }
        if (!reply.sent) {
            let result = await userService.insertTemplateUser(req.body.sex);
            //construct token
            let tokenData = {
                id: result._id
            }
            let token = jwt.generateToken(tokenData)
            utils.sendResponseV1(true, msgs.successMsg, 1, { token }, "", reply);
        }
    } catch (err) {
        utils.sendResponseV1(false, msgs.failedMsg, 0, {}, err, reply);
    }
}
const deleteIncompleteUser = async (req, reply) => {
    let msgs = {
        anonymous: 'anonymous error',
        successMsg: 'operation success',
        failedMsg: 'operation failed',
        invalid: 'missing or invalid payload'
    }
    try {
        let token = req.headers.authorization;
        let tokenData = jwt.decodeJwtToken(token);
        let user_id = tokenData.id;
        let result = await userService.delteUserById(user_id);
        utils.sendResponseV1(true, msgs.successMsg, 0, result, "", reply);
    } catch (err) {
        utils.sendResponseV1(false, msgs.failedMsg, 0, {}, err, reply);
    }
}
const updateUser = async (req, reply) => {
    let msgs = {
        anonymous: 'anonymous error',
        successMsg: 'operation success',
        failedMsg: 'operation failed',
        invalid: 'missing or invalid payload'
    }
    try {
        let expectedArray = ["name", "caste", "height", "weight", "skin_tone", "occupation", "self_description"];
        expectedArray = [...expectedArray, "partner_expectation", "salary", "siblings", "interests", "location"];
        let checkParam = utils.validateFieldLoop(req.body, expectedArray);
        if (!checkParam) {
            utils.sendResponseV1(false, msgs.invalid, 0, {}, msgs.invalid, reply);
        } else {
            let token = req.headers.authorization;
            let tokenData = jwt.decodeJwtToken(token);
            let user_id = tokenData.id;
            let result = await userService.updateUserOnboarding(user_id, req.body)
            utils.sendResponseV1(true, msgs.successMsg, 0, result, "", reply);
        }
    } catch (err) {
        utils.sendResponseV1(false, msgs.failedMsg, 0, {}, err, reply);
    }
}
const addUser = async (req, reply) => {
    let msg = {
        success: 'successful',
        invalid: 'invalid payload / missing payload',
        failure: 'failure'
    }
    try {
        //check the payload
        //validate the payload
        let requiredItems = ['name', 'phone'];
        let isValidPayload = utils.validateFieldLoop(req.body, requiredItems);
        if (isValidPayload) {
            let { name, phone } = req.body;
            console.log('valid payload pa pb');
            let result = await onboardingService.addUser(name, phone);
            utils.sendResponseV1(true, msg.success, 0, result, "", reply)
        } else {
            console.log('in valid payload pa pb');
            utils.sendResponseV1(false, msg.invalid, 0, 'failed in validation', '', reply)
        }
    } catch (err) {
        utils.sendResponseV1(false, msg.failure, 0, 'failed', err, reply)
    }

}
const sendOtp = async (req, reply) => {
    let msg = {
        success: 'successful',
        invalid: 'invalid payload / missing payload',
        failure: 'failure'
    }
    try {
        //check payload => check phone, check otp
        let requiredItems = ['phone'];
        let isValidPayload = utils.validateFieldLoop(req.body, requiredItems);
        if (isValidPayload) {
            let { phone } = req.body;
            let otp = utils.generateOTP(6);
            //send otp with external service (now vonage)
            let sms_message = `Your otp to register your profile in Cashinfy is ${otp}. Do not disclose your OTP to others.          `
            await sms.sendSMS(phone,sms_message)
            //record them in the db
            await onboardingService.recordPhoneOtp(phone,otp)
            utils.sendResponseV1(true, msg.success, 0, { phone }, "", reply);
        } else {
            utils.sendResponseV1(false, msg.invalid, 0, 'failed in validation', '', reply)
        }

    } catch (err) {
        utils.sendResponseV1(false, msg.failure, 0, 'failed', err, reply)
    }
}

module.exports = {
    apply,
    deleteIncompleteUser,
    updateUser,
    addUser,
    sendOtp
}