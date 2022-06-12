import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

const SubscriptionItem = ({ id, amount, name, logo, duration }) => {
	const navigation = useNavigation();
	console.log(name);
	function subscriptionPressHandler() {
		navigation.navigate('AddSubscription', { isEditing: true, formData: { id: id, amount: amount, name: name, duration : duration} });
	}

	return (
		<NativeBaseProvider>
			<Pressable
				onPress={subscriptionPressHandler}
				style={({ pressed }) => pressed && styles.pressed}
			>
				<View style={styles.expenseItem}>
					<Image
						style={styles.stretch}
						source={{
							uri: logo
						}}
					/>
					<View style={styles.stat}>
						<Text style={[styles.textBase, styles.description]}>
							{name}
						</Text>
						<Text style={styles.textBase}>₹{amount}</Text>
					</View>
				</View>
			</Pressable>
		</NativeBaseProvider>

	);
};

export default SubscriptionItem;

const styles = StyleSheet.create({
	stat: {
		width: '100%',
		marginLeft: 15,
		marginTop: 3,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	pressed: {
		opacity: 0.75,
	},
	stretch: {
		width: 90,
		height: 55,
		resizeMode: 'stretch',
		borderRadius: 8,
		marginTop: 3,
	},
	expenseItem: {
		marginHorizontal: 20,
		marginVertical: 8,
		padding: 5,
		flexDirection: 'row',
		height: 70,
		backgroundColor: 'white',
		justifyContent: 'space-between',
		borderRadius: 10,
	},
	textBase: {
		color: 'black',
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
