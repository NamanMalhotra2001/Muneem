import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';

const ManageExpense = ({ route, navigation }) => {
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
		});
	}, []);

	function deleteExpenseHandler() {}

	return (
		<View style={styles.container}>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon='trash'
						color='red'
						size={24}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
};
export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.lightAccent,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary,
		alignItems: 'center',
	},
});
