import react from "react";
import { View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView} from "react-native";
import { useState, useEffect } from "react";

import SelectMenu from "./SelectMenu";

import { addLeadingZero } from "../functions";
import { schedulePushNotification } from '../notifications';

import { stylingVariables } from "../styles/theme.style";

/*
This component is the modal screen for creating reminders in the Notifications setting screen
*/
const CreateReminder = ({closeModal, setData, theme}) => {

  //Get current hour
  const [hour, setHour] = useState(new Date().getHours().toString());
  //Get current minute
  const [minute, setMinute] = useState(new Date().getMinutes().toString());
  const [time, setTime] = useState();

  //Arrays where all possible hours and minutes will be saved
  const [hoursArr, setHoursArr] = useState([]);
  const [minutesArr, setMinutesArr] = useState([]);

  //Creates one object for each number in the amount parameter and pushes it into an array which it returns
  const renderTimes = (amount) => {
    const arr = [];
    for (i = 0; i < amount ; i++) {
      let num = i.toString();
      //function to add leading zero if needed, for formatting, ex. 06min instead of 6min
      num = addLeadingZero(num);
      arr.push(num);
    }
    return[...arr];
  }

  //On render, calls on renderTimes to pupulate the hour and minutes array with all posiible hours and minutes
  useEffect(() => {
    setHoursArr(renderTimes(24));
    setMinutesArr(renderTimes(60));
  },[])

  //Sets time when hour and minute states update
  useEffect(() => {
    setTime(`${hour}:${minute}`)
  },[hour, minute])

  //Closes Modal
  const handleClose = () => {
    closeModal(false);
  }

  //Saves The notification and closes the modal
  const handleSave = async () => {
    //sets notification & gets the notification id;
    const id = await schedulePushNotification("reminder", parseInt(hour), parseInt(minute));
    //creates notification object, we want this in order to manipulate the notification later
    const data = {h: parseInt(hour), m: parseInt(minute), active: true, id: id};
    //saves the object to the setData prop, which saves it to the notification array
    setData({...data});
    handleClose();
  }

  return (
      <SafeAreaView style={theme ? styles(theme).main : ""}>
        <ScrollView style={{flex: 1}}>
        <Text style={theme ? styles(theme).title : ""}>{time}</Text>
        <View style={theme ? styles(theme).selectSection : ""}>
          <Text style={theme ? styles(theme).selectTitle : ""}>Hour</Text>
          <View style={theme ? styles(theme).selectWrapper : ""}>
            <SelectMenu options={hoursArr} setState={setHour} closeOnPress={false} theme={theme}/>
          </View>
        </View>
        <View style={theme ? styles(theme).selectSection : ""}>
          <Text style={theme ? styles(theme).selectTitle : ""}>Minute</Text>
          <View style={theme ? styles(theme).selectWrapper : ""}>
            <SelectMenu options={minutesArr} setState={setMinute} closeOnPress={false} theme={theme}/>
          </View>
        </View>
        <View style={theme ? styles(theme).btnContainer : ""}>
          <Pressable onPress={handleSave} style={theme ? styles(theme).btn : ""}>
            <Text style={theme ? styles(theme).btnText : ""}>save</Text>
          </Pressable>
          <Pressable onPress={handleClose} style={theme ? styles(theme).btn : ""}>
            <Text style={theme ? styles(theme).btnText : ""}>close</Text>
          </Pressable>
        </View>
        </ScrollView>
      </SafeAreaView>
  )
}

export default CreateReminder;

const styles = (theme) => StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR3,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  title: {
    paddingTop: stylingVariables.PADDING_VERTICAL_MAIN,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
    textAlign: "center",
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 48,
  },
  selectSection: {
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
  },
  selectTitle: {
    marginHorizontal: stylingVariables.MARGIN_SIDES,
    fontSize: 20,
    marginBottom: stylingVariables.MARGIN_VERTICAL,
  },
  selectWrapper: {
    height: 140,
    border: "1px, solid black",
    backgroundColor: theme.BACKGROUND_COLOR4,
    borderRadius: 20,
  },
  btnContainer: {
    paddingHorizontal:stylingVariables.PADDING_SIDES_MAIN,
  },
  btn: {
    backgroundColor: theme.ACC_COLOR1,
    borderRadius: 10,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
    alignItems: "center",
  },
  btnText: {
    color: theme.TEXT_COLOR2,
    opacity: 0.95,
    fontSize: 32,
  },
});