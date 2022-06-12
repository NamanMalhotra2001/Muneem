import { View, NativeBaseProvider } from 'native-base';
import { Text } from 'react-native';
import { styles } from 'react-native-element-dropdown/src/components/TextInput/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
	const navigation = useNavigation();
	return (
		<NativeBaseProvider>
			<View
				style={{
					padding: 20,
					width: '100%',
					backgroundColor: '#00f397',
					height: 120,
					alignItems: 'center',
				}}
			>
				<Image
					source={require('../../assets/blank-profile-picture-973460_640.png')}
					style={{ width: 140, height: 140, borderRadius: 100, marginTop: 10 }}
				></Image>
			</View>

			<Card style={{ margin: 3, marginTop: 70 }}>
				<View
					style={{
						flexDirection: 'row',
						backgroundColor: '#D1FAE0',
						padding: 8,
						margin: 5,
					}}
				>
					<MaterialIcons name='email' size={40} color='black' />
					<Text style={{ fontSize: 18, marginTop: 7, marginLeft: 6 }}>
						Email@gmail.com
					</Text>
				</View>
			</Card>

			<Card style={{ margin: 3 }}>
				<View
					style={{
						flexDirection: 'row',
						backgroundColor: '#D1FAE0',
						padding: 8,
						margin: 5,
					}}
				>
					<FontAwesome name='rupee' size={40} color='black' />
					<Text style={{ fontSize: 18, marginTop: 7, marginLeft: 27 }}>
						30000
					</Text>
				</View>
			</Card>

			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-around',
					padding: 20,
					marginTop: 160,
				}}
			>
				<Button
					icon='exit-to-app'
					mode='contained'
					onPress={() => console.log('Pressed')}
				>
					Sign out
				</Button>
			</View>
		</NativeBaseProvider>
	);
};
export default UserProfile;
