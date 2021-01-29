import * as React from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase'
import * as Facebook from 'expo-facebook';
import { Ionicons } from '@expo/vector-icons';

export default class Register extends React.Component {

  constructor(props) {
    super(props)
    this.state = ({
      userName: '',
      email: '',
      password: ''
    })
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }


  logInFb = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '630838384335243',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API

        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`No se puede conectar intentelo mas adelante: ${message}`);
    }
  }

  async loginWithFacebook() {

    //ENTER YOUR APP ID 
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('630838384335243', { permissions: ['public_profile'] })

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      })
    }
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          //googleUser.getAuthResponse().id_token);
          googleUser.idToken,
          googleUser.accessToken,
        )
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function (result) {
          //alert('Loggeado...')
          //this.props.navigation.navigate('Loading')
          firebase.database().ref('/users/' + result.user.uid)
            .set({
              gmail: result.user.email,
              profile_picture: result.additionalUserInfo.profile.picture,
              locate: result.additionalUserInfo.profile.locate,
              first_name: result.additionalUserInfo.profile.given_name,
              last_name: result.additionalUserInfo.profile.family_name

            })
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this)
    );
  };



  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        //behavior: 'web',
        androidClientId: '553664382558-2vmr6k4220bo65gflsgv1baaosvpcosl.apps.googleusercontent.com',
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result)
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  singUpUser = (email, password) => {
    if (this.state.userName === '' || this.state.email === '' || this.state.password == '') {
      alert('Empty fields...')
    } else {
      try {
        if (this.state.password.length < 6) {
          alert("Please enter at least 6 characters ...")
          return
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
        this.props.navigation.navigate('Loading')
      } catch (error) {
        alert(error)
      }

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle} >
          <Text style={styles.titleScreen}>
            REGISTER
              </Text>
        </View>

        <View style={styles.containerRegister}>
          <View style={styles.containerUserName}>
            <Icon type="font-awesome" name="user" color="gray" containerStyle={styles.icon} />
            <TextInput placeholder="Username" placeholderTextColor="gray" onChangeText={(userName) => this.setState({ userName })}
              style={styles.textInput} />
          </View>

          <View style={styles.containerPassword}>
            <Icon type="entypo" name="email" color="gray" containerStyle={styles.icon} />
            <TextInput placeholder="Email" placeholderTextColor="gray" onChangeText={(email) => this.setState({ email })}
              style={styles.textInput} />
          </View>

          <View style={styles.containerPassword}>
            <Icon type="entypo" name="key" color="gray" containerStyle={styles.icon} />
            <TextInput placeholder="Password" placeholderTextColor="gray" onChangeText={(password) => this.setState({ password })}
              style={styles.textInput} secureTextEntry={true} />
          </View>

          <View style={styles.containerSignIn}>
            <Text style={styles.buttonsSocialText1}
              onPress={() => this.singUpUser(this.state.email, this.state.password)}> Create Account</Text>
          </View>

          <View style={styles.containerStartSession}>
            <Text style={{ color: '#8E8848', fontWeight: 'bold' }}>Do you already have an account?
                <Text onPress={() => this.props.navigation.navigate('Login')}
                style={{ color: 'red', fontWeight: 'bold' }}> Sign in</Text>
            </Text>
          </View>
          <View style={{ flex: 1 }}>

            <Text style={{ flex: 1, fontSize: 17, fontWeight: 'bold', color: '#673C3D' }}>Sign with...</Text>
            <View style={styles.buttonsSocial}>
              <View style={styles.CustomButtonFb}>
              <Ionicons name='logo-facebook' size={30}></Ionicons>
              <Text backgroundColor='blue' style={styles.buttonsSocialText}
                onPress={() => this.logInFb()} > Facebook</Text>
              </View>
              <View style={styles.CustomButtonFb}>
              <Ionicons name='logo-google' size={30}></Ionicons>
              <Text backgroundColor='#59c7ff' style={styles.buttonsSocialText}
                onPress={() => this.signInWithGoogleAsync()}> Google </Text>
                </View>
            </View>
          </View>
        </View>

        <View style={styles.containerSocial}>
        </View>


      </View>
    )
  }
}

//export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#EBE6E3',
  },

  containerTitle: {
    flex: 1,
    alignItems: 'center',

  },

  titleScreen: {
    color: '#673C3D',
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: '25%'
  },
  containerRegister: {
    flex: 3,
    marginLeft: '3%',
    marginRight: '3%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  containerSocial: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: '5%'
  },
  buttonsSocial: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },

  buttonsSocialText: {
    fontSize: 18,
    textAlign: "center",
    borderRadius: 24,
    padding: 5,
    paddingTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: '#673C3D',
    fontWeight: 'bold',

  },
  buttonsSocialText1: {
    backgroundColor: '#E8DCC3',
    fontSize: 18,
    textAlign: "center",
    borderRadius: 24,
    padding: 12,
    paddingTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    elevation: 3,
    color: '#673C3D',
    fontWeight: 'bold',

  },

  containerSignIn: {
    height: 50,
    marginLeft: '12%',
    marginRight: '12%',
    marginTop: '9%',
  },



  containerStartSession: {
    height: 60,
    marginLeft: '6%',
    marginRight: '6%',
    alignItems: 'center',
  },


  containerUserName: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: '10%',
    marginRight: '10%',
    borderRadius: 25

  },
  containerPassword: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '2%',
    borderRadius: 25
  },
  containerOR: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    height: '12%',
    width: '12%',
  },
  icon: {
    flex: 1,
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: 'transparent',
    flex: 5,
    color: 'black',
    paddingLeft: '5%',
  },
  CustomButtonFb:{
    flex:1,
    flexDirection:'row',
    backgroundColor: '#E8DCC3',
    textAlign: "center",
    borderRadius: 24,
    padding: 12,
    paddingTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 0,
    elevation: 3,
  }
})