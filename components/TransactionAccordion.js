import { useRef, useState, useEffect } from 'react'
import {
	Text,
	Flex,
	Button,
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionIcon,
	AccordionPanel,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

const TransactionAccordion = ({
	transactions,
	deleteTransaction,
	getAllTransactions,
}) => {
	const [isOpen, setOpen] = useState(true)
	const contentRef = useRef()

	useEffect(() => {
		if (isOpen && !transactions) getAllTransactions()
		else if (isOpen && transactions) {
			contentRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center',
			})
		}
	}, [getAllTransactions, isOpen, transactions])

	return (
		<Accordion defaultIndex={[0]} w='100%' allowToggle>
			<AccordionItem border='none'>
				<Flex w='100%' justify='center' align='center'>
					<AccordionButton
						onClick={() => setOpen(!isOpen)}
						p={0}
						w='fit-content'
						_focus={{
							boxShadow: 'none !important',
						}}
					>
						<Button w='fit-content'>
							{isOpen ? 'Hide' : 'Show'} All Transactions
							<AccordionIcon ml={1} />
						</Button>
					</AccordionButton>
				</Flex>
				<AccordionPanel my={2} p={0} ref={contentRef}>
					{transactions &&
						transactions.map(({ _id, amount, category }) => {
							return (
								<Flex
									key={`flex-${_id}`}
									justify='space-between'
									align='baseline'
									w='100%'
									my={3}
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
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	)
}

export default TransactionAccordion
