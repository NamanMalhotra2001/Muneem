import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const ExpensesSummary = ({ expenses, periodName }) => {
	const expensesSum = expenses.reduce((sum, expense) => {
		return sum + expense.amount;
	}, 0);

	return (
		<View style={styles.container}>
			<Text style={styles.period}>{periodName}:</Text>
			<Text style={styles.sum}>₹ {expensesSum.toFixed(2)} </Text>
		</View>
	);
};

export default ExpensesSummary;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		marginVertical: 5,
		padding: 10,
		backgroundColor: GlobalStyles.colors.lightAccent,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	period: {
		fontSize: 15,
		color: GlobalStyles.colors.highlight,
	},
	sum: {
		fontSize: 16,
		fontWeight: 'bold',
		color: GlobalStyles.colors.highlight,
	},
});
