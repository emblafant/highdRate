import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import {Ionicons} from "@expo/vector-icons";

import { stylingVariables } from "../styles/theme.style";

//Header that displays "logo"
//Right now there is a text and icon as a placeholder for the logo

const Header = ({theme}) => {
  return (
    <SafeAreaView>
      <View style={theme ? styles(theme).main : ""}>
        <Text style={theme ? styles(theme).text : ""}>highdRate</Text>
        <Ionicons name="water" color={theme ? theme.TEXT_COLOR2 : "#FFFFFF"} size={40}/>
      </View>
    </SafeAreaView>
  )
}

export default Header;

const styles = (theme) => StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "center",
    opicty: 0.95,
    alignItems: "center",
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  text: {
    color: theme.TEXT_COLOR2,
    fontSize: 44,
  }
})