import { Button } from "@react-native-material/core"
import React from "react"
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Add_expense_float = ({title}) => {
    const style = StyleSheet.create({
        shapeCircle : {
            position : 'absolute',
            top : 500,
            right : 10,
        }
    })
    return (
        <View>
              <Ionicons  style={style.shapeCircle} name="add-circle" size={60} color={'green'}></Ionicons>
        </View>

    )
}
export default { Add_expense_float }