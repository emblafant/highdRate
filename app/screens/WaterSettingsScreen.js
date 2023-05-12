import react from "react";
import { useState, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Pressable } from "react-native";

import Header from "../components/Header";
import Heading from "../components/Heading";
import Calculate from "../components/Calculate";
import SelectMenu from "../components/SelectMenu";
import SaveButton from "../components/SaveButton";
import ManualEntry from "../components/ManualEntry";

import {Entypo} from "@expo/vector-icons";

import ModalComponent from "../components/ModalComponent";
import { getData, setData, generateAmounts, calculateIntakeAmount } from "../functions";

import getTheme from '../styles/theme.style';
import { stylingVariables } from '../styles/theme.style';



const WaterSettingsScreen = ({navigation}) => {
  //Get textcopy for screen
  const copy = require("../copy.json").waterSettingsScreen;

  //Screen data variables
  const [goalLiters, setGoalLiters] = useState("");
  const [unitAmount, setUnitAmount] = useState("");
  const [unitType, setUnitType] = useState("");
  const [amountOptions, setAmountOptions] = useState();
  const unitOptions = ["cl", "oz."]
  const [weight, setWeight] = useState();
  const [workout, setWorkout] = useState();
  const [diet, setDiet] = useState();
  const [climate, setClimate] = useState();
  const [theme, setTheme] = useState();
  const [calculateEnabled, setCalculateEnabled] = useState(false);

  //Get data for screen
  const getScreenData = async () => {
    const goalLitersData = await getData("@goalLiters");
    setGoalLiters(goalLitersData);
    const unitAmountData = await getData("@unitAmount");
    setUnitAmount(unitAmountData);
    const unitTypeData = await getData("@unitType");
    setUnitType(unitTypeData);
    const themeData = await getTheme();
    setTheme(themeData);
  }

  //On mount
  useEffect(() => {
    getScreenData(); //get data
    checkEnableCalculate(); //check if calculate intake is enabled
  },[]);

  //Save data from inputs
  const saveData = () => {
    setData("@goalLiters", goalLiters);
    setData("@unitAmount", unitAmount);
    setData("@unitType", unitType);
  }

  //Modal visibilty state
  const [modalVisible, setModalVisible] = useState(false);
  //Type of modal to display
  const [modalType, setModalType] = useState();

  //Show modal
  const onPressSelect = (type) => {
    setModalVisible(true);
    setModalType(type);
    //If the type is amount but there are not amount options, generate them!
    type == "amount" && !amountOptions ? generateAmounts(100, setAmountOptions) : "";
  }

  //Check if the calculate intake option is enabled
  const checkEnableCalculate = async () => {
    //Get data
    const weightData = await getData("@userWeight");
    setWeight(weightData);
    const workoutData = await getData("@userWorkout");
    setWorkout(workoutData);
    const dietData = await getData("@userDiet");
    setDiet(dietData);
    const climateData = await getData("@userClimate");
    setClimate(climateData);

    //If data exsists enable calculate, otherwise diable it
    if (weightData && workoutData && dietData != undefined && climateData != undefined) {
      setCalculateEnabled(true)
    } else {
      setCalculateEnabled(false);
    }
  }

  //Handle pressing of calculate intake button
  const handleCalculate = () => {
    //get calculated intake amount based on users weight, workout, diet and climate
    const calculatedIntake = calculateIntakeAmount(weight, workout, diet, climate);
    //Save the calculated intake
    setGoalLiters(calculatedIntake);
    setData("@goalLiters", calculatedIntake);
  };

  return (
    <SafeAreaView>
    <ScrollView style={theme ? styles(theme).main : ""}>
      <Header theme={theme}/>
      <Heading title={copy.title} subTitle={copy.subtitle} navigation={navigation} theme={theme}/>
      <View style={theme ? styles(theme).goalSection : ""}>
        <Text style={theme ? styles(theme).goalTitle : ""}>{copy.goalSection.title}</Text>
        <View style={theme ? styles(theme).goalContainer : ""}>
          <ImageBackground style={theme ? styles(theme).goalImage : ""}>
            <Text style={theme ? styles(theme).goalNumber : ""}>{goalLiters.toString()}</Text>
            <Text style={theme ? styles(theme).goalLiters : ""}>liters</Text>
          </ImageBackground>
        </View>
      </View>
      <View style={theme ? styles(theme).intakeSection : ""}>
        <Text style={theme ? styles(theme).intakeTitle : ""}>{copy.intakeSettingsSection.title}</Text>
        <Calculate enabled={calculateEnabled} calculate={handleCalculate} copy={copy.intakeSettingsSection.btn1} theme={theme}/>
        <View style={theme ? styles(theme).manualSection : ""}>
          <Pressable onPress={() => {onPressSelect("manualEntry")}} style={theme ? styles(theme).manualBtn : ""}>
            <Text style={theme ? styles(theme).manualBtnText : ""}>{copy.intakeSettingsSection.btn2.title}</Text>
          </Pressable>
          <Text style={theme ? styles(theme).manualText : ""}>{copy.intakeSettingsSection.btn2.text}</Text>
        </View>
      </View>
      <View style={theme ? styles(theme).unitSection : ""}>
        <View style={theme ? styles(theme).unitTextContainer : ""}>
          <Text style={theme ? styles(theme).unitTitle : ""}>{copy.unitsSection.title}</Text>
          <Text style={theme ? styles(theme).unitText : ""}>{copy.unitsSection.text}</Text>
        </View>
        <View style={theme ? styles(theme).unitInputWrapper : ""}>
          <TouchableOpacity onPress={() => {onPressSelect("amount")}} style={theme ? styles(theme).unitBtn1 : ""}>
            <View style={theme ? styles(theme).unitInput : ""}>
              <Text style={theme ? styles(theme).unitInputText : ""}>{unitAmount.toString()}</Text>
              <Entypo name="select-arrows" color={theme ? theme.ACC_COLOR1 : "blue"} size={24}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {onPressSelect("unit")}} style={theme ? styles(theme).unitBtn2 : ""}>
            <View style={theme ? styles(theme).unitInput : ""}>
              <Text style={theme ? styles(theme).unitInputText : ""}>{unitType}</Text>
              <Entypo name="select-arrows" color={theme ? theme.ACC_COLOR1 : "blue"} size={24}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={theme ? styles(theme).saveBtnWrapper : ""}>
          <SaveButton save={saveData} theme={theme}/>
        </View>
      <ModalComponent modalVisible={modalVisible}>
      <SafeAreaView style={theme ? styles(theme).selectMenuContainer : ""}>
          {modalType == "amount" ?
          <SelectMenu options={amountOptions} setState={setUnitAmount} closeModal={setModalVisible} closeOnPress={true} theme={theme}/> :
          modalType == "unit" ?
          <SelectMenu options={unitOptions} setState={setUnitType} closeModal={setModalVisible} closeOnPress={true} theme={theme}/> :
          <ManualEntry data={goalLiters} setData={setGoalLiters} closeModal={setModalVisible} theme={theme}/>
          } 
        </SafeAreaView>
      </ModalComponent>
    </ScrollView>
    </SafeAreaView>
  )
}

