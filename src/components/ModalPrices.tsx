import React, { useState, useEffect } from 'react'
import { BlurView } from 'expo-blur'
import {
    StyleSheet, Text, View,
    Modal, TouchableOpacity, ScrollView,
    Pressable, ToastAndroid, Image
} from 'react-native'
import { COLORS, ICONS } from '../theme/theme';
import { Octicons } from '@expo/vector-icons';
import { useStore } from '../store/store';
import ModalConfirm from './ModalConfirm';
import LottieView from 'lottie-react-native';

interface ModalPricesProps {
    buttonPressHandler: any;
    price: string;
    CartList: any[];
    cleanCartList: any;
    removeFromCart: any;
    ListaVendas: any[];
    addToVendas: any;
    cleanListaVendas: any;
}

const ModalPrices: React.FC<ModalPricesProps> = ({
    buttonPressHandler, // modal como falso
    price, // preço do Cart
    CartList, // Lista do Cart
    cleanCartList, // função que limpa o Cart
    removeFromCart, // função que remove do Cart
    ListaVendas, // Lista de vendas
    addToVendas, // função que adiciona a lista de vendas
    cleanListaVendas, // função que limpa a lista de vendas
}) => {
    const [modal, setModal] = useState(false);
    const nomesDosMeses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const addItemBD = () => {
        if (CartList.length === 0) {
            buttonPressHandler();
            return; // Se não houver itens na lista, não faz nada
        }
        CartList.forEach((item) => {
            const itemFinal = {
                date: `${new Date().toLocaleDateString("pt-BR")} ${new Date().toLocaleTimeString("pt-BR")}`,
                id: item.id,
                month: nomesDosMeses[new Date().getMonth()],
                product: item.name,
                type: item.type,
                value: parseFloat(item.ItemPrice.replace("R$ ", "").replace(",", ".")),
            };
            addToVendas(itemFinal);
            notification(`${item.name} gravado.`);
        });
        cleanCartList();
        console.log("ListaVendas: ", ListaVendas);
    }

    useEffect(() => { }, [ListaVendas]);

    const notification = (message: string) => {
        ToastAndroid.showWithGravity(message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    let newCartList = []
    function countItensRepetidos() {
        //vetor auxiliar para o CartList, percorra o CartList, se ele estiver repedito cadatra todo o item e a quantidade de vezes que ele aparece no vetor auxiliar
        CartList.forEach((item) => {
            const index = newCartList.findIndex((itemAux) => itemAux.id === item.id);
            if (index === -1) {
                newCartList.push({ id: item.id, name: item.name, ItemPrice: item.ItemPrice, type: item.type, quantity: 1 });
            } else {
                newCartList[index].quantity += 1;
            }
        });
        return newCartList;
    }
    countItensRepetidos();

    return (
        <>
            <Modal
                visible={true}
                animationType="slide"
                transparent={true}
                presentationStyle='overFullScreen'
            >
                <BlurView onTouchStart={buttonPressHandler} style={StyleSheet.absoluteFill} intensity={36} tint="dark" />
                <View style={styles.viewLottie}>
                    <LottieView
                        source={require('../../img/LottieSaleEmpty.json')}
                        autoPlay
                        loop
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </View>
                <TouchableOpacity onPress={buttonPressHandler} />
                {/* Fechar o Modal */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        marginTop:
                            (newCartList.length == 7 ? '15%' : (
                                (newCartList.length == 6 ? '28%' : (
                                    (newCartList.length == 5 ? '42%' : (
                                        (newCartList.length == 4 ? '54.8%' : (
                                            (newCartList.length == 3 ? '68%' : (
                                                newCartList.length == 2 ? '80%' : (
                                                    (newCartList.length == 1 ? '92.8%' : (
                                                        (newCartList.length == 0 ? '105.8%' : '24%')
                                                    ))
                                                ))
                                            ))
                                        ))
                                    )
                                ))
                            ))
                    }}
                >
                    <View style={styles.modal}>
                        {newCartList.map((item, index) => {
                            if (CartList.length === 0) {
                                buttonPressHandler()
                            }
                            return (
                                <View key={index} style={styles.itens}>
                                    <TouchableOpacity
                                        style={styles.buttonRemove}
                                        onPress={() => removeFromCart(item)}
                                    >
                                        <Octicons name="trash" size={24} color="black" />
                                    </TouchableOpacity>
                                    <View style={styles.viewQuantity}>
                                        <Text style={styles.text}>{`${item.quantity}x`}</Text>
                                    </View>
                                    <View style={styles.viewName}>
                                        <Text style={styles.text}>{`${item.name}`}</Text>
                                    </View>
                                    <Text style={styles.text}>{`R$ ${item.ItemPrice * item.quantity}`}</Text>
                                </View>
                            )
                        })}
                        <View style={styles.viewTotal}>
                            <Text style={styles.textTotal}>TOTAL</Text>
                            <Text style={styles.textTotal}>R$ {price}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={setModal.bind(this, true)}
                            style={styles.button}
                        >
                            <Text style={styles.textButton}>Concluir</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <ModalConfirm
                    modal={modal}
                    setModal={setModal}
                    cleanListaVendas={() => { }}
                    cleanListaDespesas={() => { }}
                    text={`Deseja gravar os dados? Total: R$ ${price}`}
                    apagar={false}
                    addItemBD={addItemBD}
                />
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    viewLottie: {
        // position: 'absolute',
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        top: '10%',
    },
    modal: {
        backgroundColor: 'white',
        padding: '4%',
        borderRadius: 8,
        // marginTop: '9%',
        // paddingBottom: '40%',
        // backgroundColor: 'blue',
    },
    button: {
        backgroundColor: COLORS.orange,
        padding: '4%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontFamily: 'Inter-Semibold',
    },
    textButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    itens: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.orange,
    },
    viewTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4%',
    },
    textTotal: {
        fontSize: 24,
        color: 'black',
        fontFamily: 'Inter-Semibold',
    },
    viewName: {
        flex: 1,
        left: '50%',
        alignItems: 'flex-start'
    },
    viewQuantity: {
        // flex: 1,
        left: '20%',
        alignItems: 'flex-start',
    },
    buttonRemove: {
        backgroundColor: COLORS.grayescuro,
        opacity: 0.5,
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        paddingTop: '1.5%',
        paddingBottom: '1%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ModalPrices