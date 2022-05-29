import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../constants/styles';

const IconButton = ({ icon, size, color, onPress }) => {
	return (
		<Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
			<View style={styles.buttonContainer}>
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
