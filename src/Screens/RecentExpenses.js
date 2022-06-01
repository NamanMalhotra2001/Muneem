import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

const RecentExpenses = ({ navigation }) => {
	// ########## states ##########
	// const [fetchedExpenses, setFetchedExpenses] = useState([]);

	// ########## initial ##########
	const expensesCtx = useContext(ExpensesContext);
	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);

		return expense.date >= date7DaysAgo && expense.date <= today;
	});

	useEffect(() => {
		async function getExpenses() {
			const expenses = await fetchExpenses();
			expensesCtx.setExpenses(expenses);
			// setFetchedExpenses(expenses);
		}

		getExpenses();
	}, []);

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod={'Past week'}
			fallbackText={'No spends this week! 😇'}
			button={true}
		/>
	);
};
export default RecentExpenses;
