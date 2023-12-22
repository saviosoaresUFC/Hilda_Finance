import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { COLORS, ICONS } from '../theme/theme'
import { StatusBar } from 'expo-status-bar'

const HeaderBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hilda-Finance</Text>
      <Image source={ICONS.avatarsavio} style={styles.img}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.orange,
        marginTop: '8%',
    },
    text:{
        fontWeight: 'bold',
        fontSize: 26,
        marginLeft: '4%',
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 16,
        marginRight: '4%'
    }
})

export default HeaderBar
