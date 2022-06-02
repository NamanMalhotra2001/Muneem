import React from 'react';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import { View, StatusBar, SafeAreaView, Text, ScrollView, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { GlobalStyles } from '../constants/styles';

const Intro = () => {
    const { width, height } = Dimensions.get('window');
    const renderSlide = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title} >{item.title}</Text>
                <LottieView
                    style={styles.animation}
                    source={item.animation}
                    autoPlay
                    loop
                >
                </LottieView>
                <Text style={styles.text}>
                    {item.text}
                </Text>
            </View>
        )
    };
    const onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        console.log('done');

    }
    const renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="check"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </View>
        );
    };
    const renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="arrow-right"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </View>
        );
    };

    const slides = [
        {
            key: 1,
            title: 'Spending too much?',
            text: "We'll help you to lower it.",
            backgroundColor: '#59b2ab',
            animation: require('../components/UI/animations/9888-money-money-money.json')
        },
        {
            key: 2,
            title: 'Want to analyse your expenses?',
            text: "We'll do that for you",
            backgroundColor: '#febe29',
            animation: require('../components/UI/animations/94586-finance.json')
        },
        {
            key: 3,
            title: 'Welcome to Muneem',
            text: "All in one solution to track and analyse your expenses",
            backgroundColor: '#febe29',
            animation: require('../components/UI/animations/73309-finance-blue.json')
        },
    ];
    return (
        <AppIntroSlider renderItem={renderSlide} data={slides} renderNextButton={renderNextButton} onDone={onDone} renderDoneButton={renderDoneButton}/>
    )
}
const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        marginTop: 100,
        fontSize: 40,
        color: GlobalStyles.colors.highlight,
    },
    text: {
        paddingHorizontal: 15,
        textAlign: 'center',
        marginTop: 10,
        fontSize: 18,

    },
    animation: {
        marginTop: 100,
    }

})
export default Intro;