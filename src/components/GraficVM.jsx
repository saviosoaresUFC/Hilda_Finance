import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../theme/theme'
import { useStore } from '../store/store'
// import { Text } from 'react-native-svg'
import { StackedBarChart, Grid } from 'react-native-svg-charts'

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

    function seeDataVM(month) {
        let total = 0
        ListaVendas.forEach((item) => {
            if (item.month === month) {
                total++;
            }
        })
        return total
    }

    const colors = ['#ff0000', '#F85252', '#F69393', '#FBCECE', '#FDEDED']
    const keys = ['SkewerSimple', 'SkewerComplete', 'Hamburguer', 'Food', 'Drink']
    const xLabels = dataVM.map((item) => item.monthSigla);
    return (
        <>
            <StackedBarChart
                style={{ height: '50%', width: '100%' }}
                keys={keys}
                colors={colors}
                data={dataVM}
                showGrid={true}
                contentInset={{ top: 30, bottom: 30 }}
                valueAcessor={({ item, key }) => item[key]}
            >
                <Grid />
            </StackedBarChart>
            <View style={styles.xAxisLabels}>
                {xLabels.map((label, index) => (
                    <Text key={index} style={styles.labelText}>
                        {label}
                    </Text>
                ))}
            </View>
            <View style={styles.legends}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendIcon, { backgroundColor: colors[0] }]} />
                    <Text style={styles.legendText}>Espetinho Simples</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendIcon, { backgroundColor: colors[1] }]} />
                    <Text style={styles.legendText}>Espetinho Completo</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendIcon, { backgroundColor: colors[2] }]} />
                    <Text style={styles.legendText}>Hamburguer</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendIcon, { backgroundColor: colors[3] }]} />
                    <Text style={styles.legendText}>Comida</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendIcon, { backgroundColor: colors[4] }]} />
                    <Text style={styles.legendText}>Bebida</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    xAxisLabels: {
        flexDirection: 'row',
        marginRight: '2.5%',
    },
    labelText: {
        fontFamily: 'Inter-Black',
        fontSize: 12,
        marginLeft: '2.5%',
        marginTop: -20
    },
    legends: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '5%',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '5%',
        marginBottom: '2%',
    },
    legendIcon: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 7,
    },
    legendText: {
        fontFamily: 'Inter-Semibold',
        fontSize: 14,
    },
    
})

export default GraficVM