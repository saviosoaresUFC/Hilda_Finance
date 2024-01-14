import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Legends = () => {
    const colors = ['#ff0000', '#FF6B00', '#FFB800', '#2AD000', '#00AAD0']
    return (
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
    )
}

const styles = StyleSheet.create({
    legends: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
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

export default Legends