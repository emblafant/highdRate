import react from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";

import Header from "../components/Header";
import Heading from "../components/Heading";
import SwitchComponent from "../components/SwitchComponent";
import NotificationList from "../components/NotificationList";
import ModalComponent from "../components/ModalComponent";
import CreateReminder from "../components/CreateReminder";

import { getData, setData } from "../functions";
import { setStreakReminder, removeStreakReminder } from "../notifications";

import getTheme from '../styles/theme.style';
import { stylingVariables } from '../styles/theme.style';



const NotificationSettingsScreen = ({navigation}) => {
  //Get textcopy for screen
  const copy = require("../copy.json").notificationSettingsScreen;

  //Data variables for screen
  const [streakEnabled, setStreakEnabled] = useState();
  const [streakNotificationEnabled, setStreakNotificationEnabled] = useState();
  const [streakNotificationId, setStreakNotificationId] = useState();
  const [theme, setTheme] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [newReminder, setNewReminder] = useState();
  const [allReminders, setAllReminders] = useState([]);

  //Get data for screen
  const getScreenData = async () => {
    const streakEnabledData = await getData("@streakEnabled");
    setStreakEnabled(streakEnabledData);
    const streakNotificationEnabledData = await getData("@streakNotificationEnabled")
    setStreakNotificationEnabled(streakNotificationEnabledData);
    const streakNotificationIdData = await getData("@streakNotificationId");
    setStreakNotificationId(streakNotificationIdData);
    const remindersData = await getData("@reminders");
    setAllReminders(remindersData);
    const themeData = await getTheme();
    setTheme(themeData);
  }

  //On render
  useEffect(() => {
    //Get data for screen
    getScreenData()
  },[]);

  //When new reminder notification is added add it to the rest
  useEffect(() => {
    if (newReminder) {
      const reminders = [...allReminders]; //Get copy of array of notifications
      reminders.push(newReminder); //Push new reminder
      //Save new array
      setAllReminders(reminders);
      setData("@reminders", reminders); 
    }
  },[newReminder])

  //When status of streakNotification is updated
  useEffect(() => {
    //update status
    setData("@streakNotificationEnabled", streakNotificationEnabled)
    if (streakNotificationEnabled) {
      //if enabled, save notification id
      setStreakReminder(setStreakNotificationId);
    } else {
      if (streakNotificationId) {
        //if disabled, and streaknotification id exsists, remove notification based on notification id
        removeStreakReminder(setStreakNotificationId);
      }
    }
  },[streakNotificationEnabled]);

  return (
    <SafeAreaView>
    <ScrollView style={theme ? styles(theme).main : ""}>
      <Header theme={theme}/>
      <Heading title={copy.title} subTitle={copy.subtitle} navigation={navigation} theme={theme}/>
      <View style={theme ? styles(theme).streakSection : ""}>
        <Text style={theme ? styles(theme).streakTitle : ""}>{copy.streakSection.title}</Text>
        <SwitchComponent disabled={!streakEnabled} text={"22:00"} value={streakNotificationEnabled} setValue={setStreakNotificationEnabled} theme={theme}/>
        <Text style={theme ? styles(theme).streakText : ""}>{copy.streakSection.text}</Text>
      </View>
      <View style={theme ? styles(theme).remindersSection : ""}>
        <View style={theme ? styles(theme).remindersTextContainer : ""}>
          <Text style={theme ? styles(theme).remindersTitle : ""}>{copy.remindersSection.title}</Text>
          <Text style={theme ? styles(theme).remindersText : ""}>{copy.remindersSection.text1}</Text>
          <Text style={theme ? styles(theme).remindersText : ""}>{copy.remindersSection.text2}</Text>
        </View>
        <Pressable onPress={() => {setModalVisible(true)}} style={theme ? styles(theme).btn : ""}>
          <Text style={theme ? styles(theme).btnText : ""}>+</Text>
        </Pressable>
        <NotificationList data={allReminders} setData={setAllReminders} theme={theme}/>
      </View>
      <View style={theme ? styles(theme).wave : ""}/>
      <ModalComponent modalVisible={modalVisible}>
        <CreateReminder closeModal={setModalVisible} setData={setNewReminder} theme={theme}/>
      </ModalComponent>
    </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationSettingsScreen;

const styles = (theme) => StyleSheet.create({
  main: {
    backgroundColor: theme.BACKGROUND_COLOR1,
  },
  streakSection: {
    backgroundColor: theme.BACKGROUND_COLOR3,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  streakTitle: {
    marginRight: stylingVariables.MARGIN_SIDES,
    textAlign: "right",
    textTransform: "uppercase",
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 36,
  },
  streakText: {
    marginHorizontal: stylingVariables.MARGIN_SIDES,
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 14,
  },
  remindersSection: {
    backgroundColor: theme.BACKGROUND_COLOR5,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  remindersTextContainer: {
    marginBottom: stylingVariables.MARGIN_VERTICAL2,
    marginHorizontal: stylingVariables.MARGIN_SIDES,
    alignItems: "center",
  },
  remindersTitle: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 30,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: stylingVariables.MARGIN_VERTICAL,
  },
  remindersText: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 14,
    textAlign: "center",
  },
  btn: {
    backgroundColor: theme.ACC_COLOR1,
    borderRadius: 10,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
    alignItems: "center",
  },
  btnText: {
    color: theme.TEXT_COLOR2,
    opacity: 0.95,
    fontSize: 48,
    marginBottom: 48/5
  },
  wave: {
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
    backgroundColor: theme.BACKGROUND_COLOR1,
  }
});