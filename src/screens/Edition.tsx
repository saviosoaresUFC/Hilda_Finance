import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { FontAwesome, Fontisto } from '@expo/vector-icons'
import { COLORS, ICONS } from '../theme/theme'
import { useStore } from '../store/store'
import LottieView from 'lottie-react-native';

const Edition = () => {
  const [saleVisible, setSaleVisible] = useState(true)
  const [expenseVisible, setExpenseVisible] = useState(false)

  const SkewerSimpleList = useStore((state: any) => state.SkewerSimpleList); // Lista de espetinhos simples
  const SkewerCompleteList = useStore((state: any) => state.SkewerCompleteList); // Lista de espetinhos completos
  const HamburguerList = useStore((state: any) => state.HamburguerList); // Lista de hamburgueres
  const FoodList = useStore((state: any) => state.FoodList);  // Lista de Arrumadinhos
  const DrinksList = useStore((state: any) => state.DrinksList);  // Lista de bebidas
  const ListaVendas = useStore((state: any) => state.ListaVendas);  // Lista de vendas
  const ListaDespesas = useStore((state: any) => state.ListaDespesas);  // Lista de despesas

  // percorra a lista de vendas e veja se tem repetição, se tiver, coloque-o em uma nova lista e retorne-a
  function ListaVendasSemRepeticao() {
    let listaRepetida: any = []
    let listaUnica: any = []
    let listaFinal: any = []

    for (let i = 0; i < ListaVendas.length; i++) {
      if (ListaVendas[i].id === ListaVendas[i + 1].id) {
        listaRepetida.push(ListaVendas[i])
      } else {
        listaUnica.push(ListaVendas[i])
      }
    }

    listaFinal = listaUnica.concat(listaRepetida)

    return listaFinal
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewTittle}>
        <Text style={styles.textTittle}>O que queres editar?</Text>
      </View>
      <View style={styles.choice}>

        {/* SALE */}
        <View style={styles.choiceSale}>
          <TouchableOpacity onPress={() => {
            setSaleVisible(true)
            setExpenseVisible(false)
          }}>
            <View style={[styles.viewSaleAndExpense, {
              borderBottomColor: saleVisible ? '#fff' : 'rgba(255, 255, 255, 0.15)',
            }]}>
              <Text style={styles.textSaleAndExpense}>Venda</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* EXPENSE */}
        <View style={styles.choiceExpense}>
          <TouchableOpacity onPress={() => {
            setExpenseVisible(true)
            setSaleVisible(false)
          }
          }>
            <View style={[styles.viewSaleAndExpense, {
              borderBottomColor: expenseVisible ? '#fff' : 'rgba(255, 255, 255, 0.15)',
            }]}>
              <Text style={styles.textSaleAndExpense}>Despesa</Text>
            </View>
          </TouchableOpacity>
          {expenseVisible && (
            <></>
          )}
        </View>
      </View>
      {saleVisible && ListaVendasSemRepeticao.length == 0 ? (
        <View style={styles.viewLottie}>
          <View style={styles.viewTextEmpty}>
            <Text style={styles.textEmpty}>Não há vendas</Text>
          </View>
          <LottieView
            source={require('../../img/LottieSaleEmpty.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <></>
      )
      }
      {expenseVisible && ListaDespesas.length == 0 ? (
        <View style={styles.viewLottie}>
          <View style={styles.viewTextEmpty}>
            <Text style={styles.textEmpty}>Não há despesas</Text>
          </View>
          <LottieView
            source={require('../../img/LottieExpenseEmpty.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <></>
      )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.orange,
    top: '4%',
  },
  viewTittle: {
    alignItems: 'center',
    top: '1%',
  },
  textTittle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  viewImg: {
    alignItems: 'center',
    height: '50%',
    width: '100%',
    top: '10%',
    backgroundColor: '#fff',
  },
  img: {
    width: '70%',
    height: '70%',
  },
  choice: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: '8%',
    height: '7%',
  },
  choiceSale: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceExpense: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewSaleAndExpense: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
    borderBottomWidth: 4,
  },
  textSaleAndExpense: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  viewLottie: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '10%',
    // backgroundColor: COLORS.gray,
    width: '100%',
    height: '70%',
  },
  viewTextEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '40%',
  },
  textEmpty: {
    fontSize: 18,
    justifyContent: 'center',
    top: '10%',
    fontFamily: 'Inter-Semibold',
    color: '#fff',
  },
})

export default Edition