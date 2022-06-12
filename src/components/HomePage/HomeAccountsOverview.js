import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { fetchAll } from '../../util/http';
import AccountItem from './AccountItem';

const HomeAccountsOverview = ({ expenses }) => {
	// console.log('homeaccounts5\n', expenses);
	const [all, setAll] = useState();
	useEffect(() => {
		async function getExpenses() {
			try {
				const all = await fetchAll();
				setAll(all);
			} catch (error) {
				setError();
			}
		}

		getExpenses();
	}, []);

	return (
		<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
			<View style={styles.container}>
				<AccountItem
					name={'hdfc'}
					spent={1000}
					balance={20000}
					pic={
						'http://www.logotaglines.com/wp-content/uploads/2016/08/HDFC_Bank_Logo.jpg'
					}
				/>
				<AccountItem
					name={'hdfc'}
					spent={1000}
					balance={20000}
					pic={'https://www.kotak.com/content/dam/Kotak/kotak-bank-logo.jpg'}
				/>
				<AccountItem
					name={'hdfc'}
					spent={1000}
					balance={20000}
					pic={
						'https://cdn.icon-icons.com/icons2/730/PNG/512/paytm_icon-icons.com_62778.png'
					}
				/>
				<AccountItem
					name={'hdfc'}
					spent={1000}
					pic={'https://cdn-icons-png.flaticon.com/512/438/438526.png'}
				/>
			</View>
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
	},
});
