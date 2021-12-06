import dbConnect from '../../../lib/dbConnect'
import Transaction from '../../../models/transaction'

export default async function handler(req, res) {
	const { method } = req

	await dbConnect()

	switch (method) {
		case 'POST':
			try {
				const { uid, amount, category, currency } = req.body
				const transaction = await new Transaction({
					uid: uid,
					amount: amount,
					category: category,
					currency: currency,
				}).save()
				res.status(201).json({ success: true, transaction: transaction })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}
