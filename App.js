import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import IconButton from './src/components/UI/IconButton';
import { GlobalStyles } from './src/constants/styles';
import AllExpenses from './src/screens/AllExpenses';
import ManageExpenses from './src/screens/ManageExpense';
import RecentExpenses from './src/screens/RecentExpenses';
import Subscriptions from './src/screens/Subscriptions.js';
import Budget from './src/screens/Budget';
import ExpensesContextProvider from './src/store/expenses-context';
import AddSubscription from './src/screens/AddSubscription';
import ExpensesOverview from './src/components/ExpensesOverview';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
							component={ManageExpenses}
							options={{
								title: 'Manage Expense',
								headerTitleAlign: 'center',
								presentation: 'modal',
							}}
						/>
						<Stack.Screen
							name='AddSubscription'
							component={AddSubscription}
							options={{
								title: 'Add Subscription',
								headerTitleAlign: 'center',
								// presentation: 'modal',
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
		</>
	);
}
