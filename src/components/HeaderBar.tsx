import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, Modal, Keyboard, TextInput } from 'react-native'
import { COLORS, ICONS } from '../theme/theme'
import { BlurView } from 'expo-blur'

interface HeaderBarProps {
  avaliableKey: (amount: string) => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({avaliableKey}) => {
  const [amount, setAmount] = useState('0');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAmountChange = (text) => {
    const numericInput = text.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos
    setAmount(numericInput); // Atualiza o estado
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hilda-Finance</Text>
      <Pressable onLongPress={handleLongPress}>
        <Image source={ICONS.avatarhylda} style={styles.img} />
      </Pressable>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <BlurView onTouchStart={handleCloseModal} style={StyleSheet.absoluteFill} intensity={36} tint="dark" />
          <Text style={styles.modalText}>Conteudo Bloqueado</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Key"
            keyboardType='numeric'
            value={amount}
            onChangeText={handleAmountChange}
            onSubmitEditing={() => {
              avaliableKey(amount)
              Keyboard.dismiss();
            }
            }
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.orange,
    marginTop: '8%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
    marginLeft: '4%',
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 16,
    marginRight: '4%'
  },
  modalContainer: {
    flex: 1,
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 26,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    color: 'white',
  },
  input: {
    width: '70%',
    height: 50,
    backgroundColor: '#E2E0E0',
    fontSize: 24,
    paddingLeft: '4%',
    fontFamily: 'Poppins-Regular',
    borderBottomWidth: 5,
  },
})

export default HeaderBar
