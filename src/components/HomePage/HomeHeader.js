import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import CircularProgress from 'react-native-circular-progress-indicator';

const HomeHeader = () => {
	return (
		<View style={styles.container}>
			<View style={{ marginLeft: 20 }}>
				<CircularProgress
					radius={85}
					value={90}
					showProgressValue={false}
					inActiveStrokeColor={GlobalStyles.colors.accent}
					activeStrokeColor={GlobalStyles.colors.lightAccent}
					inActiveStrokeWidth={5}
					activeStrokeWidth={10}
					inActiveStrokeOpacity={0.6}
				/>
			</View>
			<View style={styles.amountContainer}>
				<Text
					style={{ color: 'white', fontSize: 15, marginTop: 5, marginRight: 5 }}
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
					4900.32
				</Text>
			</View>
		</View>
	);
};
export default HomeHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingTop: '6%',
		height: 200,
		backgroundColor: GlobalStyles.colors.primary,
	},
	amountContainer: {
		// backgroundColor: 'red',
		position: 'absolute',
		top: 70,
		left: 30,
		flexDirection: 'row',
		width: 150,
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
