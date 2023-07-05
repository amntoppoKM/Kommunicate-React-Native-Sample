import React from 'react';
import { Text, StyleSheet, Button, View, ScrollView, Alert, NativeModules } from 'react-native';
// import RNKommunicateChat from 'react-native-kommunicate-chat';
const settings = require('./kommunicate-settings.json');



const MainScreen = ({ navigation }) => {
    var RNKommunicateChat = NativeModules.RNKommunicateChat;

    openConversation = () => {
      console.log("Opened conversation test screen");
      var setting = {
        // "defaultAgentIds": ["amantoppo3199@gmail.com", "amantoppo@kommunicate.io"], //list of agentID
        "defaultBotIds": ["bot-e8xil"], // list of BotID
        "defaultAssignee": "amantoppo3199@gmail.com", 
        "skipRouting": true,
        // "teamId": "63773459"
        };
        // RNKommunicateChat.updateDefaultSetting(setting, (status, message) => {
        //   console.log(message);
        // });
      var lang = {
        
          'hi':'Hindi',
          'en-US': 'English',
          'ms': 'Mayasian',
          'zh-hans': 'Mandarin'
        
      };
      var speechtoTextObject = {
        'showLanguageCode': true,
        'sendMessageOnSpeechEnd': true,
        'languages': JSON.stringify(lang)
      };
        RNKommunicateChat.enableSpeechToText(speechtoTextObject, (status, message) => {
          console.log(message);
        });
        RNKommunicateChat.createSettings(JSON.stringify(settings));
        RNKommunicateChat.openConversation((status, message) => {
          if(status == 'Error') {
            console.log("Error in opening conversation : " + message);
          } else {
            console.log("Opened conversation list screen");
          }
        });
      }

      buildConversation = () => {
        let conversationObject = {
          'isSingleConversation' : true //passing true will start the same conversation everytime
         };
          RNKommunicateChat.buildConversation(conversationObject, (status, message) => {
            if(status == 'Error') {
              console.log("Error in opening conversation : " + message);
            } else {
              console.log("Opened conversation list screen");
            }
          });
        }

        openParticularConversation = () => {
          let clientChannelKey = "81550789" //pass the clientChannelKey here
          let takeOrder = true //skip chat screen on back press, pass false if you want to show chat screen on back press
                
          RNKommunicateChat.openParticularConversation(clientChannelKey, takeOrder, (response, responseMessage) => {
                  if(response == 'Error') {
                    console.log(message);
                  } else {
                    //conversation launched successfully
                  }
                });        
              }
              updateTeamId = () => {
                RNKommunicateChat.updateTeamId({
                  //'conversationId': <conversation id>,
                  'clientConversationId': '81550789',
                  'teamId': '63773459'
                },  (response, responseMessage) => {
                  if(response == 'Error') {
                    console.log(responseMessage);
                  } else {
                    console.log("updated team");
                    //conversation launched successfully
                  }
                });
              }

        closeKommunicateScreen = () => {
                          RNKommunicateChat.closeConversationScreen();

              }

      const showLogoutFailureAlert = () =>
        Alert.alert(
            "Failed to Logout",
            "Couldn't log you out. Please try again",
            [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
      );

      logout = () => {
        RNKommunicateChat.logout((response) => {
          if(response == "Success") {
            console.log("Logged out")
            // navigation.goBack()
            navigation.navigate("Login");
          } else {
            console.log("Error logging out");
            showLogoutFailureAlert()
          }
        }); 
      }
      
    return(
        <View style={style.mainView}>
          <View style={style.button}>
          <Button
                title="Launch Conversation"                
                onPress={() => openConversation()}
            />
          </View> 
          <View style={style.button}>
          <Button
                title="Conversation Builder"
                onPress={() => buildConversation()}
            />
          </View> 
          <View style={style.button}>
          <Button
                title="Open Particular Conversation"
                onPress={() => openParticularConversation()}
            />
          </View> 
          <View style={style.button}>
          <Button
                title="Update USer"
                // onPress={() => logout()}
            />
          </View> 
          <View style={style.button}>
          <Button
                title="Update CHat Context"
                // onPress={() => logout()}
            />
          </View> 
          <View style={style.button}>
          <Button
                title="Update Assignee"
                // onPress={() => logout()}
            />
          </View> 
          <View style={style.button}>
          <Button
                title="Update TeamID"
                onPress={() => updateTeamId()}
            />
          </View> 
          <View style={style.button}>
          <Button
                title="Close Kommunicate Screen"
                // onPress={() => logout()}
            />
          </View> 
          <View style={style.button}>
          <Button
                title="Logout"
                onPress={() => logout()}
            />
          </View> 
          
            
        </View>
    );
}

const style = StyleSheet.create({
    mainView: {
        marginTop:40,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        borderRadius: 5,
        marginBottom: 25,
        backgroundColor:'#1E6738',
      }
})


export default MainScreen

