import React, { useState } from 'react'
import { View, Button, Image, Text, PixelRatio, StyleSheet, Dimensions, StatusBar, SafeAreaView, ScrollView } from 'react-native'

const WelcomeScreen = (props) => {

    const [sliderState, setSliderState] = useState({ currentPage: 0 });

    const { width, height } = Dimensions.get('window');

    const setSliderPage = (event) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage) {
            setSliderState({
                ...sliderState,
                currentPage: indexOfNextScreen,
            });
        }
    };

    const { currentPage: pageIndex } = sliderState;

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor:'#EBE6E3'}}>
                <ScrollView
                    style={{ flex: 1 }}
                    horizontal={true}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event) => {
                        setSliderPage(event);

                    }}
                >
                    <View style={{ width, height }}>
                        <Image source={require('../assets/welcome1.jpg')} style={styles.imageStyle} />
                        <View style={styles.wrapper}>
                            <Text style={styles.header}>Pasión Restaurant</Text>
                            <Text style={styles.paragraph}>A restaurant that captures the essence of its 
                            delicious food and a unique atmosphere by presenting quick links to its food
                            and drink menus.</Text>
                        </View>
                       
                    </View>
                    <View style={{ width, height }}>
                        <Image
                            source={require('../assets/welcome2.jpg')}
                            style={styles.imageStyle}
                        />
                        <View style={styles.wrapper}>
                            <Text style={styles.header}>Simplicity...</Text>
                            <Text style={styles.paragraph}>Sometimes simplicity works to your advantage, 
                            and "Pasión Restaurant" knows how to show people what they have to offer in 
                            seconds with beautiful fruit and tableware.</Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <Image
                            source={require('../assets/welcome3.jpg')}
                            style={styles.imageStyle}
                        />
                        <View style={styles.wrapper}>
                            <Text style={styles.header}>Effectiveness...</Text>
                            <Text style={styles.paragraph}>Pasión Restaurant receives a gold star for offering 
                            almost everything you need in a mobile application for this restaurant. </Text>
                        </View>
                        <View style={styles.containerButtonMain}>                            
                            <Text style={styles.containerButton} onPress={() => props.navigation.navigate('Loading')}>Done</Text>
                        </View>
                    </View>

                </ScrollView>
                <View style={styles.paginationWrapper}>
                    {Array.from(Array(3).keys()).map((key, index) => (
                        <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
                    ))}

                </View>
            </SafeAreaView>
        </>
    );



};

export default WelcomeScreen

const styles = StyleSheet.create({
    imageStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(135),
        width: '100%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 17,
        alignItems: 'center',
        paddingEnd:15,
        paddingStart: 15,
        textAlign: 'center'        
        
    },
    paginationWrapper: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        
        
    },
    containerButtonMain: {
        flex: 0,
        padding: 25,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    containerButton:{
        backgroundColor: '#E8DCC3',
        fontSize: 18,
        textAlign: "right",
        borderRadius: 24,
        padding: 12,
        paddingTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
        elevation: 3,
        color: '#673C3D'
        
    },
    paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: 'red',
        marginLeft: 10,
    },
});
