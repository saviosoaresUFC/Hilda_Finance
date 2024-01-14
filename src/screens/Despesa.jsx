import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Pressable, ToastAndroid } from 'react-native'
import HeaderBar from '../components/HeaderBar'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../theme/theme'
import { useStore } from '../store/store'



const Despesa = ({navigation}) => {

  const avaliableKey = (amount) => {
    if (amount === '1') {
      navigation.push('Informations');
    }
  }

  const addToDespesas = useStore(state => state.addToDespesas)
  const ListaDespesas = useStore(state => state.ListaDespesas)
  // const cleanListaDespesas = useStore(state => state.cleanListaDespesas)
  const HandlePress = () => {
    Keyboard.dismiss();
  }
  const [amount, setAmount] = useState('R$ 0,00');
  const handleAmountChange = (text) => {
    const numericInput = text.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos
    const formattedAmount = formatCurrency(numericInput); // Formata o valor monetário
    setAmount(formattedAmount); // Atualiza o estado
  };

  const formatCurrency = (value) => {
    const numericValue = parseFloat(value) / 100; // Converte para número e divide por 100
    const formattedValue = numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }); // Formata o valor monetário para o padrão brasileiro (R$ 0,00)
    return formattedValue; // Retorna o valor formatado
  };

  const nomesDosMeses = [ // Array com os nomes dos meses
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const addItemBD = () => { // Função para adicionar um item ao Array Despesa
      if (amount === 'R$ 0,00') { // Verifica se o valor é válido, ou seja, diferente de zero
        notification(`Insira um valor.`)
        return;
      }
      const dataAtual = new Date();
      const numericAmount = amount.replace(/[^0-9]/g, '') / 100;  // Converte para número e divide por 100
      const item = {
        date: `${dataAtual.toLocaleDateString("pt-BR")} ${dataAtual.toLocaleTimeString("pt-BR")}`,
        month: nomesDosMeses[new Date().getMonth()],
        value: numericAmount
      }
      addToDespesas(item)
      setAmount('R$ 0,00'); // Reseta o valor do input
      notification(`Despesa de ${numericAmount} gravado.`)
      // console.log(ListaDespesas)
  }

  const notification = (message) => { 
    ToastAndroid.showWithGravity(message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  useEffect(() => {}, [ListaDespesas]);

  return (
    <Pressable onPress={HandlePress} style={styles.container}>
      <View style={styles.headerBar}>
        <HeaderBar avaliableKey={avaliableKey}/>
      </View>
      <View style={styles.title}>
        <Text style={styles.text}>Cadastro de Despesas</Text>
      </View>
      <View style={styles.titleGastos}>
        <Text style={styles.textGasto}>Quanto foi gasto?</Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="R$ 0,00"
          keyboardType='numeric'
          value={amount}
          onChangeText={handleAmountChange}
          onSubmitEditing={() => {
            addItemBD();
            Keyboard.dismiss();
          }
          }
        />
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => {
            addItemBD();
            Keyboard.dismiss();
          }
          }
        >
          <Ionicons name='ios-add' style={styles.icon} />
        </TouchableOpacity>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C2C2C2',
    height: '100%',
  },
  headerBar: {
    height: '12.5%',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '6%',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  titleGastos: {
    justifyContent: 'center',
    marginTop: '6%',
  },
  textGasto: {
    fontSize: 24,
    marginLeft: '4.5%',
    fontFamily: 'Poppins-Regular',
  },
  containerInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '6%',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#E2E0E0',
    fontSize: 24,
    paddingLeft: '4%',
    fontFamily: 'Poppins-Regular',
    borderBottomWidth: 5,
  },
  viewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
  buttonAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '6%',
    backgroundColor: COLORS.orange,
    width: '36%',
    borderRadius: 30,
  },
  icon: {
    fontSize: 64,
    color: 'black',
  },
})

export default Despesa


// const getNextDespesaNumber = async () => {  // Função para buscar o próximo número de despesa
//   const despesasCollection = collection(db, "bdHildaFinance");
//   const despesasSnapshot = await getDocs(despesasCollection);
//   const despesaNumber = despesasSnapshot.size + 1; // Próximo número de despesa
//   return despesaNumber;
// }

// const addItemBD = async () => { // Função para adicionar um item no banco de dados
//   try {
//     if(amount === 'R$ 0,00'){ // Verifica se o valor é válido, ou seja, diferente de zero
//        notification(`Insira um valor.`)
//       return;
//     }
//     const despesaNumber = await getNextDespesaNumber(); // Busca o próximo número de despesa
//     const despesaDocumentName = `despesa${despesaNumber}`;  // Nome do documento
//     const despesaDocRef = doc(collection(db, "bdHildaFinance"), despesaDocumentName); // Referência do documento
//     const dataAtual = new Date();
//     const numericAmount = amount.replace(/[^0-9]/g, '') / 100;  // Converte para número e divide por 100

//     await setDoc(despesaDocRef, { // Adiciona o item no banco de dados
//       date: `${dataAtual.toLocaleDateString("pt-BR")} ${dataAtual.toLocaleTimeString("pt-BR")}`,
//       month: nomesDosMeses[new Date().getMonth()],
//       value: numericAmount
//     });
//     setAmount('R$ 0,00'); // Reseta o valor do input
//     notification(`Despesa de ${numericAmount} gravado.`)
//   } catch (e) {
//     notification("Error ao adicionar documento");
//   }
// }