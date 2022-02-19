var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    'sex':{
        type:String,
        enum: ['male','female','others']
    },
    "name": { type: String, trim: true },
    "caste": { type: String, trim: true },
    "height": {  //units in feet
        type: Number,
        trim: true,
        max: 10,
        min: 1
    },
    "weight": {  //units in feet
        type: Number,
        trim: true,
        max: 300,
        min: 1
    },
    "skin_tone": {
        type: String,
        enum: ['black', 'brown', 'yellow', 'red', 'white']
    },
    "occupation": {
        type: String,
        trim: true
    },
    "self_description": {
        type: String,
        trim: true
    },
    "partner_expectation": {
        type: String,
        trim: true
    },
    "salary": {
        type: Number,
        trim: true,
        max: 10000000,
        min: 0
    }, //in Rupees - Assuming max per month Salary of an Indian could be one Crore ;)
    "siblings": {  //no of siblings
        type: Number,
        trim: true,
        max: 10,
        min: 0
    },
    "interests": {
        type: String,
        trim: true
    },
    "location": {
        type: String,
        trim: true
    },
    "modified": {
        type: Date,
        default: Date.now
    },
    "created": {
        type: Date,
        default: Date.now
    },
})

const users = mongoose.model('users',userSchema);
exports.users = users;