import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, ToastAndroid, Image, TouchableOpacity } from 'react-native'
import HeaderBar from '../components/HeaderBar'
import CardItem from '../components/CardItem'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../theme/theme'
import { useStore } from '../store/store'
import ModalPrices from '../components/ModalPrices'

const Venda = ({navigation}: any) => {
  const [mostrarBag, setMostrarBag] = useState(false); // Mostrar a sacola de compras
  const [mostrarModal, setMostrarModal] = useState(false); // Mostrar o modal de preços do Cart

  const SkewerSimpleList = useStore((state: any) => state.SkewerSimpleList); // Lista de espetinhos simples
  const SkewerCompleteList = useStore((state: any) => state.SkewerCompleteList); // Lista de espetinhos completos
  const HamburguerList = useStore((state: any) => state.HamburguerList); // Lista de hamburgueres
  const FoodList = useStore((state: any) => state.FoodList);  // Lista de Arrumadinhos
  const DrinksList = useStore((state: any) => state.DrinksList);  // Lista de bebidas
  const addToCart = useStore((state: any) => state.addToCart);  // Adiciona ao carrinho
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);  // Calcula o preço do carrinho
  const CartPrice = useStore((state: any) => state.CartPrice);  // Preço do carrinho
  const CartList = useStore((state: any) => state.CartList);  // Lista do carrinho
  const cleanCartList = useStore((state: any) => state.cleanCartList);  // Limpa o carrinho
  const removeFromCart = useStore((state: any) => state.removeFromCart);  // Remove do carrinho
  const ListaVendas = useStore((state: any) => state.ListaVendas);  // Lista de vendas
  const addToVendas = useStore((state: any) => state.addToVendas);  // Adiciona a lista de vendas
  const cleanListaVendas = useStore((state: any) => state.cleanListaVendas);  // Limpa a lista de vendas


  const avaliableKey = (amount: string) => {
    if (amount === '1') {
      navigation.push('Informations');
    }
  }

  const toggleBag = () => { // Mostra a sacola de compras
    setMostrarBag(!mostrarBag);
  };

  const FoodCardAddToCart = ({
    id,
    name,
    price,
    type,
    index,
  }: any) => {
    addToCart({
      id,
      name,
      price,
      type,
      index,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(`${name} adicionado ao carrinho`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar style="light" backgroundColor={COLORS.orange} />
      <View style={styles.headerBar}>
        <HeaderBar avaliableKey={avaliableKey}/>
      </View>
      <View style={styles.title}>
        <Text style={styles.text}>Venda</Text>
      </View>
      <View style={styles.cartItem}>
        <CardItem
          buttonToggleBag={toggleBag}
          buttonPressHandler={FoodCardAddToCart}
          SkewerSimpleList={SkewerSimpleList}
          SkewerCompleteList={SkewerCompleteList}
          HamburguerList={HamburguerList}
          FoodList={FoodList}
          DrinksList={DrinksList}
        />
      </View>
      {CartPrice > 0 && ( // Mostra a sacola de compras se o preço for maior que 0
        <View style={styles.cart}>
          <View style={styles.notification}>
            <Text style={styles.textNotification}>{CartList.length}</Text>
          </View>
          <TouchableOpacity onPress={() => setMostrarModal(true)} style={styles.buttonPressCart}>
            <Image source={require('../../img/bag.png')} style={styles.imgBag} />
          </TouchableOpacity>
        </View>
      )}
      {mostrarModal && (  // Mostra o modal de preços do Cart se mostrarModal for true
        <ModalPrices
          buttonPressHandler={() => {
            setMostrarModal(false);
          }}
          price={CartPrice}
          CartList={CartList}
          cleanCartList={cleanCartList}
          removeFromCart={removeFromCart}
          ListaVendas={ListaVendas}
          addToVendas={addToVendas}
          cleanListaVendas={cleanListaVendas}
        />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C2C2C2',
  },
  headerBar: {
    height: '9.61%',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '6%',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  cartItem: {
    height: 700,
    justifyContent: 'space-between',
    paddingTop: '5%',
    marginBottom: '60%',
    paddingBottom: '52%', 
  },
  cart: {
    position: 'absolute',
    backgroundColor: COLORS.orange,
    borderRadius: 100,
    height: '6%',
    width: '16%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '11.8%',
    left: '74%',
  },
  buttonPressCart: {
    borderRadius: 100,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBag: {
    width: 40,
    height: 40,
  },
  notification: {
    position: 'absolute',
    backgroundColor: 'blue',
    borderRadius: 100,
    height: '40%',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '60%',
    left: '60%', 
  },
  textNotification: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default Venda