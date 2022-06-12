import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { fetchAll } from '../../util/http';
import AccountItem from './AccountItem';

const HomeAccountsOverview = ({ expenses }) => {
	const [accounts, setAccounts] = useState();
	const [spent, setSpent] = useState({
		hdfc: 0,
		kotak: 0,
		paytm: 0,
		cash: 0,
	});

	useEffect(() => {
		async function getAccounts() {
			try {
				const all = await fetchAll();
				setAccounts(all.accounts);
			} catch (error) {
				setError();
			}
		}
		getAccounts();

		setSpent({
			hdfc: calculateSpent('hdfc'),
			kotak: calculateSpent('kotak'),
			paytm: calculateSpent('paytm'),
			cash: calculateSpent('cash'),
		});

	}, [expenses]);

	const calculateSpent = (account) => {
		const monthExpenses = expenses.filter((e) => {
			return (
				e.date.getMonth() === new Date().getMonth() &&
				e.account === account &&
				e.isExpense
			);
		});

		const expensesSum = monthExpenses.reduce((sum, expense) => {
			return sum + expense.amount;
		}, 0);

		return expensesSum;
	};

	return (
		<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
			{accounts ? (
				<View style={styles.container}>
					<AccountItem
						name={'hdfc'}
						spent={spent.hdfc}
						balance={accounts.hdfc.balance.toFixed(2)}
						pic={
							'http://www.logotaglines.com/wp-content/uploads/2016/08/HDFC_Bank_Logo.jpg'
						}
					/>
					<AccountItem
						name={'kotak'}
						spent={spent.kotak}
						balance={accounts.kotak.balance.toFixed(2)}
						pic={
							'https://www.kotak.com/content/dam/Kotak/kotak-bank-logo.jpg'
						}
					/>
					<AccountItem
						name={'paytm'}
						spent={spent.paytm}
						balance={accounts.paytm.balance.toFixed(2)}
						pic={
							'https://cdn.icon-icons.com/icons2/730/PNG/512/paytm_icon-icons.com_62778.png'
						}
					/>
					<AccountItem
						name={'hdfc'}
						spent={spent.cash}
						pic={'https://cdn-icons-png.flaticon.com/512/438/438526.png'}
					/>
				</View>
			) : (
				<></>
			)}
		</ScrollView>
	);
};
export default HomeAccountsOverview;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 130,
		backgroundColor: GlobalStyles.colors.lightAccent,
		flexDirection: 'row',
		paddingHorizontal: 12,
	},
});
