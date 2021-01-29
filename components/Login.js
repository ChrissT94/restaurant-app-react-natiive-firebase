import * as React from 'react';
import { Text, TextInput, View, Image, ImageBackground, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import firebase from '../database/firebase'


const imgbg = require('../assets/hamburger-895831_1280.jpg');

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: ''
    })

  }

  loginUser = (email, password, props) => {
    if (this.state.email === '' || this.state.password === '') {
      alert('Empty fields...')
    } else {
      try {
        firebase.firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {

          props.navigation.navigate('HomeDrawer')

        })
      } catch (error) {
        console.log(error.toString())
      }

    }
  }
  render() {
    return (
      <ImageBackground source={imgbg} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>

          <View style={styles.containerUserName}>
            <Icon type="font-awesome" name="user" color="gray" containerStyle={styles.icon} />
            <TextInput placeholder="Email" placeholderTextColor="gray" onChangeText={(email) => this.setState({ email })}
              style={styles.textInput} />

          </View>
          <Text></Text>
          <View style={styles.containerPassword}>
            <Icon type="entypo" name="key" color="gray" containerStyle={styles.icon} />
            <TextInput placeholder="Password" placeholderTextColor="gray" onChangeText={(password) => this.setState({ password })}
              style={styles.textInput} secureTextEntry={true} />
          </View>

          <View style={styles.containerSignIn}>
            <Text style={styles.ButtonText}
              onPress={() => this.loginUser(this.state.email, this.state.password, this.props)}> Login</Text>
          </View>

          <View style={styles.containerRegister}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Forgot your password?
                <Text style={{ color: 'red', fontWeight: 'bold' }}>  Restore</Text>
            </Text>
          </View>

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10

  },
  containerSignIn: {
    height: 60,
    marginLeft: '6%',
    marginRight: '6%',
    paddingTop: '5%'
  },
  containerUserName: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginLeft: '10%',
    marginRight: '10%',
    borderRadius: 25,

  },
  containerPassword: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginLeft: '10%',
    marginRight: '10%',
    borderRadius: 25,
    paddingTop: 2,
    paddingBottom: 10
  },
  ButtonText: {
    backgroundColor: '#E8DCC3',
    fontSize: 16,
    textAlign: "center",
    borderRadius: 25,
    padding: 10,
    paddingTop: 12,
    paddingHorizontal: 50,
    paddingBottom: 12,
    elevation: 3,
    color: '#673C3D',
    fontWeight: 'bold',
  },

  containerRegister: {
    height: 60,
    marginLeft: '6%',
    marginRight: '6%',
    alignItems: 'center',
    paddingTop: '5%'
  },
  icon: {
    flex: 1,
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: 'transparent',
    flex: 5,
    color: 'black',
    paddingLeft: 5
  }
})