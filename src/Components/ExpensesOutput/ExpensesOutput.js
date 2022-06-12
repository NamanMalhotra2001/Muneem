import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import IconButton from '../UI/IconButton';
import ExpenseItem from './ExpenseItem';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText, button, home }) => {
	const navigation = useNavigation();

	return (
		<>
			<View style={styles.container}>
				<ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
				{button ? (
					<View style={styles.buttonsContainer}>
						<IconButton
							onPress={() => {
								navigation.navigate('ManageExpense');
							}}
							icon='add'
							size={24}
							color='gray'
							style={styles.button}
						/>
						<IconButton
							onPress={() => {
								navigation.navigate('AllExpenses', {
									currentPage: 0,
								});
							}}
							icon='ios-arrow-redo-outline'
							size={24}
							color='gray'
							style={styles.button}
						/>
					</View>
				) : (
					<></>
				)}
				{expenses.length > 0 ? (
					<>
						{home ? (
							<>
								{expenses.map((transaction, k) => (
									<ExpenseItem {...transaction} key={k} />
								))}
							</>
						) : (
							<ExpensesList expenses={expenses} />
						)}
					</>
				) : (
					<>
						<View style={styles.noContainer}>
							<Text style={styles.text}>{fallbackText}</Text>
						</View>
					</>
				)}
			</View>
		</>
	);
};

export default ExpensesOutput;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 10,
		backgroundColor: GlobalStyles.colors.lightAccent,
		minHeight: 300,
	},
	noContainer: {
		flex: 1,
		paddingBottom: 0,
		backgroundColor: GlobalStyles.colors.lightAccent,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonsContainer: {
		backgroundColor: GlobalStyles.colors.lightAccent,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginBottom: 5,
		marginRight: 15,
		marginTop: -12,
	},
	text: {
		color: GlobalStyles.colors.highlight,
		fontSize: 16,
		maxWidth: '70%',
		textAlign: 'center',
	},
	button: {
		borderRadius: 30,
		backgroundColor: 'white',
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 3,
		shadowOffset: { height: 1, width: 0 },
		shadowRadius: 4,
		shadowOpacity: 0.2,
	},
});
