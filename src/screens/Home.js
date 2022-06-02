import { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

const Home = ({ navigation }) => {
	// ########## states ##########
	// const [fetchedExpenses, setFetchedExpenses] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState();

	// ########## initial ##########
	const expensesCtx = useContext(ExpensesContext);
	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);

		return expense.date >= date7DaysAgo && expense.date <= today;
	});

	useEffect(() => {
		async function getExpenses() {
			setIsFetching(true);
			try {
				const expenses = await fetchExpenses();
				expensesCtx.setExpenses(expenses);
			} catch (error) {
				setError('Could not fetch data!');
			}
			setIsFetching(false);
			// setFetchedExpenses(expenses);
		}

		getExpenses();
	}, []);

	if (error && !isFetching) {
		return <ErrorOverlay message={error} />;
	}

	if (isFetching) {
		return <LoadingOverlay />;
	}

	return (
		<ScrollView>
			<HomeHeader />
			<ExpensesOutput
				expenses={recentExpenses}
				expensesPeriod={'Past week'}
				fallbackText={'No spends this week! 😇'}
				button={true}
				home={true}
			/>
		</ScrollView>
	);
};
export default Home;
