const mongoose = require('mongoose')

const FormSchema = new mongoose.Schema({
    Client_Name: {type: String, required: true},
    Book_Name: {type: String, required: true},
	Price: {type: Number, required: true},
	Book_Image: {type: String, required: true},
	Discription: {type: String, default: "No Discription"},
	Name_at_Server: {type: String, required: true},
	date: {
		type: Number,
		default: Date.now
	}
}, {collection: 'ML'})

const model = mongoose.model('ML', FormSchema)

module.exports = model