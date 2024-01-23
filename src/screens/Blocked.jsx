import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../theme/theme'


const Blocked = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Blocked</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 20
  }
})

export default Blocked