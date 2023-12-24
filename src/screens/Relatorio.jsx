import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import HeaderBar from '../components/HeaderBar'
import TableVendaDespesa from '../components/TableVendaDespesa'
import { COLORS } from '../theme/theme'
import TableLucro from '../components/TableLucro'
import { StatusBar } from 'expo-status-bar'


const Relatorio = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.headerBar}>
        <HeaderBar />
      </View>
      <View style={styles.title}>
        <Text style={styles.text}>Relatório Venda/Despesa</Text>
      </View>
      <TableVendaDespesa />
      <View style={styles.title2}>
        <Text style={styles.text}>Relatório Lucro</Text>
      </View>
      <TableLucro />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C2C2C2',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '6%',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  title2: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: '60%',
    marginTop: '12%',
  },
  headerBar: {
    height: '6%',
  },
})

export default Relatorio