import React, { useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { COLORS } from '../theme/theme';
import { useStore } from '../store/store';

const TableVendaDespesa = () => {
  const ListaVendas = useStore((state) => state.ListaVendas); // Lista de vendas
  const ListaDespesas = useStore((state) => state.ListaDespesas); // Lista de despesas
  const [tableHead] = useState(['Mes', 'Venda', 'Despesa']);  // Cabeçalho da tabela
  const [tableData, setTableData] = useState([]); // Dados da tabela

  const getDataDB = async () => { // Função para buscar os dados no banco de dados
      const newData = [ // Cria um array com os dados iniciais
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

      const calculateSum = (dataList, isVenda) => {
        dataList.forEach((doc) => {
          const monthIndex = newData.findIndex(row => row[0] === doc.month);
          if (monthIndex !== -1) {
            const dataIndex = isVenda ? 1 : 2;
            const currentValue = parseFloat(newData[monthIndex][dataIndex].replace('R$ ', ''));
            newData[monthIndex][dataIndex] = 'R$ ' + (currentValue + doc.value);
          }
        });
      };
      
      calculateSum(ListaVendas, true);  // Calcular a soma de vendas      
      calculateSum(ListaDespesas, false); // Calcular a soma de despesas
      setTableData(newData);
   
  };

  useEffect(() => {
    const fetchData = async () => { // Aguarde a atualização de ListaVendas e ListaDespesas antes de chamar getDataDB
      await ListaVendas;
      await ListaDespesas;
      getDataDB();  // Função para buscar os dados
    };

    fetchData();
  }, [ListaVendas, ListaDespesas]); 


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
                  ...(cellIndex === 1 ? (cellData === 'R$ 0' ? { ...styles.vendaCell, opacity: 0.5 } : styles.vendaCell) : {}),
                  ...(cellIndex === 2 ? (cellData === 'R$ 0' ? { ...styles.despesaCell, opacity: 0.5 } : styles.despesaCell) : {}),
                }}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
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
});

export default TableVendaDespesa;
