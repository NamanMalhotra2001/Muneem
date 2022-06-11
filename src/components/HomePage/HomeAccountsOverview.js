import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const HomeAccountsOverview = ({ expenses }) => {
	// console.log(expenses);
	return (
		<View style={styles.container}>{/* <Text>HomeAccountsOverview</Text> */}</View>
	);
};
export default HomeAccountsOverview;

const styles = StyleSheet.create({
	container: {
		height: 130,
		backgroundColor: GlobalStyles.colors.primaryDark,
	},
});
