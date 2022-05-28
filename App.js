import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { GlobalStyles } from './src/constants/styles';
import AllExpenses from './src/screens/AllExpenses';
import ManageExpense from './src/screens/ManageExpense';
import RecentExpenses from './src/screens/RecentExpenses';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
	return (
		<BottomTabs.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: GlobalStyles.colors.primary,
				},
				headerTintColor: 'white',
				tabBarStyle: {
					backgroundColor: GlobalStyles.colors.primary,
				},
				tabBarActiveTintColor: GlobalStyles.colors.highlight,
				tabBarInactiveBackgroundColor: GlobalStyles.colors.accent,
				tabBarInactiveTintColor: GlobalStyles.colors.inactive,
			}}
		>
			<BottomTabs.Screen
				name='RecentExpenses'
				component={RecentExpenses}
				options={{
					title: 'Recent Expenses',
					tabBarLabel: 'Recent',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='hourglass' size={size} color={color} />
					),
				}}
			/>
			<BottomTabs.Screen
				name='AllExpenses'
				component={AllExpenses}
				options={{
					title: 'All Expenses',
					tabBarLabel: 'All',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='calendar' size={size} color={color} />
					),
				}}
			/>
		</BottomTabs.Navigator>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style='auto' />
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='ExpensesOverview'
						component={ExpensesOverview}
						options={{ headerShown: false }}
					/>
					<Stack.Screen name='ManageExpense' component={ManageExpense} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
