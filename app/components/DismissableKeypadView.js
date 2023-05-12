import react from "react";
import { View, TextInput, Keyboard, TouchableWithoutFeedback} from "react-native"

/*
The numralkeypad does no have a "return" key. So in order to exit the keypad this component was created
When the user presses outside the keypad, the keypad view will close
*/

const DismissableKeypadView = ({onChange, value, inputStyle}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <TextInput
        onChangeText={onChange}
        value={value}
        keyboardType={'numeric'}
        style={inputStyle}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default DismissableKeypadView;