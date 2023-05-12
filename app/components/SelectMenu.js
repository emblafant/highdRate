import react from "react";
import { Text, ScrollView, Pressable, StyleSheet } from "react-native";

import { stylingVariables } from "../styles/theme.style";

/*
  This component displays a range of options passed throu the props in a scrollable list
  You can through the props decide if you want the pressing of an option to close a modal or not
*/

const SelectMenu = ({options, setState, closeModal, closeOnPress, theme}) => {

  //Saves input value and executes the prop function closeModal if the prop closeOnPress is true
  const handleOnPress = (value) => {
    setState(value);
    closeOnPress === true ? closeModal(!true) : "";
  }
  
  return (
    <ScrollView contentContainerStyle={theme ? styles(theme).main : ""}>
      {options.map((option, i) => {
        return (
          <Pressable onPress={() => {handleOnPress(option)}} key={i} style={theme ? styles(theme).option : ""}>
            <Text style={theme ? styles(theme).optionText : ""}>{option.toString()}</Text>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

export default SelectMenu;

const styles = (theme) => StyleSheet.create({
 main: {
   justifyContent: "center",
   flexGrow: 1,
   paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
 },
 option: {
  backgroundColor: theme.BACKGROUND_COLOR2,
  borderRadius: 10,
  paddingHorizontal: stylingVariables.MARGIN_SIDES,
  paddingVertical: stylingVariables.PADDING,
  marginVertical: stylingVariables.MARGIN_VERTICAL2,
 },
 optionText: {
   color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 24,
    textAlign: "center",
 },
})