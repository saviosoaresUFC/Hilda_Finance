import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Pressable, ToastAndroid } from 'react-native'
import HeaderBar from '../components/HeaderBar'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../theme/theme'
import { collection, doc, setDoc, db, getDocs, } from '../../Firebase/firebaseConfig'
import { MaterialIcons } from '@expo/vector-icons';



const Despesa = () => {
  const HandlePress = () => {
    Keyboard.dismiss();
  }
  const [amount, setAmount] = useState('R$ 0,00');
  const handleAmountChange = (text) => {
    // Remove todos os caracteres não numéricos
    const numericInput = text.replace(/[^0-9]/g, '');
    // Formata o valor monetário
    const formattedAmount = formatCurrency(numericInput);
    // Atualiza o estado
    setAmount(formattedAmount);
  };

  const formatCurrency = (value) => {
    // Adiciona a máscara de moeda ao valor
    const numericValue = parseFloat(value) / 100; // Converte para número e divide por 100
    const formattedValue = numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
    return formattedValue;
  };

  const nomesDosMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const getNextDespesaNumber = async () => {
    const despesasCollection = collection(db, "bdHildaFinance");
    const despesasSnapshot = await getDocs(despesasCollection);
    const despesaNumber = despesasSnapshot.size + 1; // Próximo número de despesa
    return despesaNumber;
  }

  const addItemBD = async () => {
    try {
      const despesaNumber = await getNextDespesaNumber();
      const despesaDocumentName = `despesa${despesaNumber}`;
      const despesaDocRef = doc(collection(db, "bdHildaFinance"), despesaDocumentName);
      const dataAtual = new Date();
      const numericAmount = amount.replace(/[^0-9]/g, '') / 100;

      await setDoc(despesaDocRef, {
        date: `${dataAtual.toLocaleDateString("pt-BR")} ${dataAtual.toLocaleTimeString("pt-BR")}`,
        month: nomesDosMeses[new Date().getMonth()],
        value: numericAmount
      });
      setAmount('R$ 0,00');
      console.log("Document written with ID: ", despesaDocumentName);
      ToastAndroid.showWithGravity(`Despesa de ${numericAmount} gravado.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      console.log('Valor Numérico:', numericAmount);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  return (
    <Pressable onPress={HandlePress} style={styles.container}>
      <View style={styles.headerBar}>
        <HeaderBar />
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
    fontSize: 36,
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
    // height: '30%'

  },
  icon: {
    fontSize: 64,
    color: 'black',
  },
})

export default Despesa