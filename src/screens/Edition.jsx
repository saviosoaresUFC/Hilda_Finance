import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { FontAwesome, Fontisto } from '@expo/vector-icons'
import { COLORS, ICONS } from '../theme/theme'
import { useStore } from '../store/store'
import LottieView from 'lottie-react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur'
import styles from './styles/EditionStyle'

const Edition = ({navigation}) => {
  const [saleVisible, setSaleVisible] = useState(true)
  const [expenseVisible, setExpenseVisible] = useState(false)
  const [animation, setAnimation] = useState(false)

  const ListaVendas = useStore(state => state.ListaVendas);  // Lista de vendas
  const ListaDespesas = useStore(state => state.ListaDespesas);  // Lista de despesas
  const removeFromVendas = useStore(state => state.removeFromVendas);  // Função para remover item da lista de vendas
  const removeFromDespesas = useStore(state => state.removeFromDespesas);  // Função para remover item da lista de despesas
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
      <View style={styles.viewHeader}>
        <TouchableOpacity style={styles.buttonBack}
        onPress={() => {
          navigation.pop()
        }}>
          <Ionicons name="chevron-back-outline" size={30} color="white" />
        </TouchableOpacity>
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
        newListaVendas.length == 0 ? (
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
                    <View style={styles.viewSaleTextName}>
                      <Text style={styles.textSaleName}>{`${item.product}`}</Text>
                    </View>
                    <View style={styles.viewSaleTextQnt}>
                      <Text style={styles.textSaleQnt}>{`${item.quantity}x`}</Text>
                    </View>
                  </View>
                </View>
              )
            }
            )}
          </View>
        )
      )}

      {expenseVisible && (
        ListaDespesas.length == 0 ? (
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
          <View style={styles.containerExpense}>
            <ScrollView style={styles.scrollViewExpense}>
              {ListaDespesas.slice().reverse().map((item, index) => {
                return (
                  <View key={index} style={styles.itensExpense}>
                    <TouchableOpacity
                      style={styles.buttonRemoveExpense}
                      onPress={() => {
                        setAnimation(true)
                        removeFromDespesas(item)
                      }}
                    >
                      <Octicons name="trash" size={26} color="white" />
                    </TouchableOpacity>
                    <View style={styles.viewExpenseValue}>
                      <Text style={styles.textExpenseValue}>{`R$ ${item.value}`}</Text>
                    </View>
                    <View style={[styles.viewExpenseMonth, { width: '50%' }]}>
                      <Text style={styles.textExpenseMonth}>{`${item.month}`}</Text>
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </View>
        )
      )}

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

export default Edition