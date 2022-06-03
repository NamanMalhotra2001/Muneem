import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ExpensesOverview from './src/components/ExpensesOverview';
import { GlobalStyles } from './src/constants/styles';
import AddSubscription from './src/screens/AddSubscription';
import AllExpenses from './src/screens/AllExpenses';
import ManageExpenses from './src/screens/ManageExpense';
import ExpensesContextProvider from './src/store/expenses-context';
import Intro from './src/screens/Intro';
import LogIn from './src/screens/LogIn';
import SignUp from './src/screens/SignUp';
const Stack = createNativeStackNavigator();

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
						{/* <Stack.Screen
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
						/> */}
						<Stack.Screen
							name='ExpensesOverview'
							component={ExpensesOverview}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='AllExpenses'
							component={AllExpenses}
							options={{ headerTitleAlign: 'center' }}
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
