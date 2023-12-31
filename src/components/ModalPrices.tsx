import React, { useState, useEffect } from 'react'
import { BlurView } from 'expo-blur'
import {
    StyleSheet, Text, View,
    Modal, TouchableOpacity, ScrollView,
    Pressable, ToastAndroid
} from 'react-native'
import { COLORS } from '../theme/theme';
import { Octicons } from '@expo/vector-icons';
import { collection, addDoc, app, db, getDocs, doc, setDoc } from '../../Firebase/firebaseConfig';

interface ModalPricesProps {
    buttonPressHandler: any;
    price: string;
    CartList: any[];
    cleanCartList: any;
    removeFromCart: any;
}

const ModalPrices: React.FC<ModalPricesProps> = ({
    buttonPressHandler,
    price,
    CartList,
    cleanCartList,
    removeFromCart,
}) => {

    // const [id, setId] = useState('');
    // const [product, setProduct] = useState('');
    // const [value, setValue] = useState(0.00);
    // const [type, setType] = useState('');


    // useEffect(() => {
    //     Call handleItemState when CartList changes
    //     for (let i = 0; i < CartList.length; i++) {
    //         handleItemState(CartList[i]);
    //     }
    //     if (CartList.length > 0) {
    //         const item = CartList[0]; // Assuming you want to handle the first item
    //         handleItemState(item);
    //     }
    // }, [CartList]);

    // const handleItemState = (item) => {
    //     setId(item.id);
    //     setProduct(item.name);
    //     setValue(parseFloat(item.ItemPrice.replace("R$ ", "").replace(",", ".")));
    //     setType(item.type);
    // };
    const nomesDosMeses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const getNextVendaNumber = async () => {
        const vendasCollection = collection(db, "bdHildaFinance");
        const vendasSnapshot = await getDocs(vendasCollection);
        const vendaNumber = vendasSnapshot.size + 1; // Próximo número de venda
        return vendaNumber;
    }

    const addItemBD = async () => {
        try {
            if (CartList.length === 0) {
                buttonPressHandler();
                return; // Se não houver itens na lista, não faz nada
            }
            for (let i = 0; i < CartList.length; i++) {
                const item = CartList[i];
                const vendaNumber = await getNextVendaNumber();
                const vendaDocumentName = `venda${vendaNumber}`;
                const vendaDocRef = doc(collection(db, "bdHildaFinance"), vendaDocumentName);
                const dataAtual = new Date();

                await setDoc(vendaDocRef, {
                    id: item.id,
                    product: item.name,
                    value: parseFloat(item.ItemPrice.replace("R$ ", "").replace(",", ".")),
                    type: item.type,
                    month: nomesDosMeses[new Date().getMonth()],
                    date: `${dataAtual.toLocaleDateString("pt-BR")} ${dataAtual.toLocaleTimeString("pt-BR")}`
                });
                console.log("Document written with ID: ", vendaDocumentName);
                ToastAndroid.showWithGravity(`${item.name} gravado.`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
            cleanCartList();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return (
        <>
            <Modal
                visible={true}
                animationType="slide"
                transparent={true}
                presentationStyle='overFullScreen'
                
            >
                <BlurView onTouchStart={buttonPressHandler} style={StyleSheet.absoluteFill} intensity={36} tint="dark" />
                <TouchableOpacity onPress={buttonPressHandler} style={{ flex:1 }} />
                {/* Fechar o Modal */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.scrollView, { top: (CartList.length === 0 ? '30%' : '17%') }]}
                >
                    <View style={styles.modal}>
                        {CartList.map((item, index) => {
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
                                    <View style={styles.viewName}>
                                        <Text style={styles.text}>{`${item.name}`}</Text>
                                    </View>
                                    <Text style={styles.text}>{`R$ ${item.ItemPrice}`}</Text>
                                </View>
                            )
                        })}
                        <View style={styles.viewTotal}>
                            <Text style={styles.textTotal}>TOTAL</Text>
                            <Text style={styles.textTotal}>R$ {price}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={addItemBD}
                            style={styles.button}
                        >
                            <Text style={styles.textButton}>Concluir</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        // bottom: '100%',
        // height: '100%',
        // top: '57%',
        // marginBottom: '20%',
        // backgroundColor: 'rgba(0,0,0,0.5)',
        // marginBottom: '9%',
        bottom: '100%',
    },
    modal: {
        backgroundColor: 'white',
        padding: '4%',
        borderRadius: 8,
        marginTop: '9%',
        // height: '500%',
        paddingBottom: '40%',
    },
    button: {
        backgroundColor: COLORS.orange,
        padding: '4%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // width: '100%',
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
        padding: 8,
    },
    textTotal: {
        fontSize: 24,
        color: 'black',
        fontFamily: 'Inter-Semibold',
    },
    viewName: {
        flex: 1,
        left: '76%',
        alignItems: 'flex-start'
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