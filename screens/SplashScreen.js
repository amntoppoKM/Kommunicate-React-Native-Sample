import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, NativeModules, NativeEventEmitter } from 'react-native';
//import RNKommunicateChat from 'react-native-kommunicate-chat';
var RNKommunicateChat = NativeModules.RNKommunicateChat;


const SplashScreen = ({ navigation }) => {
    // const eventEmitter = new NativeEventEmitter(RNKommunicateChat);
    // eventEmitter.addListener("test", event => {
    //     console.log("Event happened" + event);
    // });
    console.log("before Testing event2");

    const eventEmitter = new NativeEventEmitter(RNKommunicateChat);
    const eventListener = eventEmitter.addListener("onPluginLaunch", event => {
        console.log("onPluginLaunch" );
    });
    eventEmitter.addListener("onPluginDismiss", event => {
        console.log("onPluginDismiss" );
    });
    eventEmitter.addListener("onMessageReceived", event => {
        if(event.data.includes("open airport screen")) {
            RNKommunicateChat.closeConversationScreen();
            navigation.navigate("Airport");

        }
        if(event.data.includes("Submit your details")) {
            RNKommunicateChat.updateChatContext({
                //'conversationId': <conversation id>,
                'key1': 'value1',
                'airportId': '63773459'
              },  (response, responseMessage) => {
                if(response == 'Error') {
                  console.log(responseMessage);
                } else {
                  console.log("updated chat context");
                  //conversation launched successfully
                }
              });
        }
        console.log("onMessageReceived" + event.data);
    });
    eventEmitter.addListener("onMessageSent", event => {
        if(event.data.includes("exit")) {
            RNKommunicateChat.closeConversationScreen();
        }
       
        
        console.log("onMessageSent" + event.data);
    });
    eventEmitter.addListener("onConversationResolved", event => {
        console.log("onConversationResolved" + event.data);
    });
    eventEmitter.addListener("onConversationRestarted", event => {
        console.log("onConversationRestarted" + event.data);
    });
    eventEmitter.addListener("onRichMessageButtonClick", event => {
        console.log("onRichMessageButtonClick" + event.data);
        let jsonString = JSON.parse(event.data).action;
        jsonString = jsonString.replace("KmElementModel", "");
        let actionJson = JSON.parse(jsonString);
        console.log(actionJson);
    });
    eventEmitter.addListener("onStartNewConversation", event => {
        console.log("onStartNewConversation" + event.data);
    });
    eventEmitter.addListener("onSubmitRatingClick", event => {
        console.log("onSubmitRatingClick" + event.data);
    });
    eventEmitter.addListener("onBackButtonClicked", event => {
        console.log("onBackButtonClicked" + event.data);
    });
    eventEmitter.addListener("onAttachmentClick", event => {
        console.log("onAttachmentClick" + event.data);
    });
    eventEmitter.addListener("onFaqClick", event => {
        console.log("onFaqClick" + event.data);
    });
    eventEmitter.addListener("onNotificationClick", event => {
        console.log("onNotificationClick" + event.data);
    });
    eventEmitter.addListener("onRatingEmoticonsClick", event => {
        console.log("onRatingEmoticonsClick" + event.data);
    });
    eventEmitter.addListener("onRateConversationClick", event => {
        console.log("onRateConversationClick" + event.data);
    });
    eventEmitter.addListener("onVoiceButtonClick", event => {
        console.log("onVoiceButtonClick" + event.data);
    });

       //eventListener.remove();
    RNKommunicateChat.isLoggedIn((response) => {
        if(response == "True") {
            console.log("User is already logged in")    
            navigation.navigate("Main");
            return null;
        } else {
            console.log("Moving to login Screen as user is not logged in")    
            navigation.navigate("Login");
            return null;
        }
    });       
    return null;
}


export default SplashScreen