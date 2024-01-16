import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import { COLORS } from '../theme/theme'
import { BlurView } from 'expo-blur'
import { Entypo } from '@expo/vector-icons'

interface ModalConfirmProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  cleanListaVendas: any
  cleanListaDespesas: any
  text: string
  apagar: boolean
  addItemBD?: any
  navigation?: any
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  modal, setModal, cleanListaVendas, cleanListaDespesas, text, apagar, addItemBD, navigation
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        setModal(!modal)
      }}
    >
      <BlurView intensity={30} style={StyleSheet.absoluteFill} tint={'light'} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, apagar ? { backgroundColor: 'red' } : { backgroundColor: 'green' }]}
              onPress={() => {
                setModal(!modal)
                if (apagar) {
                  cleanListaVendas()
                  cleanListaDespesas()
                }if(apagar == null){
                  navigation()
                }
                else{
                  addItemBD()
                }
              }
              }
            >
              <Text style={styles.textStyle}>Sim</Text>
              <Entypo name="thumbs-up" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.orange }]}
              onPress={() => setModal(!modal)}
            >
              <Text style={styles.textStyle}>Nao</Text>
              <Entypo name="thumbs-down" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: '14%',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: '5%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 12
    }
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingLeft: '14%',
    // backgroundColor: 'red'
  },
  button: {
    borderRadius: 14,
    padding: '7%',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: "white",
    fontFamily: 'Inter-Medium',
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontFamily: 'Inter-Semibold',
    fontSize: 26,
  }
})

export default ModalConfirm