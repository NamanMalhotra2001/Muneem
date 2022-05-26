import { Text } from '@react-native-material/core'
import { View, StyleSheet, ScrollView, StatusBar, Button } from 'react-native'
import React from 'react'
import Menu from '../Components/Menu';
const Expenses = () => {
	return <View>
		<Text>Expenses</Text>
		 <Menu.Add_expense_float title="test"/>     
	</View>
}
export default Expenses
