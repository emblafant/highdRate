import { StatusBar } from 'expo-status-bar';
import { Navigator } from './app/routes/stack';
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

import {registerForPushNotificationsAsync} from "./app/notifications";

//Standard handler for notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  })
});

export default function App() {
  //Standard code for notifications
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  },[]);


  //Navigator to handle routing
  return (
    <Navigator/>
  )
};
