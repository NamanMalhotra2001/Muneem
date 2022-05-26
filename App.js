import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Stack, Text, TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './src/Screens/Home';
import Expenses from './src/Screens/Expenses'; 
import Settings from './src/Screens/Settings'; 
const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						if (route.name === 'Home') {
							iconName = 'home';
						}
						else if (route.name === 'Settings') {
							iconName = 'settings';
						}
						else if (route.name === 'Expenses') {
							iconName = 'cash-outline';
						}
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: 'tomato',
					tabBarInactiveTintColor: 'gray',
				})}>
				<Tab.Screen name="Home" component={Home} />
				<Tab.Screen name="Expenses" component={Expenses} /> 
				<Tab.Screen name="Settings" component={Settings} /> 
			</Tab.Navigator>
		</NavigationContainer>
	);
}