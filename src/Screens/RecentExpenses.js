import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

const RecentExpenses = () => {
	const expensesCtx = useContext(ExpensesContext);
	const recentExpenses = expensesCtx.expenses.slice(-5).reverse();

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod={'Recent transactions'}
		/>
	);
};
export default RecentExpenses;
