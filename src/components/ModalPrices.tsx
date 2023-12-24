import { BlurView } from 'expo-blur'
import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import { COLORS } from '../theme/theme';
import { Octicons } from '@expo/vector-icons';

interface ModalPricesProps {
    buttonPressHandler: any;
    price: string;
    CartList: any[];
}

const ModalPrices: React.FC<ModalPricesProps> = ({ buttonPressHandler, price, CartList }) => {
    return (
        <View>
            <Modal
                visible={true}
                animationType="slide"
                transparent={true}
                presentationStyle='overFullScreen'
            >
                {/* <Pressable onPress={() => { buttonPressHandler() }} > */}
                <BlurView style={StyleSheet.absoluteFill} intensity={36} tint="dark" />
                <Pressable
                    onPress={() => { buttonPressHandler() }}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
                        {/* Mapeia sobre o array e renderiza cada elemento */}
                        {CartList.map((item, index) => (
                            <View key={index} style={styles.itens}>
                                <Text style={{fontSize: 16 }}>{`${item.name}`}</Text>
                                <Text style={{fontSize: 16 }}>{`R$ ${item.ItemPrice}`}</Text>
                            </View>
                        ))}
                        <Text style={styles.text}>{price}</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>Concluir</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
                {/* </Pressable> */}
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    textButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
})

export default ModalPrices