import { Field } from 'formik'
import {
	Text,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	InputGroup,
	InputLeftAddon,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

export function CustomInputField({ type, label, name, error, touched }) {
	return (
		<Field type={type} name={name}>
			{({ field }) => (
				<FormControl isInvalid={error && touched}>
					<FormLabel htmlFor={name}>{label}</FormLabel>
					<Input {...field} type={type} id={name} />
					<FormErrorMessage>{error}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	)
}

export function CurrencyInputField({
	type,
	label,
	name,
	error,
	touched,
	setCurrency,
	currency,
	isCurrencySelectable,
}) {
	const CurrencyMenu = () => {
		return (
			<Menu>
				<MenuButton
					as={Button}
					borderRadius='inherit'
					_focus={{ outline: 'none' }}
					rightIcon={<ChevronDownIcon ml={2} />}
				>
					{currency}
				</MenuButton>
				<MenuList w='max-content'>
					<MenuItem onClick={() => setCurrency('$')}>$</MenuItem>
					<MenuItem onClick={() => setCurrency('₹')}>₹</MenuItem>
					<MenuItem onClick={() => setCurrency('£')}>£</MenuItem>
					<MenuItem onClick={() => setCurrency('€')}>€</MenuItem>
				</MenuList>
			</Menu>
		)
	}

	return (
		<Field type={type} name={name}>
			{({ field }) => (
				<FormControl isInvalid={error && touched}>
					<FormLabel htmlFor={name}>{label}</FormLabel>
					<InputGroup>
						{isCurrencySelectable ? (
							<InputLeftAddon w='fit-content' p={0}>
								<CurrencyMenu />
							</InputLeftAddon>
						) : (
							<InputLeftAddon>{currency}</InputLeftAddon>
						)}
						<Input {...field} type={type} id={name} />
					</InputGroup>
					<FormErrorMessage>{error}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	)
}
