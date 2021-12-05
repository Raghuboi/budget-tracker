import dbConnect from '../../../lib/dbConnect'
import Transaction from '../../../models/transaction'

export default async function handler(req, res) {
	const { method } = req

	await dbConnect()

	switch (method) {
		case 'POST':
			try {
				const { _id } = req.body
				const deleted = await Transaction.deleteOne({ _id: _id })
				res.status(201).json({ success: true, deleted: deleted })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}
