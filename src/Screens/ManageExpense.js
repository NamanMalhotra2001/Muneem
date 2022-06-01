import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { storeExpense } from '../util/http';

const ManageExpenses = ({ route, navigation }) => {
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

	async function confirmHandler(expenseData) {
		if (isEditing) {
			expensesCtx.updateExpense(editedExpenseId, expenseData);
		} else {
			const id = await expensesCtx.addExpense(expenseData);
			storeExpense({ ...expenseData, id: id });
		}
		navigation.goBack();
	}

	function deleteExpenseHandler() {
		expensesCtx.deleteExpense(editedExpenseId);
		navigation.goBack();
	}

	function cancelHandler() {
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
			<View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}></View>
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
