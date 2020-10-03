const mongoose = require('mongoose')

const RelationSchema = new mongoose.Schema({
    relationWith:mongoose.ObjectId,
    relationName:String
})
const Relation = mongoose.model('Relation',RelationSchema)
module.exports = {RelationSchema,Relation}
