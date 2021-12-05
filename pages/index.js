import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { Text, Button, Spacer, Flex, VStack, useToast } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import CustomInputField from '../components/CustomInputField'

const initialValues = { amount: null, category: '' }
const validationSchema = Yup.object().shape({
	category: Yup.string().required('Category is Required'),
	amount: Yup.number()
		.required('Amount is Required')
		.typeError('Invalid Amount'),
})

export default function Component() {
	const { data: session } = useSession()
	const toast = useToast()
	const [transactions, setTransactions] = useState()

	const deleteTransaction = async (_id) => {
		await fetch('./api/transactions/delete', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ _id: _id }),
		})
		await getAllTransactions()
	}

	const addTransaction = async (amount, category) => {
		await fetch('./api/transactions/add', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				uid: session.user.uid,
				amount: amount,
				category: category,
			}),
		}).then((res) => {
			if (res.status === 201)
				toast({
					title: 'Transaction added!',
					status: 'success',
					duration: 2000,
					isClosable: true,
				})
			else
				toast({
					title: 'Oops, Internal Server Error',
					status: 'error',
					description: 'Please try again',
					duration: 3000,
					isClosable: true,
				})
		})
		await getAllTransactions()
	}

	const getAllTransactions = async () => {
		await fetch('./api/transactions/get-all', {
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

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={({ amount, category }, actions) => {
							addTransaction(amount, category)
							actions.setSubmitting(false)
						}}
					>
						{({ errors, touched, isSubmitting, isValid }) => (
							<Form>
								<VStack justify='center' align='center' gridGap={1}>
									<CustomInputField
										name='amount'
										label='Amount'
										error={errors.amount}
										touched={touched.amount}
									/>
									<CustomInputField
										name='category'
										label='Category'
										error={errors.category}
										touched={touched.category}
									/>
									<Spacer />
									<Button
										isLoading={isSubmitting}
										isDisabled={!isValid}
										type='submit'
										colorScheme='messenger'
										size='md'
										width={120}
										variant='solid'
									>
										Add
									</Button>
								</VStack>
							</Form>
						)}
					</Formik>

					<Button onClick={() => getAllTransactions()}>
						Get All Transactions
					</Button>
					{transactions &&
						transactions.map(({ _id, amount, category }) => {
							return (
								<Flex
									key={`flex-${_id}`}
									justify='space-between'
									align='baseline'
									w='100%'
									gridGap={3}
								>
									<Text textAlign='center' w={20} key={`category-${_id}`}>
										{category}
									</Text>
									<Text textAlign='center' w={20} key={`amount-${_id}`}>
										{amount}
									</Text>
									<Button
										onClick={() => {
											deleteTransaction(_id)
										}}
										colorScheme='red'
									>
										<DeleteIcon />
									</Button>
								</Flex>
							)
						})}
					{transactions && transactions.length === 0 && (
						<Text>You have no transactions.</Text>
					)}
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
