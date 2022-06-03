import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const HomeHeader = () => {
	return (
		<View style={styles.container}>
			<Text>HomeHeader</Text>
		</View>
	);
};
export default HomeHeader;

const styles = StyleSheet.create({
	container: {
		paddingTop: '6%',
		height: 200,
		backgroundColor: GlobalStyles.colors.accent,
	},
});
