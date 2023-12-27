import React, { useState } from 'react'
import {
    StyleSheet, Text, View,
    Image, TouchableOpacity, ToastAndroid,
    FlatList
} from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { COLORS, ICONS } from '../theme/theme';

interface CardItemProps {
    buttonToggleBag: any;
    buttonPressHandler: any;
    SkewerSimpleList: any;
    SkewerCompleteList: any;
    HamburguerList: any;
    FoodList: any;
    DrinksList: any;
}

const CardItem: React.FC<CardItemProps> = ({
    buttonToggleBag,
    buttonPressHandler,
    SkewerSimpleList,
    SkewerCompleteList,
    HamburguerList,
    FoodList,
    DrinksList,
}) => {
    const [mostrarIconesSKWS, setMostrarIconesSKWS] = useState(false);
    const [mostrarIconesSKWC, setMostrarIconesSKWC] = useState(false);
    const [mostrarIconesHamburguer, setMostrarIconesHamburguer] = useState(false);
    const [mostrarIconesFood, setMostrarIconesFood] = useState(false);
    const [mostrarIconesDrink, setMostrarIconesDrink] = useState(false);

    const toggleIconesSKWS = () => {
        setMostrarIconesSKWS(!mostrarIconesSKWS);
    };
    const toggleIconesSKWC = () => {
        setMostrarIconesSKWC(!mostrarIconesSKWC);
    };
    const toggleIconesHamburguer = () => {
        setMostrarIconesHamburguer(!mostrarIconesHamburguer);
    };
    const toggleIconesFood = () => {
        setMostrarIconesFood(!mostrarIconesFood);
    };
    const toggleIconesDrink = () => {
        setMostrarIconesDrink(!mostrarIconesDrink);
    };



    return (
        <View style={styles.container}>
            <View style={styles.contentType}>
                <TouchableOpacity onPress={toggleIconesSKWS} style={styles.buttonPress}>
                    <Image source={ICONS.skewer_simple} style={styles.img} />
                    <View style={styles.viewTextTitle}>
                        <Text style={styles.textTitle}>Espeto Simples</Text>
                    </View>
                    <Entypo name="chevron-thin-down" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            {mostrarIconesSKWS ? (
                SkewerSimpleList.map((item) => (
                    <View key={item.id} style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.buttonPressAdd}
                            onPress={() => {
                                buttonPressHandler(item);
                                // console.log(item);
                                buttonToggleBag();
                            }}
                        >
                            <Ionicons name="add-circle-outline" size={24} color={COLORS.grayescuro} />
                            <Text style={styles.textNameSubTitle}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : <></>}

            <View style={styles.contentType}>
                <TouchableOpacity onPress={toggleIconesSKWC} style={styles.buttonPress}>
                    <Image source={ICONS.skewer} style={styles.img} />
                    <View style={styles.viewTextTitle}>
                        <Text style={styles.textTitle}>Espeto Completo</Text>
                    </View>
                    <Entypo name="chevron-thin-down" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            {mostrarIconesSKWC ? (
                SkewerCompleteList.map((item) => (
                    <View key={item.id} style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.buttonPressAdd}
                            onPress={() => {
                                buttonPressHandler(item)
                                buttonToggleBag();
                            }}
                        >
                            <Ionicons name="add-circle-outline" size={24} color={COLORS.grayescuro} />
                            <Text style={styles.textNameSubTitle}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : <></>}
            <View style={styles.contentType}>
                <TouchableOpacity onPress={toggleIconesHamburguer} style={styles.buttonPress}>
                    <Image source={ICONS.hamburguer} style={styles.img} />
                    <View style={styles.viewTextTitle}>
                        <Text style={styles.textTitle}>Hamburguer</Text>
                    </View>
                    <Entypo name="chevron-thin-down" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            {mostrarIconesHamburguer ? (
                HamburguerList.map((item) => (
                    <View key={item.id} style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.buttonPressAdd}
                            onPress={() => {
                                buttonPressHandler(item)
                                buttonToggleBag();
                            }}
                        >
                            <Ionicons name="add-circle-outline" size={24} color={COLORS.grayescuro} />
                            <Text style={styles.textNameSubTitle}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : <></>}
            <View style={styles.contentType}>
                <TouchableOpacity onPress={toggleIconesFood} style={styles.buttonPress}>
                    <Image source={ICONS.food} style={styles.img} />
                    <View style={styles.viewTextTitle}>
                        <Text style={styles.textTitle}>Arrumadinho</Text>
                    </View>
                    <Entypo name="chevron-thin-down" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            {mostrarIconesFood ? (
                FoodList.map((item) => (
                    <View key={item.id} style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.buttonPressAdd}
                            onPress={() => {
                                buttonPressHandler(item)
                                buttonToggleBag();
                            }}
                        >
                            <Ionicons name="add-circle-outline" size={24} color={COLORS.grayescuro} />
                            <Text style={styles.textNameSubTitle}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : <></>}
            <View style={styles.contentType}>
                <TouchableOpacity onPress={toggleIconesDrink} style={styles.buttonPress}>
                    <Image source={ICONS.drink} style={styles.img} />
                    <View style={styles.viewTextTitle}>
                        <Text style={styles.textTitle}>Bebidas</Text>
                    </View>
                    <Entypo name="chevron-thin-down" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
            </View>
            {mostrarIconesDrink ? (
                DrinksList.map((item) => (
                    <View key={item.id} style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.buttonPressAdd}
                            onPress={() => {
                                buttonPressHandler(item)
                                buttonToggleBag();
                            }}
                        >
                            <Ionicons name="add-circle-outline" size={24} color={COLORS.grayescuro} />
                            <Text style={styles.textNameSubTitle}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : <></>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        // paddingBottom: '%',
    },
    contentType: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '14%',
        width: '109.5%',
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
    modalContent: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2.5%',
        marginTop: -12,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        width: '82%',
    },
    buttonPressAdd: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        paddingLeft: '24%',
    },
    textNameSubTitle: {
        color: COLORS.grayescuro,
        fontSize: 16,
        marginLeft: '5%',
        fontFamily: 'Inter-Semibold',
        paddingBottom: '5%',
    },
    viewTextTitle: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    textTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Semibold',
        left: '16%'
    },
})

export default CardItem