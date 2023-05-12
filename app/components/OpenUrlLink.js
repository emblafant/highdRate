import react from "react";
import { Linking, Pressable, Text, StyleSheet } from "react-native";

import { stylingVariables } from "../styles/theme.style";

/*
  Link component for open urls
  Open urls are urls which does not require authentication
*/

const OpenUrlLink = ({text, url, theme}) => {
  //Creates link based on url prop
  const openUrl = () => {
    Linking.openURL(url)
  }

  return (
    <Pressable onPress={openUrl}>
      <Text style={theme ? styles(theme).link : ""}>{text}</Text>
    </Pressable>
  )
}

export default OpenUrlLink

const styles = (theme) => StyleSheet.create({
  link: {
    color: theme.TEXT_COLOR1,
    opacity: 0.9,
    fontSize: 16,
    marginHorizontal: stylingVariables.MARGIN_SIDES,
    marginVertical: stylingVariables.MARGIN_VERTICAL,
    textDecorationLine: "underline"
  }
})