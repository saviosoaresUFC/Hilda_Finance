import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native'
import HeaderBar from '../components/HeaderBar'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../theme/theme'


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

  const handleButtonClick = () => {
    // Fazer algo com o valor numérico, por exemplo, enviar para o servidor
    console.log('Valor Numérico:', amount);
    setAmount('R$ 0,00');
  };
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
        />
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleButtonClick}>
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