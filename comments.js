var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    data : String,
    dateCreated : String,
    replies : [String]
}, {collection : 'comments'})

module.exports = mongoose.model('Comments', commentSchema);

