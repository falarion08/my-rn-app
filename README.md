# Cast Study Project - React Native
The application is made using the Expo Router library. Expo Router is a file-based router for React Native and web applications. It allows you to manage navigation between screens in your app, allowing users to move seamlessly between different parts of your app's UI, using the same components on multiple platforms

For more information: [Introduction to Expo Router - Expo Documentation](https://docs.expo.dev/router/introduction/)

The application currently  runs on on the following versions.
| Expo SDK | ExpoRouter |
|--|--|
| 50.0| 3.0.0 |


# Instructions on Running the application

Using your smartphone (android or IOS) install the Expo Go application from the playstore or the app store. To start running the program, first navigate to the folder directory of the application and start the program. This is done by doing the following on the terminal

    cd MY-RN-APP
    npm run start

Starting the program will take some time. However, an indication that the program is already running is a QR Code will be shown on your terminal for you to scan. Using Expo Go application in your smart phone, scan the QR code.


There some situations that your device could fail to connect upon scanning the QR Code. Kindly stop the program by doing action such as `Ctrl + C`. Alternatively you could run the application by entering the following on the terminal:

`npm run alt-start` 

After some time of starting the terminal, a QR Code should also appear on your terminal. Then scan the QR code with your smart phone and it should work .



# Persistent States

The states of the user input is mainly mantained using  AsyncStorage from Expo-Router library. 

## Async Storage

AsyncStorage is an unencrypted, asynchronous, persistent, key-value storage system that is global to the app. It should be used instead of LocalStorage.

For an in-depth explanation of the usage of the library, kindly refer to the following  documentation:[Usage | Async Storage (react-native-async-storage.github.io)](https://react-native-async-storage.github.io/async-storage/docs/usage)
