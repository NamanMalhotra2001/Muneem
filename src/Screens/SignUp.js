import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
	Input,
	Icon,
	Stack,
	Center,
	NativeBaseProvider,
	Text,
	Button,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../constants/styles';

const SignUp = ({ route, navigation }) => {
	const [show, setShow] = React.useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password_1: '',
		password_2: '',
	});
	const styles = StyleSheet.create({
		paperShadow: {
			width: '70%',
			height: '60%',
			borderWidth: 4,
			borderRadius: 10,
			borderColor: '#ddd',
			shadowColor: '#ddd',
			shadowOffset: { width: 0, height: 0 },
			shadowOpacity: 0.9,
			shadowRadius: 4,
		},
		topHalfCircle: {
			width: 350,
			height: 350,
			backgroundColor: GlobalStyles.colors.accent,
			position: 'absolute',
			top: -175,
			left: -100,
			borderRadius: 180,
		},
		bottomHalfCircle: {
			width: 350,
			height: 350,
			backgroundColor: GlobalStyles.colors.accent,
			position: 'absolute',
			bottom: -175,
			right: -100,
			borderRadius: 180,
			zIndex: 0,
		},
		heading: {
			backgroundColor: 'white',
		},
		leftAlign: {
			alignSelf: 'flex-start',
			marginLeft: 48,
		},
		rightAlign: {
			alignSelf: 'flex-end',
			marginRight: 48,
		},
	});
	return (
		<NativeBaseProvider>
			<View style={styles.topHalfCircle}></View>
			<Center flex={1} px='3'>
				<Stack space={4} w='100%' alignItems='center'>
					<Text style={styles.leftAlign} bold fontSize='xl' mb='4'>
						Create account
					</Text>
					<Input
						w={{
							base: '75%',
							md: '25%',
						}}
						InputLeftElement={
							<Icon
								as={<MaterialIcons name='person' />}
								size={5}
								ml='2'
								color='muted.400'
							/>
						}
						placeholder='Email'
						onChangeText={(text) =>
							setFormData((oldData) => ({ ...oldData, email: text }))
						}
					/>
					<Input
						w={{
							base: '75%',
							md: '25%',
						}}
						type={show ? 'text' : 'password'}
						InputRightElement={
							<Icon
								as={
									<MaterialIcons
										name={show ? 'visibility' : 'visibility-off'}
									/>
								}
								size={5}
								mr='2'
								color='muted.400'
								onPress={() => setShow(!show)}
							/>
						}
						placeholder='Password'
						onChangeText={(text) =>
							setFormData((oldData) => ({ ...oldData, password_1: text }))
						}
					/>
					<Input
						w={{
							base: '75%',
							md: '25%',
						}}
						type={show ? 'text' : 'password'}
						InputRightElement={
							<Icon
								as={
									<MaterialIcons
										name={show ? 'visibility' : 'visibility-off'}
									/>
								}
								size={5}
								mr='2'
								color='muted.400'
								onPress={() => setShow(!show)}
							/>
						}
						placeholder='Re-Enter Password'
						onChangeText={(text) =>
							setFormData((oldData) => ({ ...oldData, password_2: text }))
						}
					/>
					<Button
						style={styles.leftAlign}
						backgroundColor={GlobalStyles.colors.highlight}
						onPress={() => console.log(formData)}
						size='sm'
					>
						Sign up
					</Button>
					<Button
						onPress={() => navigation.navigate('LogIn', {})}
						styles={styles.leftAlign}
						variant='unstyled'
					>
						{' '}
						Have an account? Log In
					</Button>
				</Stack>
			</Center>
			<View style={styles.bottomHalfCircle}></View>
		</NativeBaseProvider>
	);
};

export default SignUp;
