import react from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { stylingVariables } from "../styles/theme.style";


/*
This component displays the title and subtitle at the top of each screen
It also includes a close button to go back in the navigation depending on the removeButton prop
*/
const Heading = ({title, subTitle, navigation, removeButton, theme}) => {

  //Go back in the navigation stack
  const handleOnPress = () => {
    navigation.goBack();
  }

  return (
    <View style={theme ? styles(theme).main : ""}>
      <View style={theme ? styles(theme).textContainer : ""}>
        <Text style={theme ? styles(theme).title : ""}>{title}</Text>
        <Text style={theme ? styles(theme).subTitle : ""}>{subTitle}</Text>
      </View>
      {!removeButton ?
        <Pressable onPress={handleOnPress} style={theme ? styles(theme).btn : ""}>
          <Text style={theme ? styles(theme).title : ""}>x</Text>
        </Pressable>
      : ""}
    </View>
  )
}

export default Heading;

const styles = (theme) => StyleSheet.create({
  main: {
    backgroundColor: theme.BACKGROUND_COLOR2,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN + stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  title: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 36,
  },
  subTitle: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 16,
  },
  textContainer: {
    width: "70%",
  },
})