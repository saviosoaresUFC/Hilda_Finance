import React, { useState, useRef } from 'react'
import {
    StyleSheet, Text, View,
    Image, TouchableOpacity, ToastAndroid,
    FlatList
} from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { COLORS, ICONS } from '../theme/theme';
import { useStore } from '../store/store';

const CardItem = () => {
    const [mostrarIcones, setMostrarIcones] = useState(false);
    const ListRef: any = useRef<FlatList>();

    const toggleIcones = () => {
        setMostrarIcones(!mostrarIcones);
    };

    const SkewerSimpleList = useStore((state: any) => state.SkewerSimpleList);
    const SkewerCompleteList = useStore((state: any) => state.SkewerCompleteList);
    const HamburguerList = useStore((state: any) => state.HamburguerList);
    const FoodList = useStore((state: any) => state.FoodList);
    const DrinksList = useStore((state: any) => state.DrinkList);
    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

    const FoodCardAddToCart = ({
        id,
        index,
        name,
        prices,
        type,
    }: any) => {
        addToCart({
            id,
            index,
            name,
            prices,
            type,
        });
        calculateCartPrice();
        ToastAndroid.showWithGravity(`${name} adicionado ao carrinho`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentType}>
                <TouchableOpacity onPress={toggleIcones} style={styles.buttonPress}>
                    <Image source={ICONS.skewer_simple} style={styles.img} />
                    <Text>Espeto Simples</Text>
                    <Entypo name="chevron-thin-down" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            {SkewerSimpleList.map((item) => (
                <View key={item.id} style={styles.modalContent}>
                    <TouchableOpacity
                        style={styles.buttonPressAdd}
                        onPress={() => FoodCardAddToCart(item)}
                    >
                        <Ionicons name="add-circle-outline" size={24} color="black" />
                        <Text style={styles.textNameSkewer}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <View style={styles.contentType}>
                <TouchableOpacity onPress={toggleIcones} style={styles.buttonPress}>
                    <Image source={ICONS.skewer} style={styles.img} />
                    <Text>Espeto Completo</Text>
                    <Entypo name="chevron-thin-down" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.contentType}>
                <TouchableOpacity onPress={toggleIcones} style={styles.buttonPress}>
                    <Image source={ICONS.hamburguer} style={styles.img} />
                    <Text>Hamburguer       </Text>
                    <Entypo name="chevron-thin-down" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.contentType}>
                <TouchableOpacity onPress={toggleIcones} style={styles.buttonPress}>
                    <Image source={ICONS.food} style={styles.img} />
                    <Text>Arrumadinho       </Text>
                    <Entypo name="chevron-thin-down" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.contentType}>
                <TouchableOpacity onPress={toggleIcones} style={styles.buttonPress}>
                    <Image source={ICONS.drink} style={styles.img} />
                    <Text>Bebidas               </Text>
                    <Entypo name="chevron-thin-down" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            {mostrarIcones ? (
                <View style={styles.cart}>
                    <TouchableOpacity style={styles.buttonPressCart}>
                        <Image source={ICONS.bag} style={styles.imgBag} />
                    </TouchableOpacity>
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
        position: 'relative',
        alignItems: 'center',
        paddingBottom: '30%',
        backgroundColor: 'blue',
    },
    contentType: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '14%',
    },
    buttonPress: {
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: '90%',
        width: '75%',
    },
    img: {
        width: 40,
        height: 40,
        marginLeft: '6%',
    },
    icon: {
        marginRight: '6%',
    },
    cart: {
        position: 'absolute',
        backgroundColor: COLORS.orange,
        borderRadius: 100,
        height: '8%',
        width: '12%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '6%',
        marginBottom: '6%',
        left: '75%',
        bottom: '118%',
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
    modalContent: {
        backgroundColor: '#fff',
        width: '87%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2%',
        marginTop: -10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    buttonPressAdd: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        paddingLeft: '22%',
    },
    textNameSkewer: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: '3%',
    },
})

export default CardItem