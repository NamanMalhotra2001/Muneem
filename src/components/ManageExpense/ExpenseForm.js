import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDateTime } from '../../util/date';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import Input from './Input';
import { Feather } from '@expo/vector-icons';
import { NativeBaseProvider, Select } from 'native-base';
import DropdownMenu from 'react-native-dropdown-menu';

function ExpenseForm({ onCancel, onSubmit, isEditing, onDelete, defaultValues }) {
	// ########## states ##########
	const [isExpense, setIsExpense] = useState(false);
	const toggleExpense = () => setIsExpense((previousState) => !previousState);
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [inputs, setInputs] = useState({
		title: {
			value: defaultValues ? defaultValues.title : '',
			isValid: true,
		},
		amount: {
			value: defaultValues ? defaultValues.amount.toString() : '',
			isValid: true,
		},
		date: {
			value: defaultValues ? defaultValues.date : new Date(),
			isValid: true,
		},
		category: {
			value: defaultValues ? defaultValues.category : 'cat',
			isValid: true,
		},
		account: {
			value: defaultValues ? defaultValues.account : '',
			isValid: true,
		},
		isExpense: {
			value: defaultValues ? defaultValues.isExpense : '',
			isValid: true,
		},
		description: {
			value: defaultValues ? defaultValues.description : '',
			isValid: true,
		},
	});
	const catNames = [
		[
			'bills',
			'entertainment',
			'food',
			'groceries',
			'health',
			'others',
			'shopping',
			'travel',
			'transfer',
		],
	];

	// ########## handler functions ##########
	function inputChangedHandler(inputIdentifier, enteredValue) {
		setInputs((curInputValues) => {
			return {
				...curInputValues,
				[inputIdentifier]: { value: enteredValue, isValid: true },
			};
		});
	}

	function submitHandler() {
		const expenseData = {
			title: inputs.title.value,
			amount: +(+inputs.amount.value).toFixed(2),
			date: inputs.date.value,
			category: inputs.category.value,
			account: inputs.account.value,
			isExpense: inputs.isExpense.value,
			description: inputs.description.value,
		};

		const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid =
			expenseData.date.toString() !== 'Invalid Date' &&
			expenseData.date.toString() !== '';
		const descriptionIsValid = expenseData.description.trim().length > 0;

		const formIsInvalid =
			!inputs.title.isValid ||
			!inputs.amount.isValid ||
			!inputs.date.isValid ||
			!inputs.category.isValid ||
			!inputs.account.isValid ||
			!inputs.isExpense.isValid;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			Alert.alert('Invalid input', 'Please check your input values');
			setInputs((curInputs) => {
				return {
					amount: { value: curInputs.amount.value, isValid: amountIsValid },
					date: { value: curInputs.date.value, isValid: dateIsValid },
					description: {
						value: curInputs.description.value,
						isValid: descriptionIsValid,
					},
				};
			});
			return;
		} else {
			onSubmit(expenseData);
		}
	}

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		setInputs((curInputValues) => {
			return {
				...curInputValues,
				date: { value: date, isValid: true },
			};
		});
		hideDatePicker();
	};

	// ########## main start ##########
	return (
		<View style={styles.container}>
			{/* // ########## title ########## */}
			<Input
				textInputConfig={{
					maxLength: 20,
					placeholder: 'Enter transaction title',
					onChangeText: inputChangedHandler.bind(this, 'title'),
					value: inputs.title.value,
				}}
				valid={inputs.title.isValid}
			/>

			{/* // ########## amount ########## */}
			<Input
				label={inputs.amount.value !== '' && GlobalStyles.symbols.rupee}
				textInputConfig={{
					placeholder: 'Enter transaction amount',
					keyboardType: 'decimal-pad',
					onChangeText: inputChangedHandler.bind(this, 'amount'),
					value: inputs.amount.value,
				}}
				style={{
					borderTopWidth: 0.5,
				}}
				valid={inputs.amount.isValid}
			/>

			{/* // ########## date picker button ########## */}
			<Pressable
				style={({ pressed }) => pressed && styles.pressed}
				onPress={showDatePicker}
			>
				<View
					style={[
						styles.datePickerButton,
						!inputs.date.isValid && styles.invalid,
					]}
				>
					<Text style={styles.text}>
						{inputs.date.value !== ''
							? getFormattedDateTime(inputs.date.value)
							: 'Tap to select date'}
					</Text>
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode='datetime'
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
					/>
				</View>
			</Pressable>

			{/* // ########## category ########## */}
			<View>
				<View
					style={[styles.buttonsContainer, { zIndex: 1, borderTopWidth: 0.5 }]}
				>
					<DropdownMenu
						bgColor={'white'}
						handler={(selection, row) =>
							setInputs(() => ({
								...inputs,
								category: { value: catNames[0][row], isValid: true },
							}))
						}
						titleStyle={{}}
						data={catNames}
					/>
					{console.log(inputs.category.value)}
				</View>
			</View>

			{/* // ########## account ########## */}
			<Text>account</Text>

			{/* // ########## isExpense ########## */}
			<View style={styles.isExpenseContainer}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Feather
						name={isExpense ? 'arrow-up-right' : 'arrow-down-left'}
						size={20}
						style={{
							backgroundColor: isExpense
								? GlobalStyles.colors.redAccent
								: GlobalStyles.colors.accent,
							borderRadius: 5,
							padding: 5,
						}}
					/>
					<Text style={[styles.text, { marginLeft: 10 }]}>
						{isExpense ? 'Expense' : 'Income'}
					</Text>
				</View>
				{/* <Text style={styles.text}>category</Text> */}
				<Switch
					trackColor={{
						true: GlobalStyles.colors.lightRedAccent,
						false: GlobalStyles.colors.primary,
					}}
					thumbColor={
						isExpense
							? GlobalStyles.colors.lightError
							: GlobalStyles.colors.lightAccent
					}
					ios_backgroundColor='#3e3e3e'
					onValueChange={toggleExpense}
					value={isExpense}
				/>
			</View>

			{/* // ########## description ########## */}
			<Input
				textInputConfig={{
					placeholder: 'Enter transaction details',
					multiline: true,
					onChangeText: inputChangedHandler.bind(this, 'description'),
					value: inputs.description.value,
				}}
				style={{
					borderTopWidth: 0.5,
				}}
				valid={inputs.description.isValid}
			/>

			{/* // ########## add/update - delete - cancel buttons ########## */}
			<View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
				<View style={styles.buttonsContainer}>
					<Button style={styles.button} mode='flat' onPress={onCancel}>
						Cancel
					</Button>
					<Button style={styles.button} onPress={submitHandler}>
						{isEditing ? 'Update' : 'Add'}
					</Button>
					{isEditing && (
						<View>
							<IconButton
								style={styles.deleteButton}
								icon='trash'
								color={GlobalStyles.colors.error}
								size={24}
								onPress={onDelete}
							/>
						</View>
					)}
				</View>
			</View>
		</View>
	);
}

export default ExpenseForm;

const styles = StyleSheet.create({
	invalid: {
		borderWidth: 0.5,
		borderColor: 'red',
		backgroundColor: '#fff3f3',
	},
	errorContainer: {
		marginHorizontal: 20,
		backgroundColor: '#fff3f3',
		borderRadius: 10,
		borderColor: 'red',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '16%',
	},
	container: {
		flex: 1,
	},
	datePickerButton: {
		paddingVertical: 15,
		padding: 15,
		backgroundColor: 'white',
		borderTopWidth: 0.5,
	},
	isExpenseContainer: {
		paddingHorizontal: 15,
		paddingVertical: 3,
		backgroundColor: 'white',
		borderTopWidth: 0.5,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	text: {
		color: GlobalStyles.colors.highlight,
		fontSize: 18,
		fontWeight: '400',
	},
	pressed: {
		opacity: 0.75,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
	deleteButton: {
		backgroundColor: 'white',
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 3,
		shadowOffset: { height: 1, width: 0 },
		shadowRadius: 4,
		shadowOpacity: 0.2,
	},
});
