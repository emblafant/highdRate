import react from "react";
import { View, Pressable, Switch, Text, StyleSheet } from "react-native";

import { addLeadingZero } from "../functions";
import { schedulePushNotification, cancelNotification } from '../notifications';

import { stylingVariables } from "../styles/theme.style";

/*
 Renders List of notifications that the user has created in the Notifications Settings screen
*/

const NotificationList = ({data, setData, theme}) => {

  //Parses Time for display
  //Parses it to the 00:00 format and ads leading zero if needed
  const parseTime = (notification) => {
    const time = addLeadingZero(notification.h) + ":" + addLeadingZero(notification.m);
    return time
  }

  //Changes the status of a notification, active or inactive
  //This creates a new notification if activated and deletes the old notification if disabled.
  //Then it updates the status of the notification object in the array of notifications
  //This means that if a user disables a notification it will still be able to see it in the ui, as deactivated, but wont recieve notifications
  const changeNotificationStatus = async (notification, i) => {
    //Toggles the status
    const newStatus = !notification.active;

    let newId; //Vatriable to store new notification id in
    if(newStatus == true) {
      //If notification is activated, create new notification and save new notification id
      newId = await schedulePushNotification("reminder", notification.h, notification.m);
    } else {
      //if notification is deactivated, cancel notification based on notificatio id
      cancelNotification(notification.id);
    }
    //Create copy of notification data array
    const dataCopy = [...data];
    //Update the status of the notification
    dataCopy[i].active = newStatus;
    //If notification was activated, update the notification id
    newId ? dataCopy[i].id = newId : "";
    //Overwrite old data with new updated data copy
    setData(dataCopy);
  }

  //Deletes notification
  //The notification will no longer show up in the ui
  const deteleteNotification = (i, id) => {
    //Create copy of notification data array
    const dataCopy = [...data];
    //Remove notification object from array copy based on index
    dataCopy.splice(i, 1);
    //Overwrite old data with new updated data copy
    setData(dataCopy);
    //Cancel notification based on notification id
    cancelNotification(id);
  }

  return (
    <View>
      {data.map((notification, i) => {
        return (
          <Pressable key={i} onLongPress={() => {deteleteNotification(i, notification.id)}} style={theme ? (!notification.active ? styles(theme).mainActive : styles(theme).mainInactive) : ""}>
            <Text style={theme ? styles(theme).text : ""}>{parseTime(notification)}</Text>
            <Switch
            trackColor={{false: (theme ? theme.ACC_COLOR4 : "grey"), true: (theme ? theme.ACC_COLOR5 : "light-blue")}}
            thumbColor={theme ? theme.ACC_COLOR1 : "blue"}
            ios_backgroundColor={theme ? theme.ACC_COLOR4 : "grey"}
            onValueChange={() => {changeNotificationStatus(notification, i)}}
            value={notification.active}
            />
          </Pressable>
        )
      })}
    </View>
  )
}

export default NotificationList

const styles = (theme) => StyleSheet.create({
  mainActive: {
    backgroundColor: theme.ACC_COLOR7,
    borderRadius: 10,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  mainInactive: {
    backgroundColor: theme.ACC_COLOR8,
    borderRadius: 10,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    textTransform: "uppercase",
    fontSize: 28,
  },
});