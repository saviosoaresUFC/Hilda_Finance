import React, { useState, useEffect } from 'react'
import {
  StyleSheet, Text, View, TextInput,
  TouchableOpacity, Keyboard, Pressable,
  ToastAndroid
} from 'react-native'
import HeaderBar from '../components/HeaderBar'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, ICONS } from '../theme/theme'
import { useStore } from '../store/store'
import ModalConfirm from '../components/ModalConfirm'
import LottieView from 'lottie-react-native';



const Despesa = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const avaliableKey = (amount) => {
    if (amount === '2505202219122002') {
      navigation.push('Blocked');
    }
  }

  const addToDespesas = useStore(state => state.addToDespesas)
  const ListaDespesas = useStore(state => state.ListaDespesas)

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
  }

  const notification = (message) => {
    ToastAndroid.showWithGravity(message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  useEffect(() => { }, [ListaDespesas]);

  return (
    <Pressable onPress={HandlePress} style={styles.container}>
      <View style={styles.headerBar}>
        <HeaderBar avaliableKey={avaliableKey} />
      </View>
      <View style={styles.title}>
        <Text style={styles.text}>Cadastro de Despesas</Text>
      </View>
      <View style={styles.titleGastos}>
        <Text style={styles.textGasto}>Quanto foi gasto em compras?</Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="R$ 0,00"
          keyboardType='numeric'
          value={amount}
          onChangeText={handleAmountChange}
          onSubmitEditing={() => {
            // addItemBD();
            Keyboard.dismiss();
          }
          }
        />
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => {
            setModalVisible(true);
            Keyboard.dismiss();
          }
          }
        >
          <Ionicons name='ios-add' style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.viewImg}>
        <LottieView
          style={styles.img}
          source={require('../../img/LottieExpenseEmpty.json')}
          autoPlay
          loop
        />
      </View>
      {modalVisible && <ModalConfirm
        modal={modalVisible}
        setModal={setModalVisible}
        text={`Deseja adicionar uma despesa no valor de ${amount}?`}
        apagar={false}
        addItemBD={addItemBD}
      />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
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
    width: '100%',
  },
  textGasto: {
    fontSize: 22,
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
  viewImg: {
    height: '40%',

    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.grayescuro,
  },
  img: {
    height: '100%',
    width: '100%',
  },
})

export default Despesa