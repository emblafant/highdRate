import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import Header from '../components/Header';
import Heading from '../components/Heading';
import CountDown from '../components/CountDown';
import Streaks from '../components/Streaks';
import StreaksPlaceholder from '../components/StreaksPlaceholder';
import WaterCounter from '../components/WaterCounter';

import { Feather } from "@expo/vector-icons";

import { handleNavigation, getData, setData, setUpDataStorage, calculateUnits, getTodayDate } from '../functions';

import getTheme from '../styles/theme.style';
import { stylingVariables } from '../styles/theme.style';



const StartScreen = ({navigation}) => {
  //Get textcopy for screen
  const copy = require("../copy.json").startScreen;

  //Data variables
  const [userName, setUserName] = useState();
  const [goalUnits, setGoalUnits] = useState();
  const [consumedUnits, setConsumedUnits] = useState();
  const [goalReached, setGoalReached] = useState();
  const [streakEnabled, setStreakEnabled] = useState();
  const [streakDays, setStreakDays] = useState()
  const [theme, setTheme] = useState();
  const [storedDate, setStoredDate] = useState();
  const [lastStreakDay, setLastStreakDay] = useState();
  const [todayDate, setTodayDate] = useState();

  //Title that icludes users name if that has been declared
  const title = userName ? `${copy.title}${" "+userName}!` : copy.title + "!";

  //Gets data used in the screen
  const getScreenData = async () => {
    const nameData = await getData("@userName");
    setUserName(nameData);
    const consumedData = await getData("@unitsConsumed");
    setConsumedUnits(consumedData);
    const streakEnabledData = await getData("@streakEnabled");
    setStreakEnabled(streakEnabledData);
    const streakDaysData = await getData("@streakDays");
    setStreakDays(streakDaysData);
    const goalUnitsData = await calculateUnits();
    setGoalUnits(goalUnitsData);
    const themeData = await getTheme();
    setTheme(themeData);
    const storedDateData = await getData("@storedDate");
    setStoredDate(storedDateData);
    const lastStreakDayData = await getData("@lastStreakDay");
    setLastStreakDay(lastStreakDayData);
    const todayData = getTodayDate();
    setTodayDate(todayData);
  }

  //Render on mount
  useEffect(() => {

    //Developer function, clear storage
    const clearAll = async () => {
      try {
        await AsyncStorage.clear();
      } catch(e) {
        console.log("error");
      }
    }
    clearAll()

    //Check if this is the first time user opens the application
    const checkFirstOpen = async () => {
      const previouslyOpened = await getData("@previouslyOpened");
      if (!previouslyOpened) {
        //If it is the first time, set upp Asyncstorage keys with default values
        setUpDataStorage();
        console.log("first");
      } else {
        console.log("not first");
      }
      //Get all data from Async storage
      getScreenData();
    }
    checkFirstOpen();
  },[]);

  //Checks if this is the top screen in the navigation stack
  //If it is, get data again and update counter
  const isFocused = useIsFocused()
  useEffect(() => {
    getScreenData();
    updateCounter();
  },[isFocused])

  //Adds consumed unit to counter
  const handleAddUnit = () => {
    let newConsumedUnits = consumedUnits + 1;

    //If user has consumed all or less of units of the day, update variable and data
    if (newConsumedUnits <= goalUnits) {
      setConsumedUnits(newConsumedUnits);
      setData("@unitsConsumed", newConsumedUnits);
    }
  }

  //Updates streak
  const updateStreak = () => {
    //Amount of milliseconds in a day
    const dayMs = 86400000;

    //If there is a data for the last streak (the user has previously reached their goal)
    //and todays date in milliseconds - teh date of their last goal reached in milliseconds equals one day of milliseconds
    //(in other word, the user reached their goal yesterday)
    if(lastStreakDay && todayDate - lastStreakDay == dayMs) {
      //Update the date of the latest streak to today
      setLastStreakDay(todayDate);
      setData("@lastStreakDay", todayDate);
      //Add one day to the total of streak days
      setStreakDays(streakDays + 1);
      setData("@streakDays", streakDays + 1)
    } else {
      //Else, reset streak days
      setStreakDays(0);
      setData(0)
    }
  }

  //Calculates if the goal has been reached
  const calculateGoalReached = () => {
    //If user has consumed as many unitas as the goal
    if (goalUnits == consumedUnits) {
      //Update goal variable
      setGoalReached(true);
      //If the user has streaks enabled, update streak
      streakEnabled ? updateStreak() : "";
    } else {
      //Update goal variable
      setGoalReached(false);
    }
  }

  //Reset watercounter on new day
  const updateCounter = async () => {
    //If storedDate does not exist or todays date is larger than stored date
    //In other words, if todays date has not been previously saved or todays date is larger than the date the app last saved
    if(!storedDate || storedDate < todayDate) {
      //update the stored date to todays date
      setData("@storedDate", todayDate);
      //reset consumed units, since it's a new day
      setConsumedUnits(0);
      setData("@unitsConsumed", 0);
    };
  }
  
  //When user consumes a unit
  useEffect(() => {
    if (consumedUnits && goalUnits) {   //Check if the variables exsits in order to not cause errors
      //calculate if todays goal has been reached
      calculateGoalReached();
    }
  },[consumedUnits])


  return (
    <SafeAreaView>
    <ScrollView style={theme ? styles(theme).main : ""}>
      <Header theme={theme}/>
      <Heading title={title} subTitle={goalReached ? copy.subtitle2 : copy.subtitle1} removeButton={true} theme={theme}/>
      <View style={theme ? styles(theme).todaySection : ""}>
        <Text style={theme ? styles(theme).todaySectionTitle : ""}>{copy.todaySection.title}</Text>
        <WaterCounter totalAmount={goalUnits} consumedAmount={consumedUnits} theme={theme}/>
        <View style={theme ? styles(theme).countDown : ""}>
          <CountDown theme={theme} goalReached={goalReached}/>
        </View>
      </View>
      <View style={theme ? styles(theme).streakSection : ""}>
          {streakEnabled ? <Streaks days={streakDays} copy={copy.streakSection.activeStreak} theme={theme}/> : <StreaksPlaceholder copy={copy.streakSection.inactiveStreak} theme={theme}/>}
      </View>
      <View style={theme ? styles(theme).settingsSection : ""}>
        <Pressable style={theme ? styles(theme).settingsBtn : ""} onPress={() => {handleNavigation("Settings", navigation)}}>
          <Feather name="settings" color={theme ? theme.TEXT_COLOR1 : "#333333"} size={24}/>
          <Text style={theme ? styles(theme).settingsText : ""}> Settings</Text>
        </Pressable>
      </View>
      <View style={theme ? styles(theme). addBtnWrapper : ""}>
        <Pressable onPress={handleAddUnit} style={theme ? styles(theme). addBtn : ""}>
          <Text style={theme ? styles(theme). addBtnText : ""}>+</Text>
        </Pressable>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default StartScreen;

const styles = (theme) => StyleSheet.create({
  main: {
    backgroundColor: theme.BACKGROUND_COLOR1,
  },
  todaySection: {
    backgroundColor: theme.BACKGROUND_COLOR3,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  todaySectionTitle: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 36,
    textTransform: "uppercase",
    alignSelf: "flex-end",
    marginRight: stylingVariables.MARGIN_SIDES,
    marginBottom: stylingVariables.MARGIN_VERTICAL,
  },
  countDown: {
    marginLeft: stylingVariables.MARGIN_SIDES,
  },
  streakSection: {
    backgroundColor: theme.BACKGROUND_COLOR5,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    alignItems: "center",
  },
  settingsSection: {
    backgroundColor: theme.BACKGROUND_COLOR2,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
  },
  settingsBtn: {
    marginLeft: stylingVariables.MARGIN_SIDES,
    opacity: 0.9,
    flexDirection: "row",
    alignItems: "center",
  },
  settingsText: {
    color: theme.TEXT_COLOR1,
    fontSize: 24,
  },
  addBtnWrapper: {
    backgroundColor: theme.BACKGROUND_COLOR2,
  },
  addBtn: {
    backgroundColor: theme.BACKGROUND_COLOR1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
  },
  addBtnText: {
    color: theme.TEXT_COLOR2,
    fontSize: 76,
    textAlign: "center",
  },
})