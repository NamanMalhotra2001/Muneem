import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

const IconButton = ({ icon, size, color, onPress, style }) => {
	return (
		<Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
			<View style={[styles.buttonContainer, style && style]}>
				<Ionicons name={icon} size={size} color={color} />
			</View>
		</Pressable>
	);
};

export default IconButton;

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 30,
		padding: 6,
		margin: 8,
	},
	pressed: {
		opacity: 0.75,
	},
});
