import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';

const ManageExpenses = ({ route, navigation }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;
	const expensesCtx = useContext(ExpensesContext);
	const defaultValues = expensesCtx.expenses.find(
		(expense) => expense.id === editedExpenseId
	);
	const [error, setError] = useState();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Transaction' : 'Add Transaction',
		});
	}, []);

	async function confirmHandler(expenseData) {
		setIsSubmitting(true);
		try {
			if (isEditing) {
				expensesCtx.updateExpense(editedExpenseId, expenseData);
				await updateExpense(editedExpenseId, expenseData);
				navigation.goBack();
			} else {
				const id = await storeExpense(expenseData);
				expensesCtx.addExpense({ ...expenseData, id: id });
				navigation.goBack();
			}
		} catch (error) {
			setError('Could not save data - please try again later!');
			setIsSubmitting(false);
		}
	}

	async function deleteExpenseHandler() {
		setIsSubmitting(true);
		try {
			await deleteExpense(editedExpenseId);
			expensesCtx.deleteExpense(editedExpenseId);
			navigation.goBack();
		} catch (error) {
			setError('Could not delete expense - please try again later!');
			setIsSubmitting(false);
		}
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function errorHandler() {
		setError(null);
	}

	if (error && !isSubmitting) {
		return <ErrorOverlay message={error} onConfirm={errorHandler} />;
	}

	if (isSubmitting) {
		return <LoadingOverlay />;
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
