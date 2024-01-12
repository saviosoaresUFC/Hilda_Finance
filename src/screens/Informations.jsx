import React from 'react'
import { StyleSheet, View, ViewProps, TouchableOpacity, Text } from 'react-native'
import { COLORS } from '../theme/theme'
import GraficLM from '../components/GraficLM'
import { useStore } from '../store/store'
import GraficVM from '../components/GraficVM'

const Informations = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.titleGrafic, {top: '5%'}]}>
        <Text style={styles.titleText}>Vendas por mês</Text>
      </View>
      <GraficVM />
      <View style={styles.titleGrafic}>
        <Text style={styles.titleText}>Lucro por mês</Text>
        <GraficLM />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.gray,
    padding: '4%',
  },
  titleGrafic: {
    width: '100%',
    alignItems: 'center',
    marginBottom: '10%',
    top: '2.5%',
  },
  titleText: {
    color: COLORS.black,
    fontFamily: 'Inter-Black',
    fontSize: 18,
  },
})

export default Informations