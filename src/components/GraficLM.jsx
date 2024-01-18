import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Modal } from 'react-native'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { useStore } from '../store/store'
import Meses from './Meses'
import { LinearGradient, Stop, Defs } from 'react-native-svg'
import { COLORS } from '../theme/theme'
import { AntDesign } from '@expo/vector-icons'
import ModalConfirm from './ModalConfirm'

const GraficLM = ({navigationEdition}) => {
    const ListaVendas = useStore((state) => state.ListaVendas)
    const ListaDespesas = useStore((state) => state.ListaDespesas)
    const [modal, setModal] = useState(false)

    const dataLM = [calcularLV("Janeiro"), calcularLV("Fevereiro"), calcularLV("Março"),
    calcularLV("Abril"), calcularLV("Maio"), calcularLV("Junho"),
    calcularLV("Julho"), calcularLV("Agosto"), calcularLV("Setembro"),
    calcularLV("Outubro"), calcularLV("Novembro"), calcularLV("Dezembro")
    ]
    const Labels = ({ x, y, bandwidth, data }) => (
        data.map((value, index) => {
            const roundedValue = Number.isInteger(value) ? value : value.toFixed(2);
            const yPos = value < 20 ? y(value) - 10 : y(value) + 15;
            // console.log(value)
            return (
                <Text
                    key={index}
                    x={x(index) + (bandwidth / 2)}
                    y={yPos}
                    fontSize={8}
                    fill={value >= 0 ? 'black' : 'red'}
                    alignmentBaseline={'middle'}
                    textAnchor={'middle'}
                >
                    {roundedValue}
                </Text>
            );
        })
    );

    function seeDataLMdasVendas(month) {
        return ListaVendas.reduce((total, item) => (item.month === month ? total + item.value : total), 0);
    }

    function seeDataLMdasDespesas(month) {
        return ListaDespesas.reduce((total, item) => (item.month === month ? total + item.value : total), 0);
    }

    function calcularLV(month) {
        return seeDataLMdasVendas(month) - seeDataLMdasDespesas(month)
    }

    const Gradient = () => (
        <Defs key={'gradient'}>
            <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'80%'}>
                <Stop offset={'10%'} stopColor={'#00D522'} />
                <Stop offset={'100%'} stopColor={'rgba(199, 255, 173, 0.56)'} />
            </LinearGradient>
        </Defs>
    )

    return (
        <View style={styles.graficLucroMensal}>
            <BarChart
                style={{ height: '30%', width: '100%' }}
                data={dataLM}
                svg={{
                    strokeWidth: 2,
                    fill: 'url(#gradient)',
                }}
                contentInset={{ top: 30, bottom: 30 }}
                spacing={0.2}
                gridMin={0}
            >
                <Grid />
                <Gradient />
                <Labels />
            </BarChart>
            <Meses />
            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.buttonEdition}
                    onPress={() => {
                        setModal(!modal)
                    }}>
                    <AntDesign name="edit" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {modal ? (
                <ModalConfirm modal={modal} setModal={setModal}
                    cleanListaVendas={() => ({})}
                    cleanListaDespesas={() => ({})}
                    text={"Voce deseja editar algum produto?"}
                    apagar={null}
                    navigation={navigationEdition}
                />
            ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    graficLucroMensal: {
        alignItems: 'center',
    },
    viewButton: {
        width: '100%',
        height: '6%',
        alignItems: 'center',
        marginBottom: '50%',

    },
    buttonEdition: {
        flexDirection: 'row',
        width: '90%',
        height: '100%',
        backgroundColor: COLORS.orange,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        // color: 'white',
        fontSize: 16,
        fontFamily: 'Inter-Black',
    },

})

export default GraficLM