import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData) {
	return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({ expenses, button }) => {
	useEffect(() => {
		setTimeout(() => {
			setFloat(true);
		}, 500);
	}, []);

	const navigate = useNavigation();
	const [float, setFloat] = useState(true);

	return (
		<>
			<FlatList
				// style={{ marginBottom: '20%' }}
				data={expenses}
				renderItem={renderExpenseItem}
				keyExtractor={(item) => item.id}
				onScroll={() => setFloat(true)}
				onEndReached={() => setFloat(false)}
			/>
			{float && button ? (
				<IconButton
					onPress={() => {
						navigate.navigate('AllExpenses');
					}}
					icon='ios-arrow-redo-outline'
					size={24}
					color='gray'
					style={{
						borderRadius: 30,
						position: 'absolute',
						top: -60,
						right: 10,
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
			) : (
				<></>
			)}
		</>
	);
};

export default ExpensesList;
