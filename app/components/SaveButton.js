import react from "react";
import { Pressable, Text, StyleSheet } from "react-native";

/*
  This component executes a function passed through the props when it's pressed.
  This prop function is meant to be a function which saves data
*/
const SaveButton = ({save, theme}) => {

  return (
      <Pressable onPress={save} style={theme ? styles(theme).btn : ""}>
       <Text style={theme ? styles(theme).btnText : ""}>save</Text>
      </Pressable>
  )
}

export default SaveButton;

const styles= (theme) => StyleSheet.create({
  btn: {
    backgroundColor: theme.BACKGROUND_COLOR1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
  },
  btnText: {
    color: theme.TEXT_COLOR2,
    fontSize: 76,
    textAlign: "center",
  },
});