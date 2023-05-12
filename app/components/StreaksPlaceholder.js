import React from "react";
import { Text, ImageBackground, View, StyleSheet } from "react-native";

import { stylingVariables } from "../styles/theme.style";

/*
  This component is a placeholder for the streakcomponent
  This component will inform the user that streaks are not currently activated and tell them where to activte them
*/

const StreaksPlaceholder = ({copy, theme}) => {
  return (
    <ImageBackground style={theme ? styles(theme).background : ""}>
      <View style={theme ? styles(theme).container1 : ""}>
        <Text style={theme ? styles(theme).title1 : ""}>{copy.title1}</Text>
        <Text style={theme ? styles(theme).title2 : ""}>{copy.title2}</Text>
      </View>
      <View style={theme ? styles(theme).container2 : ""}>
        <Text style={theme ? styles(theme).subTitle1 : ""}>{copy.subtitle1}</Text>
        <Text style={theme ? styles(theme).subTitle2 : ""}>{copy.subtitle2}</Text>
      </View>
    </ImageBackground>
  )
}

export default StreaksPlaceholder;

const styles = (theme) => StyleSheet.create({
  background: {
    alignItems: "center",
    width: "70%",
  },
  container1: {
    alignItems: "center",
    marginBottom: stylingVariables.MARGIN_VERTICAL,
  },
  container2: {
    alignItems: "center",
  },
  title1: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    textTransform: "uppercase",
    fontSize: 32
  },
  title2: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    textTransform: "lowercase",
    fontSize: 32
  },
  subTitle1: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    textAlign: "center",
    textTransform: "lowercase",
    fontSize: 16,
  },
  subTitle2: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    textTransform: "uppercase",
    fontSize: 16,
  }
})