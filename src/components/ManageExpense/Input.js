import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Input({ label, textInputConfig, valid }) {
	const inputStyles = [styles.input];

	if (textInputConfig && textInputConfig.multiline) {
		inputStyles.push(styles.inputMultiline);
	}

	return (
		<View style={styles.inputContainer}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={[inputStyles, label && styles.input2, !valid && styles.invalid]}
				{...textInputConfig}
			/>
		</View>
	);
}

export default Input;

const styles = StyleSheet.create({
	invalid: {
		borderWidth: 0.5,
		borderColor: 'red',
		backgroundColor: '#fff3f3',
	},
	inputContainer: {
		position: 'relative',
		marginHorizontal: 20,
		marginTop: 8,
	},
	label: {
		position: 'absolute',
		top: 9,
		left: 10,
		fontSize: 16,
		color: 'black',
		marginBottom: 4,
		zIndex: 10,
	},
	input: {
		backgroundColor: 'white',
		color: GlobalStyles.colors.highlight,
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
	},
	input2: {
		backgroundColor: 'white',
		color: GlobalStyles.colors.highlight,
		padding: 6,
		paddingLeft: 25,
		borderRadius: 6,
		fontSize: 18,
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
});
