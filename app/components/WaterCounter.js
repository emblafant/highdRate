import react from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import {Ionicons} from "@expo/vector-icons";

import { stylingVariables } from "../styles/theme.style";
/*
  This component renders waterdrop icons based on the users goal amount of unit each day
  The waterdrops that represents the consumed units will have another color to make it easy for the user to see how much they have consumed
*/

const WaterCounter = ({totalAmount, consumedAmount, theme}) => {

  //Calculations in order to recieve a "grid-looking" styling with flex-box
  const width = Dimensions.get("window").width; //Width of the device
  const containerAreaWidth = width - ((stylingVariables.PADDING_SIDES_MAIN + 10) * 2); //Width om the grid area (the widnow width - the padding and margin for the container)
  const itemsPerRow = 8; //Desired amount of items per row
  const iconWidth = (containerAreaWidth / itemsPerRow) * 0.9969 //Width of icon. * 0.9969 To account for Icon element size distortion

 return (
  <View style={theme ? styles(theme).main : ""}>
    {[...Array(totalAmount)].map((e, i) => {
      let color
      i+1 > consumedAmount ? color = (theme ? theme.ACC_COLOR2 : "") : color = (theme ? theme.ACC_COLOR1 : "");
      return <Ionicons name="water" color={color ? color : "red"} key={i} size={iconWidth}/>
    })}
</View>
 )
}
export default WaterCounter;

const styles = (theme) => StyleSheet.create({
  main: {
    backgroundColor: theme.BACKGROUND_COLOR4,
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
})