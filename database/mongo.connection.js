
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI

const authData = {
    "useNewUrlParser": true,
    "useUnifiedTopology":true
};
const dbMongoSaveConn = mongoose.connect(
    MONGODB_URI,authData,
    (err) => {
        console.log(err)
        if (!err) { console.log('MongoDB connection succeeded.'); }
        else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
    }
);
//Execute query
function ExecuteSelectQuery(collection, query, sort) {
    return new Promise(function (resolve, reject) {
        collection.find(query).sort(sort).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err, "err");
        });
    })
}
//Execute query
function ExecuteSelectQueryPopulate(collection, query,populate, sort) {
    return new Promise(function (resolve, reject) {
        collection.find(query).populate(populate).sort(sort).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err, "err");
        });
    })
}

//Execute aggregation query
function ExecuteAggregationQuery(collection, query, limit, offset, sort) {
    return new Promise(function (resolve, reject) {
        collection.aggregate([
            { $match: query },
            { "$sort": sort }, { "$skip": offset }, { "$limit": limit }
        ]).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err, "err");
        });
    })
}

//Execute query - update records
function ExecuteUpdateQuery(collection, condition, params) {
    return new Promise(function (resolve, reject) {
        collection.updateMany(condition, params, { upsert: true }).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err, "err");
        });
    })
}

//Execute query - update records
function ExecuteUpdateOneQuery(collection, condition, params) {
    return new Promise(function (resolve, reject) {
        collection.updateOne(condition, params, { upsert: true }).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err, "err");
        });
    })
}
//Execute query - insert new records
function ExecuteInsertQuery(collection, query) {
    return new Promise(function (resolve, reject) {
        collection.create(query).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err, "err");
        });
    })
}

//Insert many query - insert many records
function ExecuteInsertManyQuery(collection, query) {
    return new Promise(function (resolve, reject) {
        collection.insertMany(query).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err, "err");
        });
    })
}

//Execute query - remove
function ExecuteDeleteQuery(collection, query) {
    return new Promise(function (resolve, reject) {
        collection.deleteOne(query).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err, "err");
        });
    })
}

//Execute query with count
function ExecuteSelectQueryWithCount(collection, query) {
    return new Promise(function (resolve, reject) {
        collection.find(query).countDocuments().then(data => {
            resolve(data);
        }).catch(err => {
            reject(err, "err");
        });
    })
}

//Execute aggregation query with group
function ExecuteAggregationQueryWithGroupBy(collection, query) {
    return new Promise(function (resolve, reject) {
        collection.aggregate(query).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err, "err");
        });
    })
}

//Execute remove query
function ExecuteRemoveQuery(collection, query) {
    return new Promise(function (resolve, reject) {
        collection.deleteMany(query).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err, "err");
        });
    })
}

//Execute drop Collection
function ExecuteDropCollectionQuery(collection) {
    return new Promise(function (resolve, reject) {
        collection.collection.drop().then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
    })
}

//Execute aggregation query
function ExecuteAggregationQueryWithSort(collection, query, sort) {
    return new Promise(function (resolve, reject) {
        collection.aggregate([
            { $match: query },
            { "$sort": sort }
        ]).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err, "err");
        });
    })
}

module.exports = {
    ExecuteSelectQuery,
    ExecuteSelectQueryPopulate,
    ExecuteUpdateQuery,
    ExecuteUpdateOneQuery,
    ExecuteInsertQuery,
    ExecuteRemoveQuery,
    ExecuteInsertManyQuery,
    ExecuteAggregationQuery,
    ExecuteDeleteQuery,
    ExecuteSelectQueryWithCount,
    ExecuteAggregationQueryWithGroupBy,
    //very dangerous service, to be used after understanding its actual function
    ExecuteDropCollectionQuery,
    ExecuteAggregationQueryWithSort
};