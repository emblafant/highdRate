import React from "react";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import { stylingVariables } from "../styles/theme.style";

/*
  This component displays the users current streak
  It will display diffrenttexts depending on if the user currently hasa streak or not
*/

const Streaks = ({ days, copy, theme }) => {

  //Checks if the user currently has a streaks assigns diffrent copy objects depenting on the result
  if (days > 0) {
    copy = copy.streak;
  } else {
    copy = copy.noStreak;
  }


  return (
    <View style={theme? styles(theme).main : ""}>
      <View style={theme ? styles(theme).titleContainer : ""}>
        <Text style={theme ? styles(theme).title : ""}>{copy.title}</Text>
        <Text style={theme ? styles(theme).subTitle : ""}>{copy.subtitle}</Text>
      </View>
      <ImageBackground style={theme ? styles(theme).imageBackground : ""}>
        <Text style={theme ? styles(theme).daysNumber : ""}>{days}</Text>
        <Text style={theme ? styles(theme).daysText : ""}>Days</Text>
      </ImageBackground>
    </View>
  )
}

export default Streaks;

const styles = (theme) => StyleSheet.create({
  main: {
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 32,
  },
  subTitle : {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    textTransform: "lowercase",
    fontSize: 14,
  },
  imageBackground: {
    alignItems: "center",
    backgroundColor: theme.ACC_COLOR1,
    width: 100,
    height: 130,
    borderRadius: 100,
    justifyContent: "center",
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
  },
  daysNumber: {
    color: theme.TEXT_COLOR2,
    opacity: 0.95,
    fontSize: 64,
  },
  daysText: {
    color: theme.TEXT_COLOR2,
    opacity: 0.95,
    textTransform: "lowercase",
    fontSize: 20,
  }
})