import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

const ManageExpenses = ({ route, navigation }) => {
	// console.log(route);
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;
	const expensesCtx = useContext(ExpensesContext);
	const defaultValues = expensesCtx.expenses.find(
		(expense) => expense.id === editedExpenseId
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
		});
	}, []);

	function deleteExpenseHandler() {
		expensesCtx.deleteExpense(editedExpenseId);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function confirmHandler(expenseData) {
		if (isEditing) {
			expensesCtx.updateExpense(editedExpenseId, expenseData);
		} else {
			expensesCtx.addExpense(expenseData);
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<ExpenseForm
				onCancel={cancelHandler}
				isEditing={isEditing}
				onSubmit={confirmHandler}
				onDelete={deleteExpenseHandler}
				defaultValues={defaultValues}
			/>
			<View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
				{/* <View style={styles.buttonsContainer}>
					<Button style={styles.button} mode='flat' onPress={cancelHandler}>
						Cancel
					</Button>
					<Button style={styles.button} onPress={confirmHandler}>
						{isEditing ? 'Update' : 'Add'}
					</Button>
					{isEditing && (
						<View>
							<IconButton
								style={styles.deleteButton}
								icon='trash'
								color='#ff5454'
								size={24}
								onPress={deleteExpenseHandler}
							/>
						</View>
					)}
				</View> */}
			</View>
		</View>
	);
};
export default ManageExpenses;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colors.lightAccent,
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
