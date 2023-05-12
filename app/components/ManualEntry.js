import react from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

import DismissableKeypadView from "./DismissableKeypadView";

import { stylingVariables } from "../styles/theme.style";

/*
This component is a modal for the manual entry input in the watter settings screen
*/

const ManualEntry = ({data, setData, closeModal, theme}) => {
  const [amount, setAmount] = useState(data);


  //Saves the input data and closes the modal
  const save = () => {
    setData(amount);
    closeModal(!true);
  }
  return (
    <View style={theme ? styles(theme).main : ""}>
      <Text style={theme ? styles(theme).text : ""}>{`${amount.toString()} Liters`}</Text>
      <DismissableKeypadView onChange={setAmount} value={amount} inputStyle={theme ? styles(theme).input : ""}/>
      <Pressable onPress={save} style={theme ? styles(theme).btn : ""}>
        <Text style={theme ? styles(theme).btnText : ""}>save</Text>
      </Pressable>
    </View>
  )
}

export default ManualEntry

const styles = (theme) => StyleSheet.create({
  main: {
    justifyContent: "space-between",
    flexGrow: 1,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    backgroundColor: theme.BACKGROUND_COLOR3
  },
  text: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 60,
    textAlign: "center",
    textTransform: "lowercase",
    paddingVertical: stylingVariables.PADDING,
    marginTop: "25%",
  },
  input: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 24,
    backgroundColor: theme.BACKGROUND_COLOR4,
    borderRadius: 10,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: theme.BACKGROUND_COLOR1,
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: theme.ACC_COLOR1,
    borderRadius: 10,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
    alignItems: "center",
    marginTop: "30%",
  },
  btnText: {
    color: theme.TEXT_COLOR2,
    opacity: 0.95,
    fontSize: 32,
  },
})