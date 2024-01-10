import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useStore } from '../store/store'
import { COLORS } from '../theme/theme'



const Informations = () => {
  const ListaVendas = useStore((state: any) => state.ListaVendas)
  const ListaDespesas = useStore((state: any) => state.ListaDespesas)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Informations</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayescuro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
  }
})

export default Informations