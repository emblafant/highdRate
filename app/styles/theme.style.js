import React from "react"
import { getData } from "../functions"

//Defualt Colors
const defaultTheme = {
  BACKGROUND_COLOR1: "#82d0d9",
  BACKGROUND_COLOR2: "#cbe7ea",
  BACKGROUND_COLOR3: "#f5f5f5",
  BACKGROUND_COLOR4: "#eeeeef",
  BACKGROUND_COLOR5: "#edf1f2",
  TEXT_COLOR1: "#534d61",
  TEXT_COLOR2: "#f5f5f5",
  TEXT_COLOR3: "#f67987",
  ACC_COLOR1: "#4ebbc7",
  ACC_COLOR2: "#b6dde1",
  ACC_COLOR3: "#bbe2e2",
  ACC_COLOR4: "#eaeaeb",
  ACC_COLOR5: "#c6e2e6",
  ACC_COLOR6: "#a3dbe1",
  ACC_COLOR7: "#e6ebed",
  ACC_COLOR8: "#d2e8eb",
  HIGHLIGHT1: "none",
}

//Colors for high contrast
const contrastTheme = {
  BACKGROUND_COLOR1: "#82d0d9",
  BACKGROUND_COLOR2: "#d2eef1",
  BACKGROUND_COLOR3: "#ffffff",
  BACKGROUND_COLOR4: "#eeeef0",
  BACKGROUND_COLOR5: "#e6fbfc",
  TEXT_COLOR1: "#000000",
  TEXT_COLOR2: "#000000",
  TEXT_COLOR3: "#000000",
  ACC_COLOR1: "#0b7e8b",
  ACC_COLOR2: "#9fc4c9",
  ACC_COLOR3: "#d2eef1",
  ACC_COLOR4: "lightGrey",
  ACC_COLOR5: "#82d0d9",
  ACC_COLOR6: "#d2eef1",
  ACC_COLOR7: "#lightGrey",
  ACC_COLOR8: "#d2eef1",
  HIGHLIGHT1: "#f57987",
}

//Variabled for common styling
export const stylingVariables = {
  PADDING_SIDES_MAIN: 15,
  PADDING_VERTICAL_MAIN: 20,
  MARGIN_SIDES: 20,
  MARGIN_VERTICAL: 5,
  MARGIN_VERTICAL2: 10,
  PADDING: 10,
}

//Function to get current theme(color scheme)
export default getTheme = async () => {
  //Get and check if highcontrast is enabled
  const highContrastEnabled = await getData("@highContrastEnabled");

  //Asign diffrent color themes depening on result
  let theme;
  if (highContrastEnabled) {
    theme = contrastTheme;
  } else {
    theme = defaultTheme;
  }
  //Return that color theme
  return theme;
}