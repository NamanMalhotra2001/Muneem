import { Image, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const AccountItem = ({ name, pic, spent, balance }) => {
	return (
		<View style={styles.container}>
			<Image
				style={{ width: 60, height: 60, resizeMode: 'contain' }}
				source={{
					uri: pic,
				}}
			/>
			<View style={styles.spentBalanceContainer}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Text style={styles.textSmall}>spent: </Text>
					<Text style={styles.text}>
						{GlobalStyles.symbols.rupee} {spent}
					</Text>
				</View>
				{balance && (
					<View
						style={{
							flexDirection: 'row',
							borderTopWidth: 1,
							width: 150,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text style={styles.textSmall}>balance: </Text>
						<Text style={styles.text}>
							{GlobalStyles.symbols.rupee} {balance}
						</Text>
					</View>
				)}
			</View>
			{/* <View>
				<Text style={[styles.textBase, styles.description]}>
					{title ? title : description}
				</Text>
				<Text style={styles.textBase}>{getFormattedDate(date)}</Text>
			</View>
			<View style={styles.amountContainer}>
				<Text style={styles.amount}>₹ {amount.toFixed(2)}</Text>
			</View> */}
		</View>
	);
};

export default AccountItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: 'space-between',
		width: 300,
		height: 110,
		marginHorizontal: 8,
		paddingHorizontal: 12,
		backgroundColor: 'white',
		borderRadius: 10,
		elevation: 2,
	},
	spentBalanceContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	textSmall: {
		fontSize: 14,
		fontWeight: '400',
	},
	text: {
		color: GlobalStyles.colors.highlight,
		fontSize: 18,
		fontWeight: '500',
	},
});
