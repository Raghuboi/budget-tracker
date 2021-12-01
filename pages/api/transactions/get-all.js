import dbConnect from '../../../lib/dbConnect'
import Transaction from '../../../models/transaction'

export default async function handler(req, res) {
	const { method } = req

	await dbConnect()

	switch (method) {
		case 'POST':
			try {
				const { uid } = req.body
				const transactions = await Transaction.find({ uid: uid })
				res.status(201).json({ success: true, transactions: transactions })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}
