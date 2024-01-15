import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import HeaderBar from '../components/HeaderBar'
import TableVendaDespesa from '../components/TableVendaDespesa'
import TableLucro from '../components/TableLucro'
import GraficLM from '../components/GraficLM'
import GraficVM from '../components/GraficVM'
import { COLORS } from '../theme/theme'



const Relatorio = ({ navigation }) => {

  const avaliableKey = (amount) => {
    if (amount === '1') {
      navigation.push('Blocked');
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.headerBar}>
        <HeaderBar avaliableKey={avaliableKey} />
      </View>
      <View style={styles.title}>
        <Text style={styles.text}>Relatório Venda/Despesa</Text>
      </View>
      <TableVendaDespesa />
      {/* <View style={styles.title2}>
        <Text style={styles.text}>Relatório Lucro</Text>
      </View> */}
      {/* <TableLucro /> */}
      <View style={styles.title}>
        <Text style={styles.text}>Vendas Mensais</Text>
      </View>
      <View style={styles.graficVM}>
        <GraficVM />
      </View>
      <View style={[styles.title, {top: '1%'}]}>
        <Text style={styles.text}>Lucros Mensais</Text>
      </View>
      <View style={styles.graficLM}>
        <GraficLM />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
    marginBottom: '-30%',
  },
  headerBar: {
    height: '5.6%',
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
    // marginTop: '12%',
  },
  graficVM: {
    marginBottom: '20%',
    height: '14%',
    padding: '4%',
  },
  graficLM: {
    height: '100%',
    padding: '4%',
    top: '0.5%',
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

export default Relatorio