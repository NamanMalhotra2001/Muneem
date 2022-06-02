import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import extractor from '../tracker/extractor';
import { View } from 'react-native'
import { useEffect } from 'react';

const RecentExpenses = () => {
	const expensesCtx = useContext(ExpensesContext);
	var recentExpenses = [];

	useEffect(() => {
		extractor().then((output) => {
			console.log(output);
		})
	})

	// const recentExpenses = expensesCtx.expenses.filter((expense) => {
	// 	const today = new Date();
	// 	const date7DaysAgo = getDateMinusDays(today, 7);

	// 	return expense.date >= date7DaysAgo && expense.date <= today;
	// });

	return (
		<View></View>
		// <ExpensesOutput
		// 	expenses={recentExpenses}
		// 	expensesPeriod={'Past week'}
		// 	fallbackText={'No spends this week! 😇'}
		// />
	);
};
export default RecentExpenses;
