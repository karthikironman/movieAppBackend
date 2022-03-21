
const connections = require("../../database/mongo.connection.js");
const model = require("../../database/models/schema");
const { ObjectId } = require("mongodb");
const recordPhoneOtp = (phone, otp) => {
    const mainFunction = (resolve, reject) => {
        let params = { phone, otp };
        //using update to maintain unique record
        connections.ExecuteUpdateQuery(model.otps, { phone }, params).then(data => {
            resolve(data)
        }).catch((err) => { reject(err) })
    }
    return new Promise(mainFunction)
}
const getPhoneOtpRecordByPhone = (phone) => {
    const mainFunction = (resolve, reject) => {
        let params = { phone };
        connections.ExecuteSelectQuery(model.otps, params).then(data => {
            resolve(data)
        }).catch((err) => { reject(err) })
    }
    return new Promise(mainFunction)
}
const getPhoneOtpRecordByPhoneNOtp = (phone, otp) => {
    try {
        const mainFunction = (resolve, reject) => {
            let params = { phone, otp };
            connections.ExecuteSelectQuery(model.otps, params).then(data => {
                resolve(data)
            }).catch((err) => { reject(err) })
        }
        return new Promise(mainFunction)
    } catch (err) {
        console.log('error pa -', err)
    }

}

module.exports = {
    recordPhoneOtp,
    getPhoneOtpRecordByPhone,
    getPhoneOtpRecordByPhoneNOtp
}