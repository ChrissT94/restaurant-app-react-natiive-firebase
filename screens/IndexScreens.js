import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import RegisterScreen from '../components/Register';
import LoginScreen from '../components/Login';
import HomeDrawerScreen from '../components/HomeDrawer'
import WelcomeScreen from '../components/Welcome'
import LoadingScreen from './LoadingScreen'


const RootStack1 = createStackNavigator({
  HomeDrawer: {
    screen: HomeDrawerScreen,
    navigationOptions: {
      header: ()=> false
    },
  },
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: ()=> false
    },
  }, 
  Loading: {
    screen: LoadingScreen,
    navigationOptions: {
      header: ()=> false
    },
  }, 
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: () => false
    },
  },
  Login: {
    screen: LoginScreen,

  },
}, {
  initialRouteName: 'Welcome'
});


const AppStack1 = createAppContainer(RootStack1);

export default AppStack1;