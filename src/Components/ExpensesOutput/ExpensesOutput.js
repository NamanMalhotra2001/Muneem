import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
	return (
		<>
			{expenses.length > 0 ? (
				<View style={styles.container}>
					<ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
					<ExpensesList expenses={expenses} />
				</View>
			) : (
				<View style={styles.container}>
					<ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
					<View style={styles.noContainer}>
						<Text style={styles.text}>{fallbackText}</Text>
					</View>
				</View>
			)}
		</>
	);
};

export default ExpensesOutput;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 0,
		backgroundColor: GlobalStyles.colors.lightAccent,
	},
	noContainer: {
		flex: 1,
		paddingBottom: 0,
		backgroundColor: GlobalStyles.colors.lightAccent,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: GlobalStyles.colors.highlight,
		fontSize: 16,
		maxWidth: '70%',
		textAlign: 'center',
	},
});
