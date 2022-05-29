import { FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData) {
	return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({ expenses }) => {
	return (
		<FlatList
			style={{ marginBottom: '20%' }}
			data={expenses}
			renderItem={renderExpenseItem}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default ExpensesList;
