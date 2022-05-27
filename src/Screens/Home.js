import { StyleSheet, View } from 'react-native';

import { Box, Stack, Text } from '@react-native-material/core';
import { PieChart } from 'react-native-chart-kit';
import TotalTile from '../components/TotalTile';
// import { Input, Test } from '../Assets/Utils';
// import styles from './Styles/HomeStyle';
// import TotalTile from '../Assets/TotalTile';

const Home = () => {
	const data = [
		{
			name: 'Food',
			amount: 3100,
			color: 'rgba(131, 167, 234, 1)',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15,
		},
		{
			name: 'OTT',
			amount: 800,
			color: '#F00',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15,
		},
		{
			name: 'Mobile',
			amount: 649,
			color: 'red',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15,
		},
		{
			name: 'Electricity',
			amount: 2000,
			color: '#d0ff7f',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15,
		},
		{
			name: 'Shopping',
			amount: 4500,
			color: 'rgb(0, 0, 255)',
			legendFontColor: '#7F7F7F',
			legendFontSize: 15,
		},
	];
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
				flexDirection: 'column',
				backgroundColor: '#CCDBEF',
			}}
		>
			<Box style={styles.paperShadow}>
				<View style={styles.header}>
					<Text variant='h6' style={{ marginLeft: 20, color: 'rgb(50,50,50)' }}>
						Overview - May
					</Text>
				</View>

				<Stack spacing={2} style={{ margin: 16 }}>
					<TotalTile name='Expense' amount={12000}></TotalTile>
					<TotalTile name='Income' amount={25000}></TotalTile>
				</Stack>
			</Box>
			<Box h={'45%'} style={styles.paperShadow}>
				<View style={styles.header}>
					<Text variant='h6' style={{ marginLeft: 20, color: 'rgb(50,50,50)' }}>
						Expenses by category
					</Text>
				</View>
				<View>
					<Text style={styles.title}>Categories</Text>
					<PieChart
						data={data}
						width={300}
						height={150}
						accessor={'amount'}
						backgroundColor={'transparent'}
						chartConfig={{
							backgroundColor: '#e26a00',
							backgroundGradientFrom: '#fb8c00',
							backgroundGradientTo: '#ffa726',
							decimalPlaces: 2, // optional, defaults to 2dp
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							labelColor: (opacity = 1) =>
								`rgba(255, 255, 255, ${opacity})`,
							style: {
								borderRadius: 16,
							},
						}}
						center={[5, 5]}
						absolute
					/>
				</View>
			</Box>
		</View>
	);
};
export default Home;

const styles = StyleSheet.create({
	marginUpDown: {
		marginTop: 20,
		marginBottom: 20,
	},
	btn: {
		color: 'white',
		backgroundColor: 'green',
	},
	title: {
		marginLeft: 20,
		marginTop: 15,
	},
	header: {
		width: '100%',
		height: 50,
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		borderColor: 'rgb(50,50,50)',
		borderBottomWidth: 2,
	},
	paperShadow: {
		overflow: 'hidden',
		boxShadow: 'grey 2px 2px 10px',
		backgroundColor: '#F0F0F0',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: 'gray',
		margin: 20,
		width: '90%',
	},
});
