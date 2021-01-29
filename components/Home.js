import React from 'react';
import {state, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Header = ({ name, openDrawer }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => openDrawer()}>
      <Ionicons name="ios-menu" size={32} color='#673C3D' />
    </TouchableOpacity>
    <Text style={{ fontSize: 18, color:'#673C3D', fontWeight: 'bold' }}>{name} </Text>
    <Text style={{ width: 50, }}></Text>
  </View>
)

const Tab = createBottomTabNavigator();
const LikedScreen = () => {
 
  return (

    
    <View style={styles.container1}>
      <Image source={require("../assets/icons/argentino.jpg")} style={{ width: "80%", height: "30%" }} resizeMode="contain" />
      
      <Text style={styles.header1}> Liked Dishes </Text>
      
    </View>
  )
}

const StarScreen = () => {
  return (
    <View style={styles.container1}>
      <Image source={require("../assets/icons/griego.jpg")} style={{ width: "80%", height: "30%" }} resizeMode="contain" />
      
      <Text style={styles.header1}> Favourite Dishes </Text>
      
    </View>
  )
}

const DishesScreen = () => {
  return (
    <View style={styles.container1}>
    <Image source={require("../assets/icons/peruano.jpg")} style={{ width: "80%", height: "30%" }} resizeMode="contain" />
    
    <Text style={styles.header1}> Restaurant Dishes </Text>
    
  </View>
  )
}





const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);



const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Header name="Home Restaurant" openDrawer={navigation.openDrawer} />

   

    <NavigationContainer >
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            switch (route.name) {
              case "Liked":
                return <Ionicons name="hand" size={size} color={'#673C3D'} />
              case "Star":
                let iconName = focused ? "star" : "star"
                return <Ionicons name={iconName} size={size} color={'#673C3D'} />
              case "Dishes":
                iconName =  "menu"
                return <Ionicons name={iconName} size={size} color={'#673C3D'} />
            }
          }
        })}
        tabBarOptions={{
          inactiveTintColor: '#673C3D',
          activeTintColor: 'red',
        }}
      >
        <Tab.Screen name="Liked" component={LikedScreen} />
        <Tab.Screen name="Star" component={StarScreen} />
        <Tab.Screen name="Dishes" component={DishesScreen} />
      </Tab.Navigator>

    </NavigationContainer>

  </View>
)
export default Home;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBE6E3",
    paddingTop:0,
    paddingLeft: 0,
    alignItems:"stretch",
    flex:1,
    
  },
  container1: {
    flex: 1,
    backgroundColor: '#EBE6E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header1: {
    fontWeight: "bold",
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 50
  },
  header:{
    width:"100%",
    height:60,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:10,
  },
 
});
