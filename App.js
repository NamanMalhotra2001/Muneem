import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import BottomTabsNavigation from './src/components/BottomTabsNavigation';
import { GlobalStyles } from './src/constants/styles';
import AddSubscription from './src/screens/AddSubscription';
import AllExpenses from './src/screens/AllExpenses';
import Intro from './src/screens/Intro';
import LogIn from './src/screens/LogIn';
import ManageExpenses from './src/screens/ManageExpense';
import SignUp from './src/screens/SignUp';
import UserProfile from './src/screens/UserProfile';
import ExpensesContextProvider from './src/store/expenses-context';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<>
			<StatusBar
				style='auto'
				animated={true}
				backgroundColor={GlobalStyles.colors.primary}
			/>
			<ExpensesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: {
								backgroundColor: GlobalStyles.colors.primary,
							},
							headerTintColor: GlobalStyles.colors.highlight,
						}}
						initialRouteName={'BottomTabsNavigation'}
					>
						<Stack.Screen
							name='Intro'
							component={Intro}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='LogIn'
							component={LogIn}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='SignUp'
							component={SignUp}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='UserProfile'
							component={UserProfile}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='BottomTabsNavigation'
							component={BottomTabsNavigation}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='AllExpenses'
							component={AllExpenses}
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
