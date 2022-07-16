
const connections = require("../../database/mongo.connection.js");
const model = require("../../database/models/schema");
const addUser = (name, email, password,role) => {
    const mainFunction = (resolve, reject) => {
        let params = { name, email, password,role };
        connections.ExecuteInsertQuery(model.users, params).then(data => {
            resolve(data)
        }).catch((err) => { reject(err) })
    }
    return new Promise(mainFunction)
}
const getUser = () => {
    const mainFunction = (resolve,reject) => {
        connections.ExecuteSelectQuery(model.users,{}).then(data => {
            resolve(data)
        }).catch((err) => { reject(err) })
    }
    return new Promise(mainFunction)
}
const checkEmail = (email) => {
    const mainFunction = (resolve, reject) => {
        let params = { email };
        connections.ExecuteSelectQuery(model.users, params).then(data => {
            resolve(data)
        }).catch((err) => { reject(err) });
    }
    return new Promise(mainFunction)
}
const getByEmailNPassword = (email,password) => {
    const mainFunction = (resolve, reject) => {
        let params = { email,password };
        connections.ExecuteSelectQuery(model.users, params).then(data => {
            resolve(data)
        }).catch((err) => { reject(err) })
    }
    return new Promise(mainFunction)
}
module.exports = {
    addUser,
    checkEmail,
    getByEmailNPassword,
    getUser
}