import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { COLORS } from '../theme/theme';
import { db, collection, getDocs } from '../../Firebase/firebaseConfig';

const TableVendaDespesa = () => {

  const [tableHead] = useState(['Mes', 'Venda', 'Despesa']);
  const [tableData, setTableData] = useState([]);

  const getDataDB = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'bdHildaFinance'));

      // if (tableData.length === 0) {
      const newData = [
        ['Janeiro', 'R$ ' + 0, 'R$ ' + 0],
        ['Fevereiro', 'R$ ' + 0, 'R$ ' + 0],
        ['Marco', 'R$ ' + 0, 'R$ ' + 0],
        ['Abril', 'R$ ' + 0, 'R$ ' + 0],
        ['Maio', 'R$ ' + 0, 'R$ ' + 0],
        ['Junho', 'R$ ' + 0, 'R$ ' + 0],
        ['Julho', 'R$ ' + 0, 'R$ ' + 0],
        ['Agosto', 'R$ ' + 0, 'R$ ' + 0],
        ['Setembro', 'R$ ' + 0, 'R$ ' + 0],
        ['Outubro', 'R$ ' + 0, 'R$ ' + 0],
        ['Novembro', 'R$ ' + 0, 'R$ ' + 0],
        ['Dezembro', 'R$ ' + 0, 'R$ ' + 0],
      ];

      querySnapshot.forEach((doc) => {
        const monthIndex = newData.findIndex(row => row[0] === doc.data().month);
        if (monthIndex !== -1) {
          const isVenda = doc.data().hasOwnProperty('product');
          const dataIndex = isVenda ? 1 : 2; // Decide whether to update Venda or Despesa

          const currentValue = parseFloat(newData[monthIndex][dataIndex].replace('R$ ', ''));

          newData[monthIndex][dataIndex] = 'R$ ' + (currentValue + doc.data().value);
        }
      });

      setTableData(newData); // Update the state with the new data
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
        {tableData.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
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
            ))}
          </TableWrapper>
        ))}
      </Table>
      <View style={styles.body}>
        <View style={styles.content}>
          <Text style={styles.textTotal}>TOTAL VENDA - R$ 0,00</Text>
          <Text style={styles.textTotal}>TOTAL DESPESA - R$ 0,00</Text>
        </View>
      </View>
    </>
  );
};

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
  },
});

export default TableVendaDespesa;
