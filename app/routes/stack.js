import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import StartScreen from "../screens/StartScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PersonalSettingsScreen from "../screens/PersonalSettingsScreen";
import WaterSettingsScreen from "../screens/WaterSettingsScreen";
import NotificationSettingsScreen from "../screens/NotificationSettingsScreen";
import ImportantInfoScreen from "../screens/ImportantInfoScreen";

//Stack navigator for app routing

const Stack = createNativeStackNavigator();
export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="PersonalSettings" component={PersonalSettingsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="WaterSettings" component={WaterSettingsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ImportantInfo" component={ImportantInfoScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
