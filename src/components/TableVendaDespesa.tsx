import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../theme/theme';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';

interface State {
    tableHead: string[];
    tableData: string[][];
}
export default class TableVendaDespesa extends Component {
    state: State = {
        tableHead: ['Mes', 'Venda', 'Despesa'],
        tableData: [
            ['Janeiro', 'R$ ' + 86.51, 'R$ ' + 128.69],
            ['Fevereiro', 'R$ ' + 26.13, 'R$ ' + 100.98],
            ['Marco', 'R$ ' + 500.98, 'R$ ' + 200.98],
            ['Abril', 'R$ ' + 86.51, 'R$ ' + 56.52],
            ['Maio', 'R$ ' + 30.98, 'R$ ' + 300.91],
            ['Junho', 'R$ ' + 200.13, 'R$ ' + 100.98],
            ['Julho', 'R$ ' + 100.48, 'R$ ' + 86.51],
            ['Agosto', 'R$ ' + 500.98, 'R$ ' + 100.98],
            ['Setembro', 'R$ ' + 300.13, 'R$ ' + 86.51],
            ['Outubro', 'R$ ' + 100.98, 'R$ ' + 26.13],
            ['Novembro', 'R$ ' + 90.98, 'R$ ' + 26.13],
            ['Dezembro', 'R$ ' + 86.51, 'R$ ' + 100.98],
        ],
    };

    render() {
        const { tableHead, tableData } = this.state;
        return (
            <>
                <Table style={styles.table}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.textTitle} />
                    {
                        tableData.map((rowData, index) => (
                            <TableWrapper key={index} style={styles.row}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <Cell
                                            key={cellIndex}
                                            data={cellData}
                                            textStyle={{
                                                ...styles.text,
                                                ...(cellIndex === 1 ? styles.textColor : {}),
                                                ...(cellIndex === 2 ? styles.textColor : {}),
                                            }}
                                            style={{
                                                ...styles.cell,
                                                ...(cellIndex === 1 ? styles.vendaCell : {}),
                                                ...(cellIndex === 2 ? styles.despesaCell : {}),
                                            }}
                                        />
                                    ))
                                }
                            </TableWrapper>
                        ))
                    }
                </Table>
                <View style={styles.body}>
                    <View style={styles.content}>
                        <Text style={styles.textTotal}>TOTAL VENDA  - R$ 0,00</Text>
                        <Text style={styles.textTotal}>TOTAL DESPESA  - R$ 0,00</Text>
                    </View>
                </View>
            </>

        )
    }
}


const styles = StyleSheet.create({
    table: {
        backgroundColor: 'white',
        borderRadius: 14,
        margin: '6%',
        paddingBottom: '6%',
        flex: 1,
    },
    head: {
        height: '8%',
        backgroundColor: COLORS.orange,
        borderTopRightRadius: 14,
        borderTopLeftRadius: 14,
    },
    textTitle: {
        color: 'white',
        marginLeft: '18%',
        marginTop: '4%',
        fontFamily: 'Poppins-Semibold',
    },
    text: {
        marginLeft: '18%',
        marginTop: '12%',
        fontFamily: 'Poppins-Regular',
    },
    despesaCell: {
        backgroundColor: 'red',
        marginLeft: '2%',
    },
    vendaCell: {
        backgroundColor: 'green',
        color: 'white',
    },
    row: {
        width: '98%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    cell: {
        flex: 1,
        borderRadius: 14,
        marginTop: '1.5%',
    },
    textColor: {
        color: 'white',
        marginTop: '8%',
        fontFamily: 'Poppins-Semibold',
    },
    body: {
        alignItems: 'center',
        height: '4%',
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '100%',
    },
    textTotal: {
        fontFamily: 'Poppins-Semibold',
        color: COLORS.grayescuro,
        fontSize: 18,
    }
})