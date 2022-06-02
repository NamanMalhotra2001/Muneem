import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Input({ label, textInputConfig, valid, style }) {
	const inputStyles = [styles.input];

	if (textInputConfig && textInputConfig.multiline) {
		inputStyles.push(styles.inputMultiline);
	}

	return (
		<View style={[styles.inputContainer, style && style]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={[
					inputStyles,
					label && styles.input2,
					!valid && styles.invalid,
					// textInputConfig.style && textInputConfig.style,
					styles.inputs,
				]}
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
	},
	label: {
		position: 'absolute',
		top: 18,
		left: 15,
		fontSize: 16,
		color: 'black',
		marginBottom: 4,
		zIndex: 10,
	},
	inputs: {
		paddingVertical: 15,
	},
	input: {
		backgroundColor: 'white',
		color: GlobalStyles.colors.highlight,
		padding: 15,
		fontSize: 18,
	},
	input2: {
		backgroundColor: 'white',
		color: GlobalStyles.colors.highlight,
		padding: 15,
		paddingLeft: 30,
		fontSize: 18,
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
});
