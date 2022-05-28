import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

const ExpenseItem = ({ description, amount, date }) => {
	return (
		<Pressable>
			<View style={styles.expenseItem}>
				<View>
					<Text style={[styles.textBase, styles.description]}>
						{description}
					</Text>
					{console.log(date)}
					<Text style={styles.textBase}>{getFormattedDate(date)}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>₹ {amount.toFixed(2)}</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default ExpenseItem;

const styles = StyleSheet.create({
	expenseItem: {
		padding: 12,
		marginVertical: 5,
		flexDirection: 'row',
		backgroundColor: GlobalStyles.colors.accent,
		justifyContent: 'space-between',
		borderRadius: 10,
		elevation: 4,
		shadowColor: 'gray',
		shadowRadius: 4,
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.4,
	},
	textBase: {
		color: GlobalStyles.colors.highlight,
	},
	description: {
		fontSize: 16,
		marginBottom: 4,
		fontWeight: 'bold',
	},
	amountContainer: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		minWidth: 110,
		backgroundColor: 'white',
	},
	amount: {
		color: GlobalStyles.colors.highlight,
		fontWeight: 'bold',
	},
});
