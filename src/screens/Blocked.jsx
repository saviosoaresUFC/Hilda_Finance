import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { COLORS } from '../theme/theme'
import { useStore } from '../store/store'
import { Octicons } from '@expo/vector-icons'
import ModalConfirm from '../components/ModalConfirm'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const Blocked = () => {
  const ListaVendas = useStore(state => state.ListaVendas)
  const ListaDespesas = useStore(state => state.ListaDespesas)
  const removeFromVendas = useStore(state => state.removeFromVendas)
  const removeFromDespesas = useStore(state => state.removeFromDespesas)
  const cleanListaVendas = useStore((state) => state.cleanListaVendas)
  const cleanListaDespesas = useStore((state) => state.cleanListaDespesas)

  const [modal, setModal] = useState(false)

  let newListaVendas = []
  function countItensRepetidos() {
    ListaVendas.forEach((item) => {
      const index = newListaVendas.findIndex((itemAux) => itemAux.id === item.id);
      if (index === -1) {
        newListaVendas.push({ id: item.id, product: item.product, value: item.value, date: item.date, quantity: 1 });
      } else {
        newListaVendas[index].quantity += 1;
      }
    });
    return newListaVendas;
  }
  countItensRepetidos()

  return (
    <>
      <View style={styles.body}>
        <View style={styles.container}>
          <ScrollView style={[styles.scrollView, { width: '120%' }]} >
            <View>
              <Text style={styles.tittle}>Vendas</Text>
              {newListaVendas.map((item, index) => {
                return (
                  <View key={index} style={styles.itens}>
                    <TouchableOpacity
                      style={styles.buttonRemove}
                      onPress={() => removeFromVendas(item)}
                    >
                      <Octicons name="trash" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.viewQuantity}>
                      <Text style={styles.text}>{`${item.quantity}x`}</Text>
                    </View>
                    <View style={styles.viewName}>
                      <Text style={styles.text}>{`${item.product}`}</Text>
                    </View>
                    <View style={styles.viewValue}>
                      <Text style={styles.text}>{`R$ ${item.value * item.quantity}`}</Text>
                    </View>
                    <View style={styles.viewDate}>
                      <Text style={styles.text}>{`${item.date}`}</Text>
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
        <View style={[styles.container, { width: '50%', marginLeft: '8%' }]}>
          <Text style={styles.tittle}>Despesas</Text>
          <ScrollView style={[styles.scrollView, { backgroundColor: COLORS.grayescuro }]}>
            {ListaDespesas.map((item, index) => {
              return (
                <View key={index} style={styles.itens}>
                  <TouchableOpacity
                    style={styles.buttonRemove}
                    onPress={() => removeFromDespesas(item)}
                  >
                    <Octicons name="trash" size={24} color="black" />
                  </TouchableOpacity>
                  <View style={[styles.viewValue, {width: '30%'}]}>
                    <Text style={styles.text}>{`R$ ${item.value}`}</Text>
                  </View>
                  <View style={[styles.viewDate, { width: '50%' }]}>
                    <Text style={styles.text}>{`${item.date}`}</Text>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.buttonClean}
          onPress={() => {
            setModal(!modal)
          }}>
          <MaterialCommunityIcons name="broom" size={24} color="black" />
          <MaterialCommunityIcons name="alert" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {modal ? (
        <ModalConfirm modal={modal} setModal={setModal}
          cleanListaVendas={cleanListaVendas}
          cleanListaDespesas={cleanListaDespesas}
          text={"Voce deseja apagar todos os dados do ANO?"}
          apagar={true}
        />
      ) : null
      }
    </>
  )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: COLORS.grayescuro,
    width: '50%',
    height: '100%',
  },
  tittle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Inter-Semibold',
    padding: 10,
  },
  scrollView: {
    width: '84%',
    backgroundColor: COLORS.gray,
  },
  itens: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4%',
  },
  text: {
    fontSize: 10,
    fontFamily: 'Inter-Semibold',
  },
  buttonRemove: {
    backgroundColor: COLORS.orange,
    opacity: 0.7,
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
    paddingTop: '1.5%',
    paddingBottom: '1%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '4%',
  },
  viewDate: {
    width: '30%',
    alignItems: 'flex-end',
    borderLeftColor: COLORS.orange,
    borderLeftWidth: 1,
  },
  viewName: {
    width: '30%',
    alignItems: 'flex-start',
    borderRightColor: COLORS.orange,
    borderRightWidth: 1,
  },
  viewQuantity: {
    width: '8%',
    alignItems: 'flex-start',
  },
  viewValue: {
    width: '16%',
    alignItems: 'center',
  },

  body: {
    top: '8%',
    height: '80%',
    flexDirection: 'row',
    marginBottom: '10%',
  },

  viewButton: {
    width: '100%',
    height: '6%',
    alignItems: 'center',
  },
  buttonClean: {
    flexDirection: 'row',
    width: '90%',
    height: '100%',
    backgroundColor: '#ff0000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 16,
    fontFamily: 'Inter-Black',
  },
})

export default Blocked