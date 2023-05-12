import react from "react";
import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import Header from "../components/Header";
import Heading from "../components/Heading";
import OpenUrlLink from "../components/OpenUrlLink";

import getTheme from '../styles/theme.style';
import { stylingVariables } from '../styles/theme.style';



const ImportantInfoScreen = ({navigation}) => {
  //Get textcopy for screen
  const copy = require("../copy.json").importantInfoScreen;

  //Get and save theme for styling
  const [theme, setTheme] = useState();
  const getScreenData = async () => {
    const themeData = await getTheme();
    setTheme(themeData);
  }
  useEffect(() => {
    getScreenData()
  },[]);

  return (
    <SafeAreaView>
    <ScrollView style={theme ? styles(theme).main : ""}>
      <Header theme={theme}/>
      <Heading title={copy.title} subTitle={copy.subtitle} navigation={navigation} theme={theme}/>
      <View style={theme ? styles(theme).infoSection : ""}>
        <Text style={theme ? styles(theme).title : ""}>{copy.infoSection.title}</Text>
        <View style={theme ? styles(theme).textContainer : ""}>
          <Text style={theme ? styles(theme).text : ""}>{copy.infoSection.text1}</Text>
          <Text style={theme ? styles(theme).text : ""}>{copy.infoSection.text2}</Text>
        </View>
      </View>
      <View style={theme ? styles(theme).linkSection : ""}>
        <OpenUrlLink text={copy.linkSection.link1.title} url={copy.linkSection.link1.url} theme={theme}/>
        <OpenUrlLink text={copy.linkSection.link2.title} url={copy.linkSection.link2.url} theme={theme}/>
      </View>
      <View style={theme ? styles(theme).wave : ""}/>
    </ScrollView>
    </SafeAreaView>
  )
}

export default ImportantInfoScreen;

const styles = (theme) => StyleSheet.create({
  main: {
    backgroundColor: theme.BACKGROUND_COLOR1,
  },
  infoSection: {
    backgroundColor: theme.BACKGROUND_COLOR3,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  title: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 36,
    textTransform: "uppercase",
    marginRight: stylingVariables.MARGIN_SIDES,
    textAlign: "right",
  },
  textContainer: {
    marginVertical: stylingVariables.MARGIN_VERTICAL,
    backgroundColor: theme.BACKGROUND_COLOR4,
    borderRadius: 20,
    padding: 20,
  },
  text: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 14,
    marginVertical: stylingVariables.MARGIN_VERTICAL,
  },
  linkSection: {
    backgroundColor: theme.BACKGROUND_COLOR5,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
  wave: {
    backgroundColor: theme.BACKGROUND_COLOR1,
    paddingHorizontal: stylingVariables.PADDING_SIDES_MAIN,
    paddingVertical: stylingVariables.PADDING_VERTICAL_MAIN,
  },
});