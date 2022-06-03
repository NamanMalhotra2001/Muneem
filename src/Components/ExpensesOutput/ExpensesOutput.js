import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import IconButton from '../UI/IconButton';
import ExpenseItem from './ExpenseItem';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText, button, home }) => {
	const navigate = useNavigation();

	return (
		<>
			{expenses.length > 0 ? (
				<View style={styles.container}>
					<ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
					{home ? (
						<>
							{expenses.slice(0, 5).map((item, k) => (
								<ExpenseItem {...item} key={k} />
							))}
						</>
					) : (
						<ExpensesList expenses={expenses} />
					)}
				</View>
			) : (
				<View style={styles.container}>
					<ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
					<View style={styles.noContainer}>
						<Text style={styles.text}>{fallbackText}</Text>
					</View>
				</View>
			)}
			{button ? (
				<View style={styles.buttonsContainer}>
					<IconButton
						onPress={() => {
							navigate.navigate('ManageExpense');
						}}
						icon='add'
						size={24}
						color='gray'
						style={{
							borderRadius: 30,
							backgroundColor: 'white',
							width: 60,
							alignItems: 'center',
							justifyContent: 'center',
							elevation: 3,
							shadowOffset: { height: 1, width: 0 },
							shadowRadius: 4,
							shadowOpacity: 0.2,
						}}
					/>
					<IconButton
						onPress={() => {
							navigate.navigate('AllExpenses');
						}}
						icon='ios-arrow-redo-outline'
						size={24}
						color='gray'
						style={{
							borderRadius: 30,
							backgroundColor: 'white',
							width: 60,
							alignItems: 'center',
							justifyContent: 'center',
							elevation: 3,
							shadowOffset: { height: 1, width: 0 },
							shadowRadius: 4,
							shadowOpacity: 0.2,
						}}
					/>
				</View>
			) : (
				<></>
			)}
		</>
	);
};

export default ExpensesOutput;

const styles = StyleSheet.create({
	buttonsContainer: {
		backgroundColor: GlobalStyles.colors.lightAccent,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
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
