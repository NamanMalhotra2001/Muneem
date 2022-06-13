import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { GlobalStyles } from '../../constants/styles';
import { getMonth } from '../../util/date';
import { fetchAll } from '../../util/http';
import IconButton from '../UI/IconButton';

const HomeHeader = ({ expenses }) => {
	const navigation = useNavigation();
	const [amounts, setAmounts] = useState({
		spent: 5400.32,
		budget: 10000.0,
		income: 20000.0,
	});
	const percentage = (amounts.spent / amounts.budget) * 100;
	const [color, setColor] = useState('#ffffffff');
	const [secColor, setSecColor] = useState('#ffffffff');

	useEffect(() => {
		const monthExpenses = expenses.filter((e) => {
			return e.date.getMonth() === new Date().getMonth() && e.isExpense;
		});

		const incomeTransactions = expenses.filter((e) => {
			return e.date.getMonth() === new Date().getMonth() && !e.isExpense;
		});

		const expensesSum = monthExpenses.reduce((sum, expense) => {
			return sum + expense.amount;
		}, 0);

		const incomeSum = incomeTransactions.reduce((sum, expense) => {
			return sum + expense.amount;
		}, 0);

		fetchAll().then((res) => {
			setAmounts({
				spent: expensesSum,
				budget: res.others.budget,
				income: incomeSum,
			});
		});
	}, [expenses]);

	return (
		<View style={styles.container}>
			{/* // ########## left container ########## */}
			<View style={styles.leftContainer}>
				{/* // ########## circle ########## */}
				<CircularProgress
					radius={85}
					value={(amounts.spent / amounts.budget) * 100}
					showProgressValue={false}
					activeStrokeColor={color}
					inActiveStrokeColor={secColor}
					activeStrokeWidth={8}
					inActiveStrokeWidth={5}
					inActiveStrokeOpacity={0.4}
				/>

				<View style={styles.infoContainer}>
					{/* // ########## month text ########## */}
					<View style={styles.monthContainer}>
						<Text
							style={{
								color: 'white',
								fontSize: 12,
							}}
						>
							This month{' '}
							<Text style={{ fontWeight: '900', color: secColor }}>
								{percentage.toFixed(0)}%
							</Text>
						</Text>
						<Text
							style={{
								color: 'white',
								fontSize: 35,
							}}
						>
							{getMonth(new Date())}
						</Text>
					</View>

					{/* // ########## spent text ########## */}
					<View style={styles.spentAmountContainer}>
						<Text
							style={{
								color: 'white',
								fontSize: 15,
								marginTop: 5,
								marginRight: 5,
							}}
						>
							{GlobalStyles.symbols.rupee}
						</Text>
						<Text
							style={{
								fontSize: 22,
								color: 'white',
								fontWeight: 'bold',
							}}
						>
							{amounts.spent.toFixed(2)}
						</Text>
					</View>

					{/* // ########## budget text ########## */}
					<View style={styles.budgetAmountContainer}>
						<Text
							style={{
								color: 'white',
								fontSize: 12,
								marginTop: 2,
								marginRight: 5,
							}}
						>
							{GlobalStyles.symbols.rupee}
						</Text>
						<Text
							style={{
								fontSize: 16,
								color: 'white',
								fontWeight: 'bold',
							}}
						>
							{amounts.budget.toFixed(2)}
						</Text>
					</View>
				</View>
			</View>

			{/* // ########## right container ########## */}
			<View style={styles.rightContainer}>
				{/* // ########## user profile button ########## */}
				<IconButton
					icon='person-circle-outline'
					size={25}
					color={color}
					style={{
						alignSelf: 'flex-end',
						// backgroundColor: '#5e5e5e8a',
					}}
					onPress={() => navigation.navigate('UserProfile')}
				/>

				{/* // ########## chart button ########## */}
				<IconButton
					icon='ios-pie-chart-outline'
					size={25}
					color={color}
					style={{
						alignSelf: 'flex-end',
						marginTop: 45,
						// backgroundColor: '#5e5e5e8a',
					}}
					onPress={() => navigation.navigate('AllExpenses', { currentPage: 1 })}
				/>

				{/* // ########## income ########## */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-end',
						alignItems: 'baseline',
						paddingHorizontal: 15,
						// backgroundColor: '#5e5e5e8a',
					}}
				>
					<Feather name='arrow-down-left' size={13} color={color} />
					<Text style={{ fontSize: 15, color: color }}>
						{' '}
						Income:{' '}
						<Text style={{ fontWeight: '900' }}>
							{GlobalStyles.symbols.rupee}
							{amounts.income}
						</Text>
					</Text>
				</View>
			</View>
		</View>
	);
};
export default HomeHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingTop: 25,
		height: 210,
		backgroundColor: GlobalStyles.colors.primary,
	},
	leftContainer: {
		flex: 1,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		// backgroundColor: '#5e5e5e8a',
	},
	rightContainer: {
		flex: 1,
		// backgroundColor: '#5e5e5e3e',
	},
	infoContainer: {
		position: 'absolute',
		top: 33,
		left: 22,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#5e5e5e8a',
	},
	monthContainer: {
		width: 150,
		justifyContent: 'center',
		alignItems: 'center',
	},
	spentAmountContainer: {
		flexDirection: 'row',
		width: 150,
		justifyContent: 'center',
		alignItems: 'center',
	},
	budgetAmountContainer: {
		flexDirection: 'row',
		width: 125,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: 'white',
		borderColor: 'red',
	},
});
