import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import * as Progress from 'react-native-progress'

var windowWidth = (Dimensions.get('window').width)
var windowHeight = (Dimensions.get('window').height)

const SplashScreen = () => {
    return (
        <View style={styles.pageBg}>
            <View style={styles.whiteCircle} />
            <View style={styles.greenRing} />
            <View style={styles.pinkRing} />
            <View style={styles.container}>
                {/* Replace with logo */}
                <View style={{
                    height: 80,
                    width: 80,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: 100
                }} />
                <Text style={styles.bannerText}>Company Nam</Text>
                <Progress.Bar style={{ marginTop: 40 }} {...progressBar} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageBg: {
        backgroundColor: "#8A64ED",
        flex: 1,
    },
    whiteCircle: {
        width: 167,
        height: 167,
        top: -40,
        right: -60,
        position: "absolute",
        backgroundColor: '#fff',
        opacity: 0.47,
        borderRadius: 100
    },
    greenRing: {
        height: 290,
        width: 290,
        position: "absolute",
        borderRadius: 290,
        top: -30,
        left: -150,
        borderColor: '#54E7FB',
        borderWidth: 60,
    },
    pinkRing: {
        height: 295,
        width: 295,
        position: "absolute",
        borderRadius: 295,
        bottom: -130,
        right: -150,
        borderColor: '#FB62AB',
        borderWidth: 60,
    },
    container: {
        padding: windowHeight * 0.05,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerText: {
        fontSize: 30,
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
        letterSpacing: 1.7
    },
}),
    progressBar = {
        width: windowWidth * 0.7,
        height: 4,
        indeterminate: true,
        borderRadius: 0,
        borderWidth: 0,
        unfilledColor: "rgba(255,255,255,0.2)",
        color: "#FFE769"
    },
    gradient = ['#8B64ED', '#6B36F2']

export default SplashScreen;