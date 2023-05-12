import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Pressable } from "react-native";

import Heading from "../components/Heading";
import Header from "../components/Header";
import SwitchComponent from "../components/SwitchComponent";

import { getData, setData, handleNavigation } from "../functions";
import { removeStreakReminder } from "../notifications";

import getTheme from "../styles/theme.style";
import { stylingVariables } from "../styles/theme.style";



const SettingsScreen = ({ navigation }) => {
  //Get textcopy for screen
  const copy = require("../copy.json").settingsScreen;

  //Data variables
  const [streakEnabled, setStreakEnabled] = useState();
  const [streakNotificationId, setStreakNotificationId] = useState();
  const [contrastEnabled, setContrastEnabled] = useState();
  const [theme, setTheme] = useState();

  //Gets data used in the screen
  const getScreenData = async () => {
    const streakEnabledData = await getData("@streakEnabled");
    setStreakEnabled(streakEnabledData);
    const contrastEnabledData = await getData("@highContrastEnabled");
    setContrastEnabled(contrastEnabledData);
    const streakNotificationIdData = await getData("@streakNotificationId");
    setStreakNotificationId(streakNotificationIdData);
    const themeData = await getTheme();
    setTheme(themeData);
  }

  //Render on mount
  useEffect(() => {
    //Get data
    getScreenData();
  },[]);

  //When streak status is updated
  useEffect(() => {
    //Save new status
    setData("@streakEnabled", streakEnabled);
    //If streak is deactivated
    if (!streakEnabled) {
      //Remove streak notification if it exists
      streakNotificationId ? removeStreakReminder(streakNotificationId) : "";
      //Update status of streak notification in async storage (local storage)
      setData("@streakNotificationEnabled", false);
    }
  },[streakEnabled]);

  //when contrast status is updated
  useEffect(() => {
    //Update data in async storgae (local storage)
    setData("@highContrastEnabled", contrastEnabled);
  },[contrastEnabled]);

  return (
    <SafeAreaView>
    <ScrollView style={theme ? styles(theme).main : ""}>
      <Header theme={theme}/>
      <Heading title={copy.title} subTitle={copy.subtitle} navigation={navigation} theme={theme}/>
      <View style={theme ? styles(theme).settingsSection : ""}>
        <Pressable onPress={() => {handleNavigation("PersonalSettings", navigation)}} style={theme ? styles(theme).greyBtn : ""}>
          <Text style={theme ? styles(theme).btnText : ""}>Personal</Text>
        </Pressable>
        <Pressable onPress={() => {handleNavigation("WaterSettings", navigation)}} style={theme ? styles(theme).greyBtn : ""}>
          <Text style={theme ? styles(theme).btnText : ""}>Water Settings</Text>
        </Pressable>
        <Pressable onPress={() => {handleNavigation("NotificationSettings", navigation)}} style={theme ? styles(theme).greyBtn : ""}>
          <Text style={theme ? styles(theme).btnText : ""}>Notifications</Text>
        </Pressable>
        <SwitchComponent disabled={false} value={streakEnabled} setValue={setStreakEnabled} text="Streak" theme={theme} storageKey={"@streakEnabled"}/>
        <SwitchComponent disabled={false} value={contrastEnabled} setValue={setContrastEnabled} text="High contrast" theme={theme}/>
        <Pressable onPress={() => {handleNavigation("ImportantInfo", navigation)}} style={theme ? styles(theme).blueBtn : ""}>
          <Text style={theme ? styles(theme).btnText : ""}>Important Info</Text>
        </Pressable>
      </View>
      <View style={theme ? styles(theme).wave1 : ""}/>
      <View style={theme ? styles(theme).wave2 : ""}/>
    </ScrollView>
    </SafeAreaView>
  )
}

export default SettingsScreen;

const styles = (theme) => StyleSheet.create({
  main: {
    backgroundColor: theme.BACKGROUND_COLOR1,
  },
  settingsSection : {
    backgroundColor: theme.BACKGROUND_COLOR3,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,

  },
  btnText: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    textTransform: "uppercase",
    fontSize: 28,
  },
  greyBtn: {
    backgroundColor: theme.BACKGROUND_COLOR4,
    borderRadius: 10,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
  },
  blueBtn: {
    backgroundColor: theme.ACC_COLOR3,
    borderRadius: 10,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
  },
  wave1: {
    backgroundColor: theme.BACKGROUND_COLOR5,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  wave2: {
    backgroundColor: theme.BACKGROUND_COLOR1,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  }
})