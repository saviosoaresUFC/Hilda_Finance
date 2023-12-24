import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, ToastAndroid, Image, TouchableOpacity } from 'react-native'
import HeaderBar from '../components/HeaderBar'
import CardItem from '../components/CardItem'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../theme/theme'
import { useStore } from '../store/store'
import ModalPrices from '../components/ModalPrices'

const Venda = () => {

  const [mostrarBag, setMostrarBag] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const SkewerSimpleList = useStore((state: any) => state.SkewerSimpleList);
  const SkewerCompleteList = useStore((state: any) => state.SkewerCompleteList);
  const HamburguerList = useStore((state: any) => state.HamburguerList);
  const FoodList = useStore((state: any) => state.FoodList);
  const DrinksList = useStore((state: any) => state.DrinksList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const CartList = useStore((state: any) => state.CartList);
  const cleanCartList = useStore((state: any) => state.cleanCartList);

  const toggleBag = () => {
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
    console.log(name, ' -> ', price);
    console.log('Cart -> ', CartPrice);
    // console.log('CartList -> ', CartList);
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar style="light" backgroundColor={COLORS.orange} />
      <View style={styles.headerBar}>
        <HeaderBar />
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
      {mostrarBag && (
        <View style={styles.cart}>
          <TouchableOpacity onPress={() => setMostrarModal(true)} style={styles.buttonPressCart}>
            <Image source={require('../../img/bag.png')} style={styles.imgBag} />
          </TouchableOpacity>
        </View>
      )}
      {mostrarModal && (
        <View style={styles.modal}>
          <ModalPrices
            buttonPressHandler={() => {
              setMostrarModal(false);
            }}
            price={CartPrice}
            CartList={CartList}
          />
        </View>
      )}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C2C2C2',
    // flex: 1,
    // marginBottom: 100,
  },
  headerBar: {
    height: '10%',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '6%',
    // backgroundColor: '#FFF',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  cartItem: {
    height: 700,
    justifyContent: 'space-between',
    paddingTop: '5%',
    marginBottom: '40%',
  },
  cart: {
    position: 'absolute',
    backgroundColor: COLORS.orange,
    borderRadius: 100,
    height: '7%',
    width: '18%',
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Venda