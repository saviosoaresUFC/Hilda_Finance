import React, { useState, useEffect } from 'react'
import { StyleSheet, ToastAndroid } from 'react-native'
import { COLORS } from '../theme/theme';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { useStore } from '../store/store';

const TableLucro = () => {
    const ListaVendas = useStore((state) => state.ListaVendas); // Lista de vendas
    const ListaDespesas = useStore((state) => state.ListaDespesas); // Lista de despesas
    const [tableHead] = useState(['Mes', 'Lucro']); // Cabeçalho da tabela
    const [tableData, setTableData] = useState([]); // Dados da tabela
    // const [totalLucro, setTotalLucro] = useState(0);

    const getDataDB = async () => {
        const newData = [ // Cria um array com os dados iniciais
            ['Janeiro', 'R$ ' + 0],
            ['Fevereiro', 'R$ ' + 0],
            ['Marco', 'R$ ' + 0],
            ['Abril', 'R$ ' + 0],
            ['Maio', 'R$ ' + 0],
            ['Junho', 'R$ ' + 0],
            ['Julho', 'R$ ' + 0],
            ['Agosto', 'R$ ' + 0],
            ['Setembro', 'R$ ' + 0],
            ['Outubro', 'R$ ' + 0],
            ['Novembro', 'R$ ' + 0],
            ['Dezembro', 'R$ ' + 0],
        ];

        ListaVendas.forEach((item) => {
            const monthIndex = newData.findIndex(row => row[0] === item.month);
            if (monthIndex !== -1) {
                const dataIndex = 1;
                newData[monthIndex][dataIndex] = 'R$ ' + (
                    parseFloat(newData[monthIndex][dataIndex].replace('R$ ', '')) + item.value
                ).toFixed(2);
            }
        });

        ListaDespesas.forEach((item) => {
            const monthIndex = newData.findIndex(row => row[0] === item.month);
            if (monthIndex !== -1) {
                const dataIndex = 1;
                newData[monthIndex][dataIndex] = 'R$ ' + (
                    parseFloat(newData[monthIndex][dataIndex].replace('R$ ', '')) - item.value
                ).toFixed(2);
            }
        });

        setTableData(newData); // Atualiza o estado com os novos dados
        // setTotalLucro(totalLucro.toFixed(2));
    };

    useEffect(() => {
        const fetchData = async () => {
            await ListaVendas;
            await ListaDespesas;
            getDataDB();
        }
        fetchData();
    }, [ListaVendas, ListaDespesas]);
    return (
        <>
            <Table style={styles.table}>
                <Row data={tableHead} style={styles.head} textStyle={styles.textTitle} />
                {
                    tableData.map((rowData, index) => ( // Percorre os dados da tabela
                        <TableWrapper key={index} style={styles.row}>
                            {
                                rowData.map((cellData, cellIndex) => (  // Percorre os dados de cada linha
                                    <Cell
                                        key={cellIndex}
                                        data={cellData}
                                        textStyle={{
                                            ...styles.text,
                                            ...(cellIndex === 1 ? styles.textColor : {}),
                                        }}
                                        style={{
                                            ...styles.cell,
                                            ...(cellIndex === 1 ? (
                                                cellData.includes('-') ? styles.lucroNegativo : (
                                                    cellData === 'R$ 0' ? styles.lucroZero : styles.lucroPositivo
                                                )
                                            ) : {}),
                                        }}
                                    />
                                ))
                            }
                        </TableWrapper>
                    ))
                }
            </Table>
            {/* <View style={styles.body}>
                <View style={styles.content}>
                    <Text style={styles.textTotal}>LUCRO NO ANO  R$ {totalLucro}</Text>
                </View>
            </View> */}
        </>

    )
}


const styles = StyleSheet.create({
    table: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 14,
        margin: '2%',
        paddingBottom: '14%',
        // marginBottom: '36%',
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
    lucroNegativo: {
        backgroundColor: 'red',
        marginTop: '4%',
    },
    lucroZero: {
        backgroundColor: 'blue',
        opacity: 0.4,
        marginTop: '4%',
    },
    lucroPositivo: {
        backgroundColor: 'green',
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
})

export default TableLucro
