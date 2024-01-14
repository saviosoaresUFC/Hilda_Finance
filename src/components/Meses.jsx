import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Meses = () => {
    const meses = ["Jan", "Fev", "Mar",
        "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set",
        "Out", "Nov", "Dez"]
    return (
        <View style={styles.xAxisLabels}>
            {meses.map((label, index) => (
                <Text key={index} style={styles.labelText}>
                    {label}
                </Text>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    xAxisLabels: {
        flexDirection: 'row',
        marginRight: '2.5%',
        marginTop: '10%',
    },
    labelText: {
        fontFamily: 'Inter-Black',
        fontSize: 12,
        marginLeft: '2.5%',
        marginTop: -50
    },
})

export default Meses