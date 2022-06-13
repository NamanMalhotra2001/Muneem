import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
	Input,
	Icon,
	Stack,
	Center,
	NativeBaseProvider,
	Text,
	Button,
	HStack,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../constants/styles';
import { login } from '../util/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogIn = ({ route, navigation }) => {
	const [show, setShow] = React.useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	function submitHandler(formData) {
		let { email, password } = formData;

		email = email.trim();
		password = password.trim();

		const emailIsValid = email.includes('@');
		const passwordIsValid = password.length > 6;

		if (!emailIsValid || !passwordIsValid) {
			Alert.alert('Invalid input', 'Please check your entered credentials.');
			return;
		}

		const storeData = async (value) => {
			try {
				await AsyncStorage.setItem('isLogin', value);
			} catch (e) {
				// saving error
			}
		};

		storeData('true');

		login(email, password);
		navigation.navigate('BottomTabsNavigation');
	}

	return (
		<NativeBaseProvider>
			<View style={styles.topHalfCircle}></View>
			<Center flex={1} px='3'>
				<Stack space={4} w='100%' alignItems='center'>
					<Text style={styles.leftAlign} bold fontSize='xl' mb='4'>
						Log in
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
							setFormData((oldData) => ({ ...oldData, password: text }))
						}
					/>
					<Button
						style={styles.leftAlign}
						backgroundColor={GlobalStyles.colors.highlight}
						onPress={() => {
							submitHandler(formData);
						}}
						size='sm'
					>
						Sign in
					</Button>
					<Button
						onPress={() => navigation.navigate('SignUp', {})}
						styles={styles.leftAlign}
						variant='unstyled'
					>
						New to Us? Sign Up!
					</Button>
				</Stack>
			</Center>
			<View style={styles.bottomHalfCircle}></View>
		</NativeBaseProvider>
	);
};

export default LogIn;

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
		width: 360,
		height: 350,
		backgroundColor: GlobalStyles.colors.accent,
		position: 'absolute',
		bottom: -175,
		right: -120,
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
