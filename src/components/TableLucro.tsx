import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../theme/theme';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';

interface State {
    tableHead: string[];
    tableData: string[][];
}

export default class TableLucro extends Component {
    state: State = {
        tableHead: ['Mes', 'Lucro'],
        tableData: [
            ['Janeiro', 'R$ ' + 86.51],
            ['Fevereiro', 'R$ ' + 26.13],
            ['Marco', 'R$ ' + 500.98],
            ['Abril', 'R$ ' + 86.51],
            ['Maio', 'R$ ' + 30.98],
            ['Junho', 'R$ ' + 200.13],
            ['Julho', 'R$ ' + 100.48],
            ['Agosto', 'R$ ' + 500.98],
            ['Setembro', 'R$ ' + 300.13],
            ['Outubro', 'R$ ' + 100.98],
            ['Novembro', 'R$ ' + 90.98],
            ['Dezembro', 'R$ ' + 86.51],
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
                                            }}
                                            style={{
                                                ...styles.cell,
                                                ...(cellIndex === 1 ? styles.lucroCell : {}),
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
                        <Text style={styles.textTotal}>TOTAL LUCRO  - R$ 0,00</Text>
                    </View>
                </View>
            </>

        )
    }
}


const styles = StyleSheet.create({
    table: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 14,
        margin: '2%',
        paddingBottom: '14%',
        marginBottom: '5%',
        alignSelf: 'center',
    },
    head: {
        height: '8%',
        backgroundColor: COLORS.orange,
        borderTopRightRadius: 14,
        borderTopLeftRadius: 14,
        width: '66%',
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
    lucroCell: {
        backgroundColor: 'blue',
        marginTop: '4%',
    },
    row: {
        width: '60%',
        flexDirection: 'row',
        height: '8.2%',
    },
    cell: {
        flex: 1,
        borderRadius: 14,
        marginTop: '2%',
    },
    textColor: {
        color: 'white',
        marginTop: '6%',
        fontFamily: 'Poppins-Semibold',
    },
    body: {
        alignItems: 'center',
        height: '3%',
        marginBottom: '38%',
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