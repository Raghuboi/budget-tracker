import { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { CurrencyInputField, CustomInputField } from './CustomInput'
import {
	Flex,
	Button,
	Spacer,
	VStack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const initialValues = { amount: 50, category: 'Groceries' }
const validationSchema = Yup.object().shape({
	category: Yup.string().required('Category is Required').max(15, 'Too long'),
	amount: Yup.number()
		.required('Amount is Required')
		.moreThan(0, 'Cannot be less than 1')
		.typeError('Invalid Amount'),
})

const TransactionModal = ({ onSubmit }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [currency, setCurrency] = useState('$') // default currency

	const TransactionForm = () => {
		return (
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async ({ amount, category }, actions) => {
					await onSubmit(amount, category, currency)
					actions.setSubmitting(false)
					onClose()
				}}
			>
				{({ errors, touched, isSubmitting, isValid }) => (
					<Form>
						<VStack justify='center' align='center' gridGap={1}>
							<CurrencyInputField
								name='amount'
								label='Amount'
								error={errors.amount}
								touched={touched.amount}
								currency={currency}
								setCurrency={(currency) => {
									setCurrency(currency)
								}}
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
								colorScheme='green'
								size='md'
								w={120}
								variant='solid'
							>
								Add
							</Button>
						</VStack>
					</Form>
				)}
			</Formik>
		)
	}

	return (
		<>
			<Button colorScheme='green' onClick={onOpen}>
				Add Transaction <AddIcon ml={3} />
			</Button>
			<Modal
				isCentered
				onClose={onClose}
				isOpen={isOpen}
				motionPreset='slideInBottom'
			>
				<ModalOverlay />
				<ModalContent w='fit-content'>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex justify='center' align='center'>
							<TransactionForm />
						</Flex>
					</ModalBody>
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default TransactionModal
