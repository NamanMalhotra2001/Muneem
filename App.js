import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import IconButton from './src/components/UI/IconButton';
import { GlobalStyles } from './src/constants/styles';
import AllExpenses from './src/screens/AllExpenses';
import ManageExpense from './src/screens/ManageExpense';
import RecentExpenses from './src/screens/RecentExpenses';
import Subscriptions from './src/screens/Subscriptions.js';
import ExpensesContextProvider from './src/store/expenses-context';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
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
				tabBarActiveBackgroundColor: GlobalStyles.colors.primary,
				tabBarInactiveTintColor: GlobalStyles.colors.inactive,
				headerRight: ({ tintColor }) => (
					<IconButton
						icon='add'
						size={30}
						color={tintColor}
						onPress={() => {
							navigation.navigate('ManageExpense');
						}}
					/>
				),
			})}
		>
			<Tab.Screen
				name='RecentExpenses'
				component={RecentExpenses}
				options={{
					title: 'Recent Expenses',
					tabBarLabel: 'Recent',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='home' size={size} color={color} />
					),
				}}
			/>
			<Tab.Screen
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
			<Tab.Screen
				name='Subscriptionss'
				component={Subscriptions}
				options={{
					title: 'Subscriptions',
					tabBarLabel: 'All',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='calendar' size={size} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style='auto' />
			<ExpensesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: {
								backgroundColor: GlobalStyles.colors.primary,
							},
							headerTintColor: GlobalStyles.colors.highlight,
						}}
					>
						<Stack.Screen
							name='ExpensesOverview'
							component={ExpensesOverview}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='ManageExpense'
							component={ManageExpense}
							options={{
								title: 'Manage Expense',
								headerTitleAlign: 'center',
								presentation: 'modal',
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
		</>
	);
}
