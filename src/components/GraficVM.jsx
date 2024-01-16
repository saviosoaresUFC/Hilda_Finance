import React from 'react'
import { StyleSheet, View } from 'react-native'
import { COLORS } from '../theme/theme'
import { useStore } from '../store/store'
import { Text } from 'react-native-svg'
import { StackedBarChart, Grid, YAxis } from 'react-native-svg-charts'
import Meses from './Meses'
import Legends from './Legend'

const GraficVM = () => {
    const ListaVendas = useStore((state) => state.ListaVendas)
    const ListaDespesas = useStore((state) => state.ListaDespesas)
    const dataVM = [
        {
            monthSigla: 'Jan',
            month: 'Janeiro',
            SkewerSimple: seeDataVM('Janeiro', 'SkewerSimple'),
            SkewerComplete: seeDataVM('Janeiro', 'SkewerComplete'),
            Hamburguer: seeDataVM('Janeiro', 'Hamburguer'),
            Food: seeDataVM('Janeiro', 'Food'),
            Drink: seeDataVM('Janeiro', 'Drink')
        },
        {
            monthSigla: 'Fev',
            month: 'Fevereiro',
            SkewerSimple: seeDataVM('Fevereiro', 'SkewerSimple'),
            SkewerComplete: seeDataVM('Fevereiro', 'SkewerComplete'),
            Hamburguer: seeDataVM('Fevereiro', 'Hamburguer'),
            Food: seeDataVM('Fevereiro', 'Food'),
            Drink: seeDataVM('Fevereiro', 'Drink')
        },
        {
            monthSigla: 'Mar',
            month: 'Março',
            SkewerSimple: seeDataVM('Março', 'SkewerSimple'),
            SkewerComplete: seeDataVM('Março', 'SkewerComplete'),
            Hamburguer: seeDataVM('Março', 'Hamburguer'),
            Food: seeDataVM('Março', 'Food'),
            Drink: seeDataVM('Março', 'Drink')
        },
        {
            monthSigla: 'Abr',
            month: 'Abril',
            SkewerSimple: seeDataVM('Abril', 'SkewerSimple'),
            SkewerComplete: seeDataVM('Abril', 'SkewerComplete'),
            Hamburguer: seeDataVM('Abril', 'Hamburguer'),
            Food: seeDataVM('Abril', 'Food'),
            Drink: seeDataVM('Abril', 'Drink')
        },
        {
            monthSigla: 'Mai',
            month: 'Maio',
            SkewerSimple: seeDataVM('Maio', 'SkewerSimple'),
            SkewerComplete: seeDataVM('Maio', 'SkewerComplete'),
            Hamburguer: seeDataVM('Maio', 'Hamburguer'),
            Food: seeDataVM('Maio', 'Food'),
            Drink: seeDataVM('Maio', 'Drink')
        },
        {
            monthSigla: 'Jun',
            month: 'Junho',
            SkewerSimple: seeDataVM('Junho', 'SkewerSimple'),
            SkewerComplete: seeDataVM('Junho', 'SkewerComplete'),
            Hamburguer: seeDataVM('Junho', 'Hamburguer'),
            Food: seeDataVM('Junho', 'Food'),
            Drink: seeDataVM('Junho', 'Drink')
        },
        {
            monthSigla: 'Jul',
            month: 'Julho',
            SkewerSimple: seeDataVM('Julho', 'SkewerSimple'),
            SkewerComplete: seeDataVM('Julho', 'SkewerComplete'),
            Hamburguer: seeDataVM('Julho', 'Hamburguer'),
            Food: seeDataVM('Julho', 'Food'),
            Drink: seeDataVM('Julho', 'Drink')
        },
        {
            monthSigla: 'Ago',
            month: 'Agosto',
            SkewerSimple: seeDataVM('Agosto', 'SkewerSimple'),
            SkewerComplete: seeDataVM('Agosto', 'SkewerComplete'),
            Hamburguer: seeDataVM('Agosto', 'Hamburguer'),
            Food: seeDataVM('Agosto', 'Food'),
            Drink: seeDataVM('Agosto', 'Drink'),
        },
        {
            monthSigla: 'Set',
            month: 'Setembro',
            SkewerSimple: seeDataVM('Setembro', 'SkewerSimple'),
            SkewerComplete: seeDataVM('Setembro', 'SkewerComplete'),
            Hamburguer: seeDataVM('Setembro', 'Hamburguer'),
            Food: seeDataVM('Setembro', 'Food'),
            Drink: seeDataVM('Setembro', 'Drink'),
        },
        {
            monthSigla: 'Out',
            month: 'Outubro',
            SkewerSimple: seeDataVM('Outubro', 'SkewerSimple'),
            SkewerComplete: seeDataVM('Outubro', 'SkewerComplete'),
            Hamburguer: seeDataVM('Outubro', 'Hamburguer'),
            Food: seeDataVM('Outubro', 'Food'),
            Drink: seeDataVM('Outubro', 'Drink'),
        },
        {
            monthSigla: 'Nov',
            month: 'Novembro',
            SkewerSimple: seeDataVM('Novembro', 'SkewerSimple'),
            SkewerComplete: seeDataVM('Novembro', 'SkewerComplete'),
            Hamburguer: seeDataVM('Novembro', 'Hamburguer'),
            Food: seeDataVM('Novembro', 'Food'),
            Drink: seeDataVM('Novembro', 'Drink')
        },
        {
            monthSigla: 'Dez',
            month: 'Dezembro',
            SkewerSimple: seeDataVM('Dezembro', 'SkewerSimple'),
            SkewerComplete: seeDataVM('Dezembro', 'SkewerComplete'),
            Hamburguer: seeDataVM('Dezembro', 'Hamburguer'),
            Food: seeDataVM('Dezembro', 'Food'),
            Drink: seeDataVM('Dezembro', 'Drink')
        },
    ]

    function seeDataVM(month, type) {
        let total = 0
        ListaVendas.forEach((item) => {
            if (item.month === month && item.type === type) {
                total++;
            }
        })
        return total;
    }

    const colors = ['#ff0000', '#FF6B00', '#FFB800', '#2AD000', '#00AAD0']
    const keys = ['SkewerSimple', 'SkewerComplete', 'Hamburguer', 'Food', 'Drink']

    return (
        <>
            <View style={{ height: '100%' }}>
                <StackedBarChart
                    style={{ height: '100%', width: '100%' }}
                    keys={keys}
                    colors={colors}
                    data={dataVM}
                    showGrid={true}
                    contentInset={{ top: 0, bottom: 10 }}
                >
                    <Grid />
                </StackedBarChart>
                <YAxis
                    style={styles.yAxis}
                    data={dataVM.map((item) => item.SkewerSimple + item.SkewerComplete + item.Hamburguer + item.Food + item.Drink)}
                    contentInset={{ top: 4, bottom: 8 }}
                    svg={{
                        fontSize: 10,
                        fill: 'black',
                        stroke: 'black',
                        strokeWidth: 0.2,
                        alignmentBaseline: 'baseline',
                    }}
                />
                <View style={styles.footer}>
                    <Meses />
                    <Legends />
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    footer: {
        top: '4%',
        right: '1.5%',
        marginBottom: '4%',
    },
    yAxis: {
        position: 'absolute', 
        top: '-1%', 
        height: '94%', 
        left: '-3.5%',
        // backgroundColor: COLORS.orange,
        marginBottom: '4%',
    },
})

export default GraficVM