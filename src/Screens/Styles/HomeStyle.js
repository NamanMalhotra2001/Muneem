import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  marginUpDown: {
    marginTop: 20,
    marginBottom: 20
  },
  btn:
    {
      color: 'white',
      backgroundColor: 'green'

    },
  title: {
    marginLeft: 20,
    marginTop: 15
  },
  header: {
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: 'rgb(50,50,50)',
    borderBottomWidth: 2
  },
  paperShadow: {
    overflow: 'hidden',
    boxShadow: 'grey 2px 2px 10px',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 20,
    width: '90%'
  }
})

export default styles
