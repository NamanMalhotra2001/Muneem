import { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import HomeAccountsOverview from '../components/HomePage/HomeAccountsOverview';
import HomeHeader from '../components/HomePage/HomeHeader';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

const Home = ({ navigation }) => {
	// ########## states ##########
	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState();

	// ########## initial ##########
	const expensesCtx = useContext(ExpensesContext);
	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);

		return expense.date >= date7DaysAgo && expense.date <= today;
	});
	// console.log(recentExpenses);

	useEffect(() => {
		async function getExpenses() {
			setIsFetching(true);
			try {
				const expenses = await fetchExpenses();
				expensesCtx.setExpenses(expenses);
			} catch (error) {
				setError();
			}
			setIsFetching(false);
		}

		getExpenses();
	}, []);

	function errorHandler() {
		setError(null);
	}

	if (error && !isFetching) {
		return <ErrorOverlay message={error} onConfirm={errorHandler} />;
	}

	if (isFetching) {
		return <LoadingOverlay />;
	}

	return (
		<ScrollView style={{ backgroundColor: GlobalStyles.colors.lightAccent }}>
			<HomeHeader expenses={expensesCtx.expenses} />
			<ExpensesOutput
				expenses={recentExpenses}
				expensesPeriod={'Past week'}
				fallbackText={'No spends this week! 😇'}
				button={true}
				home={true}
			/>
			<HomeAccountsOverview expenses={expensesCtx.expenses} />
		</ScrollView>
	);
};
export default Home;
