const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
	uid: {
		type: Number,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	isExpense: {
		type: Boolean,
		required: true,
		default: true,
	},
	currency: {
		type: 'String',
		required: true,
		default: '$',
	},
})

export default mongoose.models.Transaction ||
	mongoose.model('Transaction', transactionSchema)
