import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

/*
  A custom hook that handles the data in the device's local storage in order to create pesistent state
  
  Documentation: https://react-native-async-storage.github.io/async-storage/docs/api
*/

// Below are the required function definition for the API calls of updating and reading the data in the local Storag
export const getObjectData = async (key:string,initialValue:any,setValue:any) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? setValue(JSON.parse(jsonValue)) : setValue(initialValue);
    } catch (e) {
        console.log(e);
    }
};

export const storeObjectData = async (key:string,value:any) => {
try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);

} catch (e) {
    console.log(e);
}
};

export const getMyStringValue = async (key:string,initialValue:string,setValue:any) => {
  try {
    const item =  await AsyncStorage.getItem(key)
    return item != null? setValue(item) : setValue(initialValue);
  } catch(e) {
    console.log(e)
  }

  console.log('Done.')
}

export const setStringValue = async (key:string,value:string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch(e) {
    console.log(e)
  }
  
  console.log('Done.')
}

const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.log(e);
    }
  
    console.log('Done.')
  }


const useLocalStorage = (key:string, initialValue:any) => {

    const [value,setValue] = useState("");    

    useFocusEffect(
      // This function updates the states based on the data stored at the provided key each time the user loads any routes
        useCallback(() => {
          if(typeof(initialValue) == "object")
            getObjectData(key,initialValue,setValue)
          else
            getMyStringValue(key,initialValue,setValue)
        }, [])
      );

    // Use only when clearing local storage. To clear local storage comment out/remove lines 67-74. Then uncomment line 77

    // useEffect(()=>{clearAll()},[])
    return [value,setValue];
}

export default useLocalStorage;

