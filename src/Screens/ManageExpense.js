import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/UI/Button';
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

	function cancelHandler() {}

	return (
		<View style={styles.container}>
			<View style={styles.buttonsContainer}>
				<Button style={styles.button} mode='flat' onPress={cancelHandler}>
					Cancel
				</Button>
				<Button style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
			</View>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						style={styles.deleteButton}
						icon='trash'
						color='#ff5454'
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
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
	deleteButton: {
		borderRadius: 10,
		backgroundColor: 'white',
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 3,
		shadowOffset: { height: 1, width: 0 },
		shadowRadius: 4,
		shadowOpacity: 0.2,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary,
		alignItems: 'center',
	},
});
