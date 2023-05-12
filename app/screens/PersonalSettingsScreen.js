import react from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from "react";

import Header from "../components/Header";
import Heading from "../components/Heading";
import SelectMenu from "../components/SelectMenu";
import DismissableKeypadView from "../components/DismissableKeypadView";
import SaveButton from "../components/SaveButton";
import ModalComponent from "../components/ModalComponent";

import {Entypo} from "@expo/vector-icons";

import { getData, setData, generateTimes } from "../functions";

import getTheme from '../styles/theme.style';
import { stylingVariables } from '../styles/theme.style';



const PersonalSettingsScreen = ({navigation}) => {
  //Get textcopy for screen
  const copy = require("../copy.json").personalSettingsScreen;

  //Status for modal visability
  const [modalVisible, setModalVisible] = useState(false);

  //Data variables for screen
  const [userName, setUserName] = useState();
  const [weight, setWeight] = useState("");
  const [workoutTime, setWorkoutTime] = useState("1h 45m");
  const [diet, setDiet] = useState();
  const [climate, setClimate] = useState();
  const [theme, setTheme] = useState();
  const [workoutTimes, setWorkoutTimes] = useState();

  //Get data for screen
  const getScreenData = async () => {
    const nameData = await getData("@userName");
    setUserName(nameData);
    const weightData = await getData("@userWeight");
    setWeight(weightData);
    const workoutData = await getData("@userWorkout");
    setWorkoutTime(workoutData);
    const dietData = await getData("@userDiet");
    setDiet(dietData);
    const climateData = await getData("@userClimate");
    setClimate(climateData);
    const themeData = await getTheme();
    setTheme(themeData);
  }

  //Render on mount
  useEffect(() => {
    //Get data for screen
    getScreenData();
    //Generate parsed array of times from 0-5 hours and 15 minute intervals and save as workoutTimes
    generateTimes(5, setWorkoutTimes);
  }, []);

  //Save the data to async storage (local storage) from the inputs
  const saveData = async () => {
    setData("@userName", userName);
    setData("@userWeight", weight);
    setData("@userWorkout", workoutTime);
    setData("@userDiet", diet);
    setData("@userClimate", climate);
  }

  return (
    <SafeAreaView>
    <ScrollView style={theme ? styles(theme).main : ""}>
      <Header theme={theme}/>
      <Heading title={copy.title} subTitle={copy.subtitle} navigation={navigation} theme={theme}/>
      <View style={theme ? styles(theme).inputSection : ""}>
        <View style={theme ? styles(theme).inputWrapper : ""}>
          <Text style={theme ? styles(theme).inputTitle : ""}>{copy.inputs.name}</Text>
          <TextInput
          style={theme ? styles(theme).input : ""}
          onChangeText={setUserName}
          value={userName}
          />
        </View>
        <View style={theme ? styles(theme).inputWrapper : ""}>
          <Text style={theme ? styles(theme).inputTitle : ""}>{copy.inputs.weight}</Text>
          <DismissableKeypadView onChange={setWeight} value={weight.toString()} inputStyle={theme ? styles(theme).input : ""}/>
        </View>
        <View style={theme ? styles(theme).inputWrapper : ""}>
          <Text style={theme ? styles(theme).inputTitle : ""}>{copy.inputs.workout}</Text>
          <TouchableOpacity onPress={() => {setModalVisible(true)}}>
            <View style={theme ? styles(theme).input : ""}>
              <Text style={theme ? styles(theme).selectText : ""}>{workoutTime}</Text>
              <Entypo name="select-arrows" size={24 * 0.9} color={theme ? theme.ACC_COLOR1 : "blue"}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={theme ? styles(theme).inputWrapper : ""}>
          <Text style={theme ? styles(theme).inputTitle : ""}>{copy.inputs.diet}</Text>
          <View style={theme ? styles(theme).buttonContainer : ""}>
            <Pressable onPress={() => {setDiet(true)}} style={theme ? (diet ? styles(theme).buttonActive : styles(theme).buttonInactive) : ""}>
              <Text style={theme ? (diet ? styles(theme).buttonActiveText : styles(theme).buttonInactiveText) : ""}>Yes</Text>
            </Pressable>
            <Pressable onPress={() => {setDiet(false)}} style={theme ? (diet === false ? styles(theme).buttonActive : styles(theme).buttonInactive) : ""}>
              <Text style={theme ? (diet === false ? styles(theme).buttonActiveText : styles(theme).buttonInactiveText) : ""}>No</Text>
            </Pressable>
          </View>
        </View>
        <View style={theme ? styles(theme).inputWrapper : ""}>
          <Text style={theme ? styles(theme).inputTitle : ""}>{copy.inputs.climate}</Text>
          <View style={theme ? styles(theme).buttonContainer : ""}>
          <Pressable onPress={() => {setClimate(true)}} style={theme ? (climate ? styles(theme).buttonActive : styles(theme).buttonInactive) : ""}>
              <Text style={theme ? (climate ? styles(theme).buttonActiveText : styles(theme).buttonInactiveText) : ""}>Yes</Text>
            </Pressable>
            <Pressable onPress={() => {setClimate(false)}} style={theme ? (climate === false ? styles(theme).buttonActive : styles(theme).buttonInactive) : ""}>
              <Text style={theme ? (climate === false ? styles(theme).buttonActiveText : styles(theme).buttonInactiveText) : ""}>No</Text>
            </Pressable>
          </View>
        </View>
      </View>
        <View style={theme ? styles(theme).wave : ""}/>
        <View style={theme ? styles(theme).saveBtnWrapper : ""}>
          <SaveButton save={saveData} theme={theme}/>
        </View>
      <ModalComponent modalVisible={modalVisible}>
        <SafeAreaView style={theme ? styles(theme).selectMenuContainer : ""}>
          {workoutTimes ? <SelectMenu options={workoutTimes} setState={setWorkoutTime} closeModal={setModalVisible} closeOnPress={true} theme={theme}/> : ""}
        </SafeAreaView>
      </ModalComponent>
    </ScrollView>
    </SafeAreaView>
  )
}

export default PersonalSettingsScreen;

const styles = (theme) => StyleSheet.create({
  main: {
    backgroundColor: theme.BACKGROUND_COLOR1,
  },
  inputSection: {
    backgroundColor: theme.BACKGROUND_COLOR3,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  inputWrapper: {
    marginVertical: stylingVariables.MARGIN_VERTICAL,
  },
  inputTitle: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 24,
    textTransform: "uppercase",
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
  },
  input: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 24,
    backgroundColor: theme.BACKGROUND_COLOR4,
    borderRadius: 10,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: {
    color: theme.TEXT_COLOR1,
    fontSize: 24,
  },
  selectMenuContainer: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR3,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
  },
  buttonActive: {
    width: "48%",
    backgroundColor: theme.ACC_COLOR1,
    paddingVertical: stylingVariables.PADDING,
    alignItems: "center",
    borderRadius: 20,
  },
  buttonActiveText: {
    fontSize: 32,
    color: theme.TEXT_COLOR2,
    opacity: 0.95,
  },
  buttonInactive: {
    width: "48%",
    backgroundColor: theme.BACKGROUND_COLOR4,
    paddingVertical: stylingVariables.PADDING,
    alignItems: "center",
    borderRadius: 20,
  },
  buttonInactiveText: {
    fontSize: 32,
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
  },
  wave: {
    backgroundColor: theme.BACKGROUND_COLOR2,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  saveBtnWrapper: {
    backgroundColor: theme.BACKGROUND_COLOR2,
  }
});