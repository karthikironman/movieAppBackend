
const connections = require("../../database/mongo.connection.js");
const model = require("../../database/models/schema");
const { ObjectId } = require("mongodb");
const addUser = (name, phone) => {
    const mainFunction = (resolve, reject) => {
        let params = { name, phone };
        connections.ExecuteInsertQuery(model.users, params).then(data => {
            resolve(data)
        }).catch((err) => { reject(err) })
    }
    return new Promise(mainFunction)
}
const delteUserById = (userId) => {
    const mainFunction = (resolve, reject) => {
        if (userId) {
            let params = {
                _id: ObjectId(userId)
            }
            connections.ExecuteDeleteQuery(model.users, params).then((data) => {
                resolve(data);
            }).catch((err) => { reject(err) })
        } else {
            reject('no userId found')
        }
    }
    return new Promise(mainFunction)
}
const updateUserOnboarding = (userId, data) => {
    const mainFunction = (resolve, reject) => {
        if (userId) {
            let params = {
                _id: ObjectId(userId),
            }
            data.modified = Date.now();
            connections.ExecuteUpdateOneQuery(model.users, params, data).then((data) => {
                resolve(data);
            }).catch((err) => { reject(err) })
        } else {
            reject('no userId found')
        }
    }
    return new Promise(mainFunction)
}
module.exports = {
    addUser,
    delteUserById,
    updateUserOnboarding
}