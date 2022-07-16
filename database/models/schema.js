var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let userSchema = Schema({
    'name': {
        type: String,
        trim: true
    },
    "email": {
        type: String,
        trim: true
    },
    "password": {
        type: String,
        trim: true
    },
    "role": {
        type: String,
        enum: ['admin', 'operator']
    },
    "created": {
        type: Date,
        default: Date.now
    }
})
let movieSchema = Schema({
    'title': {
        type: String,
        trim: true
    },
    'language': {
        type: String,
        enum: ['tamil', 'kannada', 'english', 'hindi', 'telugu', 'malayalam']
    },
    'age_restricted': {
        type: String,
        enum: ['true', 'false']
    }
})
const movies = mongoose.model('movies', movieSchema)
const users = mongoose.model('users', userSchema);
exports.users = users;
exports.movies = movies;