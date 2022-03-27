
const connections = require("../../database/mongo.connection.js");
const model = require("../../database/models/schema");
const { ObjectId } = require("mongodb");
const addUser = (name, phone, password) => {
    const mainFunction = (resolve, reject) => {
        let params = { name, phone, password };
        connections.ExecuteInsertQuery(model.users, params).then(data => {
            resolve(data)
        }).catch((err) => { reject(err) })
    }
    return new Promise(mainFunction)
}
const checkPhone = (phone) => {
    const mainFunction = (resolve, reject) => {
        let params = { phone };
        connections.ExecuteSelectQuery(model.users, params).then(data => {
            resolve(data)
        }).catch((err) => { reject(err) })
    }
    return new Promise(mainFunction)
}
module.exports = {
    addUser,
    checkPhone
}