import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../theme/theme';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { db, collection, getDocs } from '../../Firebase/firebaseConfig'

const TableLucro = () => {
    const [tableHead] = useState(['Mes', 'Lucro']);
    const [tableData, setTableData] = useState([]);

    const getDataDB = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'bdHildaFinance'));

            const newData = [
                ['Janeiro', 0],
                ['Fevereiro', 'R$ ' + 0],
                ['Marco',0],
                ['Abril', 'R$ ' + 0],
                ['Maio', 'R$ ' + 0],
                ['Junho', 'R$ ' + 0],
                ['Julho', 'R$ ' + 0],
                ['Agosto', 'R$ ' + 0],
                ['Setembro', 'R$ ' + 0],
                ['Outubro', 'R$ ' + 0],
                ['Novembro', 'R$ ' + 0],
                ['Dezembro',+ 0],
              ];

              querySnapshot.forEach((doc) => {
                const monthIndex = newData.findIndex(row => row[0] === doc.data().month);
                if (monthIndex !== -1) {
                  const isVenda = doc.data().hasOwnProperty('product');
                  const dataIndex = isVenda ? 1 : 2; // Decide whether to update Venda or Despesa
        
                  newData[monthIndex][dataIndex] += isVenda ? doc.data().value : -doc.data().value;

                //   const currentValue = parseFloat(newData[monthIndex][dataIndex].replace('R$ ', ''));
        
                //   newData[monthIndex][dataIndex] = 'R$ ' + (currentValue + doc.data().value);
                }
              });
              
            setTableData(newData); // Atualiza o estado com os novos dados
        } catch (error) {
            console.log('Erro ao buscar dados do banco de dados', error);
        }
    };

    useEffect(() => {
        getDataDB();
    }, [tableData]);
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

export default TableLucro
