import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { GlobalStyles } from '../constants/styles';
import AllExpenses from '../screens/AllExpenses';
import Budget from '../screens/Budget';
import RecentExpenses from '../screens/RecentExpenses';
import Subscriptions from '../screens/Subscriptions';
import IconButton from './UI/IconButton';
const Tab = createBottomTabNavigator();

export default function ExpensesOverview() {
	const [bottomTabIndex, setBottomTabIndex] = useState(0);
	console.log(bottomTabIndex);

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
					height: '8%',
				},
				tabBarItemStyle: {
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
				},
				tabBarActiveTintColor: GlobalStyles.colors.highlight,
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
									navigation.navigate('AddSubscription');
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
				name='RecentExpenses'
				component={RecentExpenses}
				options={{
					title: 'Recent Expenses',
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
						setBottomTabIndex(1);
					},
				}}
				name='AllExpenses'
				component={AllExpenses}
				options={{
					title: 'All Expenses',
					tabBarLabel: 'All',
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? 'calendar' : 'calendar-outline'}
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
				name='Subscriptionss'
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
			<Tab.Screen
				listeners={{
					tabPress: (e) => {
						// e.preventDefault();
						setBottomTabIndex(3);
					},
				}}
				name='Budget'
				component={Budget}
				options={{
					title: 'Budget',
					tabBarLabel: 'All',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='calendar' size={size} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
