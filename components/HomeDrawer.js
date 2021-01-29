import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack"
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase'
import { Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'
import { color } from 'react-native-reanimated';
//import HomeTapNavigation from './screens/HomeTapNavigation'



const Header =({name, openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Ionicons name="ios-menu" size={32} color='#673C3D' />
    </TouchableOpacity>
    <Text style={{ fontSize: 18, color:'#673C3D', fontWeight: 'bold' }}>{name} </Text>
    <Text style={{width:50}}></Text>
  </View>
)

const Profile = ({navigation}) => (
  <View style={styles.container}>
    <Header name="Profile" openDrawer={navigation.openDrawer}/>
    <Image source ={require("../assets/banner.png")} style={{width:"80%", height:"30%"}} resizeMode="contain"/>
    <Text style={{padding:20}}>
      PROFILE-PAGE
    </Text>
    
  </View>
)

const Friends = ({navigation}) => (
  <View style={styles.container}>
    <Header name="Friends" openDrawer={navigation.openDrawer}/>
    <Image source ={require("../assets/banner.png")} style={{width:"80%", height:"30%"}} resizeMode="contain"/>
    <Text style={{padding:20}}>
      FRIENDS-PAGE
    </Text>
    
  </View>
)
const Header1 =({name, openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Ionicons name="ios-menu" size={32} color='#673C3D' />
    </TouchableOpacity>
    <Text style={{ fontSize: 18, color:'#673C3D', fontWeight: 'bold' }}>{name} </Text>
    <Text style={{width:50}}></Text>
  </View>
)

const Logout = ({navigation}) => (
  <View style={styles.container}>
    <Header name="Logout" openDrawer={navigation.openDrawer} />
    <Image source ={require("../assets/banner.png")} style={{width:"80%", height:"30%"}} resizeMode="contain"/>
    <Text style={{padding:20}}>
      LOGOUT-PAGE
    </Text>  
    <Text title='Sign out' onPress={()=> firebase.auth().signOut()}
    style={styles.containertextBtn}
    > Cerrar Sesión</Text> 
    
  </View>
)



function Item({ item, navigate }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={()=>navigate(item.name)}>
      <Ionicons name={item.icon} size={32} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

/* Nombres de los botones del navegador */
class Sidebar extends React.Component {
  state = {
      routes:[
          {
              name:"Home",
              icon:"ios-home",
              
          },
          {
              name:"Profile",
              icon:"ios-person",
              
          },
          {
              name:"Friends",
              icon:"people"
          },
          {
              name:"Logout",
              icon:"log-out"
          },        
         
      ]
  }

  
  render(){
      return (
          <View style={styles.container}>
              <Image source={require("../assets/icon.png")} style={styles.profileImg}/>
              <Text style={{fontWeight:"bold",fontSize:16,marginTop:10}}>User Name</Text>
              <Text style={{color:"gray",marginBottom:10}}>username@gmail.com</Text>
              <View style={styles.sidebarDivider}></View>
              <FlatList
                  style={{width:"100%",marginLeft:30}}
                  data={this.state.routes}
                  renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
                  keyExtractor={item => item.name}
              />
          </View>
      )
  }
}

/* 1.- CREAMOS EL NAVEGADOR DE CAJON */
const Drawer = createDrawerNavigator(
  {
    Home:{ screen: Home},
    Profile:{ screen: Profile},
    Friends:{ screen: Friends},
    Logout:{ screen: Logout},
    //test: { screen: test}
    

  },
  {
    
    initialRouteName: "Home", /* Donde empieza la navegación */
    unmountInactiveRoutes: true, /* Destruye todas las pantallas que se van abriendo */
    headerMode: "none", /* Elimina el espacio de encabezado predeterminado */
    contentComponent: props => <Sidebar {...props} /> /* Menù de la lista de barra lateral */
  }
)

/* 3.- CREAMOS EL NAVEGADOR DE PILA */
const AppNavigator = createStackNavigator(
  {
    Drawer : {screen: Drawer},
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none",
    unmountInactiveRoutes: true
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default class HomeDrawer extends Component
{
    render(){
        return <AppContainer/>
    }
}

//xport default HomeDrawer;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#EBE6E3",
      paddingTop:0,
      paddingLeft: 0,
      alignItems:"center",
      flex:1,
  
    },
    listItem:{
        height:60,
        alignItems:"center",
        flexDirection:"row",
    },
    title:{
        fontSize:18,
        marginLeft:20
    },
    header:{
      width:"100%",
      height:60,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      paddingHorizontal:10,
      
    },
    profileImg:{
      width:80,
      height:80,
      borderRadius:40,
      marginTop:20
    },
    sidebarDivider:{
      height:1,
      width:"100%",
      backgroundColor:"red",
      marginVertical:10
    },
    containertextBtn:{
    color: '#673C3D',
    backgroundColor:'#E8DCC3',
    borderRadius:25,
    padding: 10,
    fontSize:17
    },
    
  });