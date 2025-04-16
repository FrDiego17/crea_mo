import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <Stack.Navigator initialRouteName="MiPagina">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MiPagina" component={MiPagina} />
    </Stack.Navigator>

  )
}

export default App

const styles = StyleSheet.create({})