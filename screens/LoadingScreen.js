import React, {Component} from 'react'
import {StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import frb from '../database/firebase'

class LoadingScreen extends Component{

    componentDidMount(){
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        frb.firebase.auth().onAuthStateChanged( (user) => {
            if(user)
            {
                this.props.navigation.navigate('HomeDrawer')
            }
            else
            {
                this.props.navigation.navigate('Register')
            } 
        })
    }

    render(){

        return(

            <View style={styles.container}>
                <ActivityIndicator  size='large' on/>
            </View>
          
            
        )
    }
    
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})