import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome, Fontisto } from '@expo/vector-icons'

const Edition = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={styles.button}
      onPress={() => alert('Edition')}>
        <Text style={styles.text}>Edition</Text>
        <FontAwesome name="edit" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 10,
  }
})

export default Edition