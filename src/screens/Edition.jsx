import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { FontAwesome, Fontisto } from '@expo/vector-icons'
import { COLORS, ICONS } from '../theme/theme'
import { useStore } from '../store/store'
import LottieView from 'lottie-react-native';
import { Octicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur'

const Edition = () => {
  const [saleVisible, setSaleVisible] = useState(true)
  const [expenseVisible, setExpenseVisible] = useState(false)
  const [animation, setAnimation] = useState(false)

  const ListaVendas = useStore(state => state.ListaVendas);  // Lista de vendas
  const ListaDespesas = useStore(state => state.ListaDespesas);  // Lista de despesas
  const removeFromVendas = useStore(state => state.removeFromVendas);  // Função para remover item da lista de vendas
  let newListaVendas = []

  function countItensRepetidos() {
    ListaVendas.forEach((item) => {
      const index = newListaVendas.findIndex((itemAux) => itemAux.id === item.id);
      if (index === -1) {
        newListaVendas.push({
          id: item.id,
          img: item.img,
          product: item.product,
          value: item.value,
          date: item.date,
          quantity: 1
        });
      } else {
        newListaVendas[index].quantity += 1;
      }
    });
    return newListaVendas;
  }

  countItensRepetidos();

  useEffect(() => {
    if (animation) {
      const timeoutId = setTimeout(() => {
        setAnimation(false);
      }, 2600);

      // Clear the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [animation]);

  return (
    <View style={styles.container}>
      <View style={styles.viewTittle}>
        <Text style={styles.textTittle}>O que queres editar?</Text>
      </View>
      <View style={styles.choice}>

        {/* SALE HEADER */}
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

        {/* EXPENSE HEADER */}
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
        </View>
      </View>


      {/* SALE LIST */}
      {saleVisible && (
        // SALE LIST NOT EMPTY
        <View style={styles.viewSaleContainer}>
          {newListaVendas.map((item, index) => {
            return (
              <View key={index} style={styles.viewSaleCard}>
                <View style={styles.viewSaleButton}>
                  <TouchableOpacity
                    style={styles.buttonRemove}
                    onPress={() => {
                      setAnimation(true)
                      removeFromVendas(item)
                    }}
                  >
                    <Octicons name="trash" size={24} color={COLORS.orange} />
                  </TouchableOpacity>
                </View>
                <View style={styles.viewSaleText}>
                  <Text style={styles.textSaleName}>{`${item.product}`}</Text>
                  <Text>{`${item.quantity}`}</Text>
                </View>
              </View>
            )
          }
          )}
        </View>
      )}

      {/* EXPENSE LIST */}
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
        // EXPENSE LIST NOT EMPTY
        <></>
      )
      }

      {animation && (
        <View style={styles.lottie}>
          <BlurView intensity={5} tint="light" style={StyleSheet.absoluteFill} />
          <LottieView
            source={require('../../img/LottieTrash.json')}
            autoPlay
            loop={false}
          />
        </View>
      )}
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

  // SALE LIST
  viewSaleContainer: {
    alignItems: 'center',
    marginTop: '16%',
    // backgroundColor: COLORS.gray,
    width: '100%',
    height: '82%',
  },
  viewSaleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '6%',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: '2%',
  },
  viewSaleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: '100%',

  },
  buttonRemove: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  viewSaleText: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%',
    height: '100%',
    left: '15%',
  },
  textSaleName: {
    fontSize: 18,
    fontFamily: 'Inter-Semibold',
    color: COLORS.orange,
  },
  lottie: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
})

export default Edition