export default WaterSettingsScreen;

const styles = (theme) => StyleSheet.create({
  main: {
    backgroundColor: theme.BACKGROUND_COLOR1,
  },
  goalSection: {
    backgroundColor: theme.BACKGROUND_COLOR3,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  goalTitle: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 32,
    textAlign: "center",
  },
  goalContainer: {
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
    backgroundColor: theme.BACKGROUND_COLOR4,
    padding: stylingVariables.PADDING,
    borderRadius: 20,
    alignItems: "center",
  },
  goalImage: {
    alignItems: "center",
    backgroundColor: theme.ACC_COLOR1,
    width: 100,
    height: 130,
    borderRadius: 100,
    justifyContent: "center",
  },
  goalNumber: {
    color: theme.TEXT_COLOR2,
    opacity: 0.95,
    fontSize: 50,
  },
  goalLiters: {
    color: theme.TEXT_COLOR2,
    opacity: 0.95,
    fontSize: 20,
  },
  intakeSection: {
    backgroundColor: theme.BACKGROUND_COLOR5,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  intakeTitle: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 32,
    marginLeft: stylingVariables.MARGIN_SIDES,
  },
  manualSection: {
    marginVertical: stylingVariables.MARGIN_VERTICAL,
  },
  manualBtn: {
    backgroundColor: theme.ACC_COLOR6,
    borderRadius: 20,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
  },
  manualBtnText: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 28,
    textAlign: "center",
  },
  manualText: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 14,
    marginHorizontal: stylingVariables.MARGIN_SIDES,
  },
  unitSection: {
    backgroundColor: theme.BACKGROUND_COLOR2,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  unitTextContainer: {
    marginVertical: stylingVariables.MARGIN_VERTICAL,
    marginHorizontal: stylingVariables.MARGIN_SIDES,
  },
  unitTitle: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 32,
    textTransform: "uppercase"
  },
  unitText: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 14,
  },
  unitInputWrapper: {
    flexDirection: "row",
  },
  unitBtn1: {
    flex: 2
  },
  unitBtn2: {
    flex: 3,
    marginLeft: stylingVariables.MARGIN_SIDES,
  },
  unitInput: {
    backgroundColor: theme.BACKGROUND_COLOR3,
    borderRadius: 20,
    paddingHorizontal: stylingVariables.MARGIN_SIDES,
    paddingVertical: stylingVariables.PADDING,
    marginVertical: stylingVariables.MARGIN_VERTICAL2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  unitInputText: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    textTransform: "lowercase",
    fontSize: 24,
  },
  selectMenuContainer: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR3,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  saveBtnWrapper: {
    backgroundColor: theme.BACKGROUND_COLOR2,
  },
});