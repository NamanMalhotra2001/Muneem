import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CheckIcon, Select } from 'native-base';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { GlobalStyles } from '../../constants/styles';
import { getMonth } from '../../util/date';
import IconButton from '../UI/IconButton';

const AllExpensesHeader = ({applyFilterForMonth}) => {
	const navigation = useNavigation();
	const [dummy, setDummy] = useState({
		spent: 7650.00,
		budget: 10000.0,
	});
	const daysInThisMonth = () => {
		var now = new Date();
		return  new Date(now.getFullYear(), month + 1, 0).getDate();
	}
	const amountSpendablePerDay = () => {
		return ((dummy.budget - dummy.spent) / (daysInThisMonth() - new Date().getDate())).toFixed()
	}
	const percentage = (dummy.spent / dummy.budget) * 100;
	const [color, setColor] = useState('#ffffffff');
	const [secColor, setSecColor] = useState('#ffffffff');
	const [month, setMonth] = useState(new Date().getMonth())
	return (
		<View style={styles.container}>

			{/* // ########## left container ########## */}
			<View style={styles.leftContainer}>
				<IconButton
					icon='arrow-back'
					size={25}
					color={color} 
					onPress={() => navigation.goBack()}
				/>
				<Select selectedValue={month} minWidth="200"  accessibilityLabel="Choose Month" placeholder="Choose Month" _selectedItem={{
					bg: "teal.600",
					endIcon: <CheckIcon size="5" />
				}} mt={1} onValueChange={itemValue => {setMonth(itemValue)
				, applyFilterForMonth(itemValue)
				}}>
					<Select.Item label="January" value={0} />
					<Select.Item label="February" value={1} />
					<Select.Item label="March" value={2} />
					<Select.Item label="April" value={3} />
					<Select.Item label="May" value={4} />
					<Select.Item label="June" value={5} />
					<Select.Item label="July" value={6} />
					<Select.Item label="August" value={7} />
					<Select.Item label="September" value={8} />
					<Select.Item label="October" value={9} />
					<Select.Item label="November" value={10} />
					<Select.Item label="December" value={11} />
				</Select>
				{/* // ########## circle ########## */}


			</View>
			<View style={styles.statContainer}>
				<View style={styles.stat}>
					<Text
						style={{
							color: 'white',
							fontSize: 16,
							textAlign: 'center'
						}}
					>Safe to spend</Text>
					<CircularProgress
						radius={45}
						value={(dummy.spent / dummy.budget) * 100}
						showProgressValue={false}
						activeStrokeColor={color}
						inActiveStrokeColor={secColor}
						activeStrokeWidth={8}
						inActiveStrokeWidth={5}
						inActiveStrokeOpacity={0.4}
					/>


					<View style={styles.infoContainer}>
						{/* // ########## month text ########## */}

						{/* // ########## spent text ########## */}

						<View style={styles.spentAmountContainer}>

							<Text
								style={{
									color: 'white',
									fontSize: 18,
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
								{amountSpendablePerDay()}
							</Text>
						</View>
						<Text style={{
							position: 'absolute',
							left: 55,
							top: 60,
							color: 'white',
							fontSize: 14,
							textAlign: 'center'
						}}>Per day</Text>


					</View>
				</View>
				<View style={styles.stat}>
					<View>
						<Text style={styles.smallHeader}>Total Spent</Text>
						<Text style={styles.Value}><Text
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
								{dummy.spent.toFixed(2)}
							</Text></Text>
					</View>
				</View>
				<View style={styles.stat}>
					<View style={styles.dividedHorizontal}>
						<Text style={styles.smallHeader}>Total Income</Text>
						<Text style={styles.Value}><Text
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
								{25000}
							</Text></Text>
					</View>
				</View>
			</View>

		</View>
	);
};
export default AllExpensesHeader;

const styles = StyleSheet.create({
	smallHeader: {
		color: 'white',
		fontSize: 14,
	},
	statContainer: {
		marginTop: 15,
		flex: 1,
		flexDirection: 'row',
		width: '100%',
		height: '20%', 
	},
	stat: {
		width: '33%',
		padding: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flexDirection: 'column',
		paddingTop: '7%',
		height: 210,
		backgroundColor: GlobalStyles.colors.primary, 
		paddingBottom : 5,
	},
	leftContainer: { 
		flexDirection: 'row',
		position: 'relative',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		// backgroundColor: '#5e5e5e8a',
	},
	rightContainer: {
		flex: 1,
		position: 'relative',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderRadius: 100,
		// backgroundColor: '#5e5e5e3e',
	},
	infoContainer: {
		position: 'absolute',
		top: 10,
		left: -15,
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
		position: 'absolute',
		left: 0,
		top: 30,
		flexDirection: 'row',
		width: 150,
		justifyContent: 'center',
		alignItems: 'center',
	},
	budgetAmountContainer: {
		flexDirection: 'row',
		width: 81,
		justifyContent: 'center',
		alignItems: 'center', 
		borderColor: 'red',
	},
});
