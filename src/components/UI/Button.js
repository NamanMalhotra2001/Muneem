import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Button = ({ children, onPress, mode, style }) => {
	return (
		<View style={style}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => pressed && styles.pressed}
			>
				<View style={[styles.button, mode === 'flat' && styles.flat]}>
					<Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
						{children}
					</Text>
				</View>
			</Pressable>
		</View>
	);
};
export default Button;

const styles = StyleSheet.create({
	button: {
		borderRadius: 4,
		padding: 8,
		backgroundColor: GlobalStyles.colors.primary,
	},
	flat: {
		backgroundColor: 'transparent',
	},
	buttonText: {
		color: GlobalStyles.colors.highlight,
		textAlign: 'center',
	},
	flatText: {
		color: GlobalStyles.colors.highlight,
	},
	pressed: {
		opacity: 0.75,
		// backgroundColor: GlobalStyles.colors.accent,
		backgroundColor: 'white',
		borderRadius: 4,
	},
});
