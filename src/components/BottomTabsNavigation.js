import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { GlobalStyles } from '../constants/styles';
import Budget from '../screens/Budget';
import Home from '../screens/Home';
import Subscriptions from '../screens/Subscriptions';
import IconButton from './UI/IconButton';
const Tab = createBottomTabNavigator();

export default function BottomTabsNavigation() {
	const [bottomTabIndex, setBottomTabIndex] = useState(0);

	return (
		<Tab.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: GlobalStyles.colors.primary,
				},
				headerTitleAlign: 'center',
				headerTintColor: GlobalStyles.colors.highlight,
				tabBarShowLabel: false,
				tabBarStyle: {
					height: 70,
					paddingHorizontal: 135,
					paddingTop: 5,
					paddingBottom: 5,
				},
				tabBarItemStyle: {
					borderRadius: 100,
				},
				tabBarActiveTintColor: GlobalStyles.colors.primaryDark,
				tabBarActiveBackgroundColor: GlobalStyles.colors.lightAccent,
				headerRight: ({ tintColor }) => (
					<IconButton
						icon='add'
						size={30}
						color={tintColor}
						onPress={() => {
							switch (bottomTabIndex) {
								case 0:
									navigation.navigate('ManageExpense');
									break;
								case 1:
									navigation.navigate('ManageExpense');
									break;
								case 2:
									navigation.navigate('AddSubscription', { isEditing: false, formData: { id: null, amount: 0, name: "", duration : null} });
									break;
								case 3:
									navigation.navigate('ManageExpense');
									break;
								default:
									break;
							}
						}}
					/>
				),
			})}
		>
			<Tab.Screen
				listeners={{
					tabPress: (e) => {
						// e.preventDefault();
						setBottomTabIndex(0);
					},
				}}
				name='Home'
				component={Home}
				options={{
					title: 'Home',
					headerShown: false,
					tabBarLabel: 'Recent',
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? 'home' : 'home-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				listeners={{
					tabPress: (e) => {
						// e.preventDefault();
						setBottomTabIndex(2);
					},
				}}
				name='Subscriptions'
				component={Subscriptions}
				options={{
					title: 'Subscriptions',
					tabBarLabel: 'All',
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? 'library' : 'library-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
