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
	const [inputValues, setInputValues] = useState({
		amount: defaultValues ? defaultValues.amount.toString() : '',
		date: defaultValues ? defaultValues.date : '',
		description: defaultValues ? defaultValues.description : '',
	});

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	// ########## handler functions ##########
	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		setInputValues((curInputValues) => {
			return {
				...curInputValues,
				date: date,
			};
		});
		// console.warn('A date has been picked: ', date);
		hideDatePicker();
	};

	function inputChangedHandler(inputIdentifier, enteredValue) {
		setInputValues((curInputValues) => {
			return {
				...curInputValues,
				[inputIdentifier]: enteredValue,
			};
		});
	}

	function submitHandler() {
		const expenseData = {
			amount: +inputValues.amount,
			date: inputValues.date,
			description: inputValues.description,
		};

		const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const dateIsValid =
			expenseData.date.toString() !== 'Invalid Date' &&
			expenseData.date.toString() !== '';
		const descriptionIsValid = expenseData.description.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			Alert.alert('Invalid input', 'Please check your input values');
			// setInputs((curInputs) => {
			// 	return {
			// 		amount: { value: curInputs.amount.value, isValid: amountIsValid },
			// 		date: { value: curInputs.date.value, isValid: dateIsValid },
			// 		description: {
			// 			value: curInputs.description.value,
			// 			isValid: descriptionIsValid,
			// 		},
			// 	};
			// });
			return;
		}

		onSubmit(expenseData);
	}

	// ########## main start ##########
	return (
		<View style={styles.container}>
			<Input
				style={styles.rowInput}
				label={inputValues.amount !== '' && GlobalStyles.symbols.rupee}
				textInputConfig={{
					placeholder: 'Enter transaction amount',
					keyboardType: 'decimal-pad',
					onChangeText: inputChangedHandler.bind(this, 'amount'),
					value: inputValues.amount,
				}}
			/>

			<Input
				// label='Description'
				textInputConfig={{
					placeholder: 'Enter transaction details',
					multiline: true,
					onChangeText: inputChangedHandler.bind(this, 'description'),
					value: inputValues.description,
				}}
			/>

			<Pressable
				style={({ pressed }) => pressed && styles.pressed}
				onPress={showDatePicker}
			>
				<View style={styles.datePickerButton}>
					<Text style={{ color: GlobalStyles.colors.highlight }}>
						{inputValues.date !== ''
							? 'date: ' + getFormattedDate(inputValues.date)
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
