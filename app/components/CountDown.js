import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { useEffect, useState } from "react";

import { stylingVariables } from "../styles/theme.style";

/*
  This component Renders a Countdown to midnight.
  The countdown will change style when declared time is reached and goal is not yet reached for the day
*/
const CountDown = ({theme, goalReached}) => {

  const [timer, setTimer] = useState("");
  const [timerStyle, setTimerStyle] = useState(styles.timer)
  const [containerStyle, setContainerStyle] = useState(styles.container)

  //Gets current time on render and keep updating
  useEffect(() => {
    setInterval(() => getCurrentTime());
  }, []);
  
  //Hours left when timer should change style
  const timeAlmostOut = 4;


  getCurrentTime = () => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();

    //Get hours and minutes left in the day
    hours = (24 - 1) - hours;
    minutes = 60 - minutes;

    //Create and save string to display as timer
    const time = `${hours}h ${minutes}m left`
    setTimer(time);

    //Assigns diffrent stylings depending on time left and if goal has been reached
    theme ?
    (hours < timeAlmostOut && !goalReached ? 
    setTimerStyle(styles(theme).redTimer) & setContainerStyle(styles(theme).redContainer):
    setTimerStyle(styles(theme).timer) & setContainerStyle(styles(theme).container))
    : "";
  }

  return (
    <View style={containerStyle}><Text style={timerStyle}>{timer}</Text></View>
  )
}

export default CountDown;

const styles = (theme) => StyleSheet.create({
  timer: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
  },
  redTimer: {
    color: theme.TEXT_COLOR3,
    opacity: 0.9,
  },
  container: {
    marginTop: stylingVariables.MARGIN_VERTICAL,
  },
  redContainer: {
    backgroundColor: theme.HIGHLIGHT1,
    borderRadius: 10,
    padding: 8,
    alignSelf: "flexStart",
    marginTop: stylingVariables.MARGIN_VERTICAL,
  }
})