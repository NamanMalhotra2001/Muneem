import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

const ExpenseItem = ({ id, title, amount, date, description }) => {
	const navigation = useNavigation();

	function expensePressHandler() {
		navigation.navigate('ManageExpense', { expenseId: id });
	}

	return (
		<Pressable
			onPress={expensePressHandler}
			style={({ pressed }) => pressed && styles.pressed}
		>
			<View style={styles.expenseItem}>
				<View>
					<Text style={[styles.textBase, styles.description]}>
						{title ? title : description}
					</Text>
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
	pressed: {
		opacity: 0.75,
	},
	expenseItem: {
		marginHorizontal: 20,
		marginBottom: 5,
		padding: 12,
		flexDirection: 'row',
		backgroundColor: 'white',
		justifyContent: 'space-between',
		borderRadius: 10,
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
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		minWidth: 110,
		// backgroundColor: 'white',
	},
	amount: {
		color: GlobalStyles.colors.highlight,
		fontWeight: 'bold',
	},
});
