import react from "react";
import { View,  Text, StyleSheet, Pressable } from "react-native";

import { stylingVariables } from "../styles/theme.style";

/*
  This component reners the calculate button and text on the water settings screen
  The button will be diabled if all personal information is not filled in
  It will render diffrent texts depending on if the button is enabled or disabled
  When pressed the button will call on the calculate function that has been passed as a prop
*/
const Calculate = ({enabled, calculate, copy, theme}) => {
  return (
    <View style={theme ? styles(theme).main : ""}>
      <Pressable onPress={enabled ? calculate : console.log("disabled")} style={theme ? (enabled ? styles(theme).btnEnabled : styles(theme).btnDisabled) : ""}>
        <Text style={theme ? styles(theme).btnText : ""}>{copy.title}</Text>
      </Pressable>
      {enabled ? 
      <Text style={theme ? styles(theme).text : ""}>{copy.textEnabled}</Text> :
      <View>
        <Text style={theme ? styles(theme).text : ""}>{copy.textDisabled}</Text>
      </View>
      }
    </View>
  )
}

export default Calculate

const styles = theme => StyleSheet.create({
  main: {
    marginVertical: stylingVariables.MARGIN_VERTICAL,
  },
  btnEnabled: {
    backgroundColor: theme.ACC_COLOR6,
    borderRadius: 20,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
  },
  btnDisabled: {
    backgroundColor: theme.BACKGROUND_COLOR2,
    borderRadius: 20,
    opacity: 0.5,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
  },
  btnText: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 28,
    textAlign: "center",
  },
  text: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 14,
    marginHorizontal: stylingVariables.MARGIN_SIDES,
  },
});