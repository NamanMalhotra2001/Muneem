
import _ from 'lodash'
import { StyleSheet, Text, View } from 'react-native'
const TotalTile = (props) => {
    const styles = StyleSheet.create({
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '98%',
            marginVertical: 5,
            borderColor: 'gray',
            fontWeight: 550,
            fontSize: '18px'
        },
        tData: {
            color: 'black',
            margin: 10,
            borderRadius: 8,
            padding: 5,
            textAlign: 'left'
        },
        income: {
            color: 'green'
        },
        expense: {
            color: 'red'
        },
        indic: {
            width: 8,
            height: '100%',
            backgroundColor: 'green'
        }
    })

    return (
        <View style={styles.row}>
            <Text>
                Expense
            </Text>

            {/* <View style={[styles.indic, props.name === 'Expense' ? { backgroundColor: 'red' } : { backgroundColor: 'green' }]} >
            </View>
            <View style={styles.tData} id='name'>
                <View> Total {props.name}</View>
            </View>
            <View style={[styles.tData, props.name === 'Expense' ? styles.expense : styles.income]} id='amount'>
                <View>${props.amount}</View>
            </View> */}
        </View>
    )
}
export default TotalTile
