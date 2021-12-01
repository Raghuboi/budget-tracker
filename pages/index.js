import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { Text, Button, Flex } from '@chakra-ui/react'

export default function Component() {
	const { data: session } = useSession()
	const [transactions, setTransactions] = useState()

	const addTransaction = () => {
		fetch('./api/transactions/add', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ uid: session.user.uid, amount: 10 }),
		})
	}

	const getAllTransactions = () => {
		fetch('./api/transactions/get-all', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ uid: session.user.uid }),
		})
			.then((res) => res.json())
			.then((data) => setTransactions(data.transactions))
	}

	if (session) {
		return (
			<Flex w='100vw' h='100vh' justify='center' align='center'>
				<Flex
					p={6}
					boxShadow='0 4px 4px 2px rgba(0, 0, 0, 0.1)'
					borderRadius={14}
					flexDir='column'
					justify='center'
					align='center'
					gridGap={6}
				>
					<Text fontSize={24}>Signed in as {session.user.name}</Text>
					<Image
						alt={`${session.user.name}'s Avatar'`}
						src={session.user.image}
						width='100px'
						height='100px'
					/>
					<Button size='lg' colorScheme='messenger' onClick={() => signOut()}>
						Sign out
					</Button>

					<Button
						onClick={async () => {
							await addTransaction()
							await getAllTransactions()
						}}
					>
						Add $10
					</Button>

					<Button onClick={() => getAllTransactions()}>
						Get All Transactions
					</Button>
					{transactions &&
						transactions.map((transaction) => {
							return <Text key={transaction._id}>{transaction.amount}</Text>
						})}
				</Flex>
			</Flex>
		)
	}
	return (
		<Flex w='100vw' h='100vh' justify='center' align='center'>
			<Flex
				flexDir='column'
				justify='center'
				align='center'
				gridGap={6}
				p={6}
				boxShadow='0 4px 4px 2px rgba(0, 0, 0, 0.1)'
				borderRadius={14}
			>
				<Text fontSize={24}>Not signed in</Text>
				<Button size='lg' colorScheme='messenger' onClick={() => signIn()}>
					Sign in
				</Button>
			</Flex>
		</Flex>
	)
}
