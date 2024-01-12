import React from 'react'
import { StyleSheet, View } from 'react-native'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { useStore } from '../store/store'
import Meses from './Meses'
import { LinearGradient, Stop, Defs } from 'react-native-svg'

const GraficLM = () => {
    const ListaVendas = useStore((state) => state.ListaVendas)
    const ListaDespesas = useStore((state) => state.ListaDespesas)

    const dataLM = [calcularLV("Janeiro"), calcularLV("Fevereiro"), calcularLV("Março"),
    calcularLV("Abril"), calcularLV("Maio"), calcularLV("Junho"),
    calcularLV("Julho"), calcularLV("Agosto"), calcularLV("Setembro"),
    calcularLV("Outubro"), calcularLV("Novembro"), calcularLV("Dezembro")
    ]
    const Labels = ({ x, y, bandwidth, data }) => (
        data.map((value, index) => {
            const roundedValue = Number.isInteger(value) ? value : value.toFixed(2);
            const yPos = value < 20 ? y(value) - 10 : y(value) + 15;
            console.log(value)
            return (
                <Text
                    key={index}
                    x={x(index) + (bandwidth / 2)}
                    y={yPos}
                    fontSize={14}
                    fill={value >= 20 ? 'white' : 'black'}
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
                style={{ height: '50%', width: '100%' }}
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
                <Gradient/>
                <Labels />
            </BarChart>
            <Meses />
        </View>
    )
}

const styles = StyleSheet.create({
    graficLucroMensal: {
        alignItems: 'center',
        marginBottom: '50%',
        height: '60%',
        width: '100%',
    },
})

export default GraficLM