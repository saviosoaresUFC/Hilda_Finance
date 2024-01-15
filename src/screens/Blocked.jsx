import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { COLORS } from '../theme/theme'
import { useStore } from '../store/store'
import { Octicons } from '@expo/vector-icons'

const Blocked = () => {
  const ListaVendas = useStore(state => state.ListaVendas)
  const ListaDespesas = useStore(state => state.ListaDespesas)
  const removeFromVendas = useStore(state => state.removeFromVendas)
  const removeFromDespesas = useStore(state => state.removeFromDespesas)
  // console.log(ListaDespesas)

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <ScrollView style={[styles.scrollView, {width: '120%'}]} >
          <View>
            <Text style={styles.tittle}>Vendas</Text>
            {ListaVendas.map((item, index) => {
              return (
                <View key={index} style={styles.itens}>
                  <TouchableOpacity
                    style={styles.buttonRemove}
                  onPress={() => removeFromVendas(item)}
                  >
                    <Octicons name="trash" size={24} color="black" />
                  </TouchableOpacity>
                  <View style={styles.viewName}>
                    <Text style={styles.text}>{`${item.product}`}</Text>
                  </View>
                  <View style={styles.viewValue}>
                    <Text style={styles.text}>{`R$ ${item.value}`}</Text>
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
      <View style={[styles.container, {width: '50%', marginLeft: '8%'}]}>
        <ScrollView style={[styles.scrollView, { backgroundColor: COLORS.grayescuro }]}>
          <View>
            <Text style={styles.tittle}>Despesas</Text>
            {ListaDespesas.map((item, index) => {
              return (
                <View key={index} style={styles.itens}>
                  <TouchableOpacity
                    style={styles.buttonRemove}
                  onPress={() => removeFromDespesas(item)}
                  >
                    <Octicons name="trash" size={24} color="black" />
                  </TouchableOpacity>
                  <View style={styles.viewValue}>
                    <Text style={styles.text}>{`R$ ${item.value}`}</Text>
                  </View>
                  <View style={[styles.viewDate, { width: '54%' }]}>
                    <Text style={styles.text}>{`${item.date}`}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    top: '8%',
    flexDirection: 'row',
    marginBottom: '8%',

  },
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
    width: '40%',
    alignItems: 'flex-end',
  },
  viewName: {
    width: '30%',
    alignItems: 'flex-start',
  },

})

export default Blocked