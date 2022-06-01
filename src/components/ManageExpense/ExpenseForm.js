import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import Input from './Input';

function ExpenseForm({ onCancel, onSubmit, isEditing, onDelete, defaultValues }) {
	// ########## states ##########
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [inputs, setInputs] = useState({
		amount: {
			value: defaultValues ? defaultValues.amount.toString() : '',
			isValid: true,
		},
		date: {
			value: defaultValues ? defaultValues.date : '',
			isValid: true,
		},
		description: {
			value: defaultValues ? defaultValues.description : '',
			isValid: true,
		},
	});
	const formIsInvalid =
		!inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

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
			amount: +inputs.amount.value,
			date: inputs.date.value,
			description: inputs.description.value,
		};

		const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid =
			expenseData.date.toString() !== 'Invalid Date' &&
			expenseData.date.toString() !== '';
		const descriptionIsValid = expenseData.description.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			// Alert.alert('Invalid input', 'Please check your input values');
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
		}

		onSubmit(expenseData);
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
			{/* // ########## amount ########## */}
			<Input
				label={inputs.amount !== '' && GlobalStyles.symbols.rupee}
				textInputConfig={{
					placeholder: 'Enter transaction amount',
					keyboardType: 'decimal-pad',
					onChangeText: inputChangedHandler.bind(this, 'amount'),
					value: inputs.amount.value,
				}}
				valid={inputs.amount.isValid}
			/>
			{/* // ########## description ########## */}
			<Input
				textInputConfig={{
					placeholder: 'Enter transaction details',
					multiline: true,
					onChangeText: inputChangedHandler.bind(this, 'description'),
					value: inputs.description.value,
				}}
				valid={inputs.description.isValid}
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
					<Text style={{ color: GlobalStyles.colors.highlight }}>
						{inputs.date.value !== ''
							? 'date: ' + getFormattedDate(inputs.date.value)
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
			{/* // ########## Error message ########## */}
			{formIsInvalid && (
				<View style={styles.errorContainer}>
					<Text style={{ color: 'red' }}>Some inputs are invalid!</Text>
				</View>
			)}
			{/* // ########## Buttons ########## */}
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
								color='#ff5454'
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
		marginTop: '15%',
		flex: 1,
	},
	datePickerButton: {
		marginHorizontal: 20,
		marginTop: 8,
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 10,
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
