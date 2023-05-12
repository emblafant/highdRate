import AsyncStorage from "@react-native-async-storage/async-storage";

//Adds leading zero
export const addLeadingZero = (num) => {
  //if the number is less than 10, turn it into a string with a leading zero
  // 6 returns 06 but 11 returns 11
  return num < 10 ?  `0${num}` : num;
}

//Navigates you too desired screen
export const handleNavigation = (screen, navigation) => {
  navigation.navigate(screen)
}

//Geneeates an array of parsed times with the interval of 15min based on amount of hours passed as argument
export const generateTimes = (hours, setTimes) => {
  //Max amount of hours
  const hoursCap = hours;
  const loopIterations = (hoursCap*4)+1; //*4 to get an interval of 15min and +1 to account for index
  const times = []; //Array to feed parsed times into

  for (i = 0; i < loopIterations; i++) {
    const allMinutes = i * 15; //Gets all minute iterations, 0, 15, 30, 45... and so on
    const hours = Math.floor(allMinutes/60); //Turns The minutes into hours, 120 min would equal 2 hours and so would 150 min
    const minutes = allMinutes%60; //Gets "left over minutes" after removing the hours, 140min would equal 20 min
    const hText = hours ? `${hours}h` : ""; //Parses text for hours if there are hours
    //Parses diffrent texts depending on the valu of hours and minutes
    let mText;
    if (minutes) {
      mText = `${minutes}m`; //If there are minutes, parse like this
      hours ? mText = " " + mText : ""; //if there are also hours, add a space before the parsed minutes
    } else if(hours) {
      mText = ""; //if there are hours but not minutes, parse minutes as an empty string
    } else {
      mText = "0m" //if there are no hours and no minutes, display "0m"
    }
    //push the parsed time to the time array
    times.push(hText + mText);
  }

  //save the array
  setTimes(times);
};

//Generate array of numbers from 0 to the argument maxAmount
export const generateAmounts = (maxAmount, setAmount) => {
  const arr = [];
  for (i = 0; i < maxAmount; i++) {
    arr.push(i + 1);
  }
  setAmount([...arr]);
}

//Convert oz to cl
export const convertToCl = (amount) => {
  return amount * 2.96;
}

//Save data to AsyncStorage(local storage)
export const setData = async (key, value) => {
  try {
    value  = JSON.stringify(value)
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.log("error" + " set " + key)
  }
}

//Get data from AsyncStorage(local storage) based on key passed as argument
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch(e) {
    console.log("error" + " get " + key)
  }
}

//Calculate amount of units user need to consume to reach ther goal based on how big the units are
export const calculateUnits = async () => {
  //Amount of liters used would like to consume each day
  const liters = await getData("@goalLiters");
  //How much one unit contains
  let unitAmount = await getData("@unitAmount");
  //Type of unit, cl or oz
  const unitType = await getData("@unitType");
  //If the unit is oz, convert to cl
  if (unitType == "oz.") {
    unitAmount = convertToCl(unitAmount);
  }
  //calculate how many units there are in the liters and round up
  const units = Math.ceil(liters/(unitAmount/100))
  //Return amount of units
  return units;
}

//Converts string of time into an int of minutes
const convertToMin = (time) => {
  const arr = time.split(" "); //If there are both hours and mins in the string, seperate them into different elements in the array
  let minutes = 0;
  arr.forEach((str) => {
    const type = str[str.length-1]; //gets the type of time in the string, minutes or hours("m" or "h");
    let num = str.replace(type, ""); //gets the amount of hours or minutes
    num = parseInt(num); //turns it into a int
    if (type == "h") {
      //If the type is h (hours) turn it into minutes by multiplying with 60
      num = num * 60;
    }
    //add it to the totala mount of minutes
    minutes += num;
  })
  return minutes;
}

//Get the date of today (YY MM DD) in milliseconds
export const getTodayDate = () => {
  const date = new Date();
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ];
  const newDate = (new Date(year, month, day + 1)); //Add one, otherwise it returns the wrong date
  const newDateMs = newDate.getTime(); // convert to milliseconds
  return newDateMs;
}

//Calculate the amount of liquid the user sho+uld consume based on the inputs in their personal settings
export const calculateIntakeAmount = (weight, workout, diet, climate) => {
  //Your weight * 0.033 is your reccomenden drinking amount in liters
  let litersWeight = parseFloat(weight) * 0.033;
  //You should add one liter for every hour you work out;
  let workoutMin = convertToMin(workout);
  let litersWorkout = workoutMin/60;
  let totalLiters = litersWeight + litersWorkout;
  //If your diet does not include vegetabled and fruit, you should drink atleast 2 liters;
  if (diet === false && totalLiters < 2) {
    totalLiters = 2;
  }
  //If you are in a hot climate you should at least drink 3 liters
  if (climate === true && totalLiters < 3) {
    totalLiters = 3;
  }

  //Round to one decimal
  totalLiters = Math.round(totalLiters * 10) / 10
  return totalLiters;
}

//Sets up Keys with default values in AsyncStorage(local storage);
export const setUpDataStorage = async () => {
  setData("@previouslyOpened", true);

  setData("@userName", "");
  setData("@userWeight", "");
  setData("@userWorkout", "0m");
  setData("@userDiet", undefined);
  setData("@userClimate", undefined);

  setData("@unitsConsumed", 0);
  setData("@streakDays", 0);
  setData("@storedDate", undefined);
  setData("@lastStreakDay", undefined);

  setData("@goalLiters", 2.7);
  setData("@unitAmount", 33);
  setData("@unitType", "cl");
  setData("@goalUnits", 0);
  
  setData("@streakEnabled", false);
  setData("@streakNotificationId, undefined")
  setData("@highContrastEnabled", false);

  setData("@streakNotificationEnabled", false);
  setData("@reminders", []);
}