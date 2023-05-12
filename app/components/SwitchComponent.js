import react from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

import { stylingVariables } from "../styles/theme.style";

/*
  This component is a switch component with a text and a container
  The component switch will have different styling depending on if its disabled, active or inavtive
  You can disable or enable the switch through the disabled prop
*/
const SwitchComponent = ({disabled, value, setValue, text, theme}) => {

  return (
    <View style={theme ? styles(theme).main : ""}>
        <Text style={theme ? styles(theme).text : ""}>{text}</Text>
        <Switch
        trackColor={{false: (theme ? theme.ACC_COLOR4 : "grey"), true: (theme ? theme.ACC_COLOR5 : "light-blue")}}
        thumbColor={theme ? (!disabled ? theme.ACC_COLOR1 : theme.BACKGROUND_COLOR4) : "blue"}
        ios_backgroundColor={theme ? theme.ACC_COLOR4 : "grey"}
        onValueChange={() => {setValue(!value)}}
        value={value}
        disabled={disabled}
        style={!disabled ? {opacity: 0.8} : {opacity: 0.4}}
        />
    </View>
  )
}

export default SwitchComponent

const styles = (theme) => StyleSheet.create({
  main: {
    backgroundColor: theme.BACKGROUND_COLOR4,
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