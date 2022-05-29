import { Pressable, StyleSheet, Text, View } from 'react-native';

const Button = ({ children, onPress }) => {
	return (
		<View>
			<Pressable onPress={onPress}>
				<View>
					<Text></Text>
				</View>
			</Pressable>
		</View>
	);
};
export default Button;

const styles = StyleSheet.create({
	
})