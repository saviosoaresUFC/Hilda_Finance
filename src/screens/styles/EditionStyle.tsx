import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.orange,
      top: '4%',
    },
    viewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '80%',
      left: '3%',
      top: '1%',
    },
    buttonBack: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      width: '12%',
      // height: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textTittle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff'
    },
    choice: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      top: '8%',
      height: '7%',
    },
    choiceSale: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    choiceExpense: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewSaleAndExpense: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      width: '100%',
      height: '100%',
      paddingLeft: '10%',
      paddingRight: '10%',
      borderBottomWidth: 4,
    },
    textSaleAndExpense: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
    },
    viewLottie: {
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: '10%',
      // backgroundColor: COLORS.gray,
      width: '100%',
      height: '70%',
    },
    viewTextEmpty: {
      alignItems: 'center',
      justifyContent: 'center',
      bottom: '40%',
    },
    textEmpty: {
      fontSize: 18,
      justifyContent: 'center',
      top: '10%',
      fontFamily: 'Inter-Semibold',
      color: '#fff',
    },
  
    // SALE LIST
    viewSaleContainer: {
      alignItems: 'center',
      marginTop: '16%',
      // backgroundColor: COLORS.gray,
      width: '100%',
      height: '82%',
    },
    viewSaleCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      height: '6%',
      borderRadius: 10,
      backgroundColor: '#fff',
      marginTop: '2%',
    },
    viewSaleCardExpense: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      height: '6%',
      borderRadius: 10,
      // backgroundColor: '#fff',
      marginTop: '2%',
    },
    viewSaleButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%',
      height: '100%',
  
    },
    buttonRemove: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    viewSaleText: {
      alignItems: 'flex-start',
      // justifyContent: 'center',
      flexDirection: 'row',
      width: '80%',
      height: '100%',
      left: '5%',
    },
    viewExpenseText: {
      alignItems: 'flex-start',
      // justifyContent: 'center',
      flexDirection: 'row',
      width: '80%',
      height: '100%',
      left: '5%',
    },
    textSaleName: {
      fontSize: 17,
      fontFamily: 'Inter-Semibold',
      color: COLORS.orange,
    },
    viewSaleTextValue: {
      fontSize: 17,
      fontFamily: 'Inter-Semibold',
      color: '#fff',
    },
    textSaleQnt: {
      fontSize: 12,
      fontFamily: 'Inter-Semibold',
      color: COLORS.orange,
      left: '20%',
    },
    viewSaleTextName: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '74%',
      height: '100%',
    },
    viewSaleTextQnt: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '18%',
      height: '100%',
    },
    lottie: {
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
  
  
    // EXPENSE LIST
    containerExpense: {
      // backgroundColor: COLORS.gray,
      width: '100%',
      height: '78%',
      marginTop: '14%',
      marginBottom: '20%',
    },
    itensExpense: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '4%',
      // backgroundColor: '#fff',
      marginTop: '2%',
    },
    buttonRemoveExpense: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '10%',
    },
    viewExpenseValue: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '30%',
      borderBottomWidth: 4,
      borderColor: '#fff',
      borderRadius: 10,
      padding: '1%',
    },
    textExpenseValue: {
      fontSize: 18,
      fontFamily: 'Inter-Semibold',
      color: '#fff',
    },
    viewExpenseMonth: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '30%',
      borderBottomWidth: 4,
      borderColor: '#fff',
      borderRadius: 10,
      padding: '1%',
    },
    textExpenseMonth: {
      fontSize: 18,
      fontFamily: 'Inter-Semibold',
      color: '#fff',
    },
  })

  export default styles;