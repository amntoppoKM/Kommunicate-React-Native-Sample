import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, NativeModules } from 'react-native';
// import RNKommunicateChat from 'react-native-kommunicate-chat';

var RNKommunicateChat = NativeModules.RNKommunicateChat;

const AirportScreen = ({ navigation }) => {
    global.appid = "eb775c44211eb7719203f5664b27b59f"

    state = {
        username: '',
        password: ''
    }

    loginUser = () => {
        var userId = this.state.username
        var email = this.state.email
        var password = this.state.password
        console.log('UserName and password cannot be empty.');
        if(userId == '' || password == '') {
          console.log('UserName and password cannot be empty.');
          return;
        }
        
        var kmUser = {
          userId : userId,
          password: password,
          applicationId : global.appid,  
          authenticationTypeId: 1,
          deviceApnsType : 0 
          };
  
          RNKommunicateChat.loginUser(kmUser, (status, message) => {
            if(status == 'Success') {
              RNKommunicateChat.isLoggedIn((response) => {
                  if(response == "True") {
                    // this.props.navigation.navigate('Home');
                    console.log("Logged in")
                    navigation.navigate('Main')
  
                  } else {
                    console.log("Error logging in")
                  }
                });
                // this.props.navigation.replace('Home');
           
            } else if (status == 'Error') {
                console.log("Error logging in : " + message);
            }
        });
    }

    const showAppidFailureAlert = () =>
        Alert.alert(
            "Failed to Login",
            "AppId is empty. Update the Update AppId & try again!!",
            [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
      );

    loginAsVisitor = () => {
        if (global.appid.length === 0) {
            showAppidFailureAlert()
        } else {
            RNKommunicateChat.loginAsVisitor(global.appid, (status, message) => {
                if(status == 'Success') {
                  RNKommunicateChat.isLoggedIn((response) => {
                      if(response == "True") {
                        console.log("Logged in" + message);
                        navigation.navigate('Main')
                      } else {
                        console.log("Error logging in : " + message);
                      }
                    });               
                } else if (obj == 'Error') {
                  console.log("Error logging in : " + message);
                }
            });
        }
      }

      logout = () => {
        RNKommunicateChat.logout((response) => {
          if(response == "Success") {
            console.log("Logged out")    
          } else {
            console.log("Error logging out");
          }
        }); 
      }

      isLogged = () => {
        RNKommunicateChat.isLoggedIn((response) => {
            if(response == "True") {
            return "Main"
            } else {
              return "Login"
            }
          });       
      }
      componentDidMount = () => {
        this.isLogged()
            .then(res => { 
                console.log("res")    
                navigation.navigate(res);
            })
            .catch(err => alert('An error occurred'))
    }
    
      
      return(<View style={styles.maincontainer}>
        <Text style={styles.title}>Airport Screen</Text>
        <View style={styles.inputcontainer}>
        <TextInput placeholder="User Name" onChangeText={(text) => {this.state.username=text}} style={styles.input}></TextInput>
        <TextInput secureTextEntry={true} placeholder="Password" onChangeText={(text) => {this.state.password=text}} style={styles.input}></TextInput>
        </View>
        
        <Text style={styles.privacytext}></Text>
      </View>);
        
    // );
}

const style = StyleSheet.create({
    mainView: {
        marginTop:40,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maincontainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      padding: 20 
    },
    title: {
      marginTop: 30,
      textAlign: "center", 
      color: 'rgb(85,83,183)',
       fontWeight:"bold",
      fontSize: 20
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      padding : 0,
      marginVertical:16,
      fontSize: 16,
    },
    inputcontainer: {
      marginTop: 50, 
      alignItems: 'stretch',
    },
    buttoncontainer: {
      marginTop: 50,
    },
    infotext: {
      textAlign: "center",
      fontSize: 12,
      color: 'grey',
      marginStart: 6,
      marginEnd: 6,
      marginTop:25
    }, 
    privacytext: {
      
    },
    button: {
      borderRadius: 30,
      marginBottom: 8,
      marginTop:8,
    }
  });


export default AirportScreen