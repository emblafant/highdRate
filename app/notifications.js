import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { setData } from "./functions";

//Creates a push notification
export const schedulePushNotification = async (type, hour, minute) => {
  let copy = require("./copy.json").notifications; //Get text to display in the notification

  let title;
  let body;
  //Render diffrent texts depending on type of notificatiob
  if (type == "streakReminder") {
    title = copy.streakReminder.title;
    body = copy.streakReminder.body;
  } else if (type == "reminder") {
    title = copy.reminder.title;
    body = copy.reminder.body;
  }
  //Create notification and get notification id
  const id = await Notifications.scheduleNotificationAsync({
    //notification content
    content: {
      title,
      body,
    },
    //When the notification should be triggerd
    trigger: {
      hour,
      minute,
      repeats: true, //Will repeat every day
    },
  });
  //Return notification id so that it can be saved for later
  return id;
}

//Removes notification
export const cancelNotification = async (notificationId) => {
  //Removes notification based on notification id
  await Notifications.cancelScheduledNotificationAsync(notificationId)
}

//Standard function to get permission from the user to send notifications
export async function registerForPushNotificationsAsync() {
  let token;
  
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get token");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use a physical device for Push Notifications")
  }

  return token;
}

//Creates notification for streak reminder
export const setStreakReminder = async (setIdState) => {
  //creates notification of type streakReminder and schedules it for 22:00
  const id = await schedulePushNotification("streakReminder", 22, 0);
  //Saves notification id
  setIdState(id);
  setData("@streakNotificationId", id)
}

//Removes notification for streak reminder
export const removeStreakReminder = async (setIdState) => {
  //Removes notification basen on notification id
  cancelNotification(streakNotificationId);
  //Removes id from data
  setIdState(undefined);
  setData("@streakNotificationId", undefined)
}