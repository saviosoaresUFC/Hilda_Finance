import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import HeaderBar from '../components/HeaderBar'
import TableVendaDespesa from '../components/TableVendaDespesa'
import TableLucro from '../components/TableLucro'
import GraficLM from '../components/GraficLM'
import GraficVM from '../components/GraficVM'
import { COLORS } from '../theme/theme'
import { useStore } from '../store/store'
import LottieView from 'lottie-react-native'



const Relatorio = ({ navigation }) => {

  const ListaVendas = useStore(state => state.ListaVendas)
  const ListaDespesas = useStore(state => state.ListaDespesas)

  const avaliableKey = (amount) => {
    if (amount === '1') {
      navigation.push('Blocked');
    }
  }

  const navigationEdition = (amount) => {
    navigation.push('Edition');
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={[styles.headerBar, {height: ListaVendas.length === 0 && '7.7%'}]}>
        <HeaderBar avaliableKey={avaliableKey} />
      </View>
      <View style={styles.title}>
        <Text style={styles.text}>Relatório Venda/Despesa</Text>
      </View>
      {/* se a ListaVendas tiver vazio, exiba um Lottie */}
      {ListaVendas.length === 0 ? (
        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
          <LottieView
            source={require('../../img/LottieGraph3.json')}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />
        </View>
      ) : (
        <TableVendaDespesa />
      )}
      <View style={styles.title}>
        <Text style={styles.text}>Vendas Mensais</Text>
      </View>
      {ListaVendas.length === 0 ? (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <LottieView
            source={require('../../img/LottieGraph2.json')}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />
        </View>
      ) : (
        <View style={styles.graficVM}>
          <GraficVM />
        </View>
      )}

      <View style={[styles.title, { top: '1%' }]}>
        <Text style={styles.text}>Lucros Mensais</Text>
      </View>
      {ListaVendas.length === 0 ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '70%'}}>
          <LottieView
            source={require('../../img/LottieGraph.json')}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
        </View>
      ) : (
        <View style={styles.graficLM}>
          <GraficLM navigationEdition={navigationEdition} />
        </View>
      )}

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