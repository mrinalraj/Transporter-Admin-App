import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import Colors from '../res/Colors'
import { FAB } from 'react-native-paper';
import Dimens from '../res/Dimens';

const RoundButton = ({ handleClick }) => {
    return (
        <View style={{ position: 'absolute', bottom: 20, left: 0, width: Dimens.windowWidth - 80, justifyContent: 'center', alignItems: 'center', margin: 40, }}>
            <FAB icon="arrow-forward" onPress={handleClick} />
        </View>

        // <View style={{ justifyContent: "center", alignItems: "center", margin: 40 }}>
        //     <TouchableOpacity style={Styles.fabStyleBtn} onPress={handleClick}>
        //         <Image height={25} source={require('../../assets/r-arrow.png')}></Image>
        //     </TouchableOpacity>
        // </View>
    )
}

const Styles = StyleSheet.create({
    fabStyleBtn: {
        height: 70,
        width: 70,
        borderRadius: 100,
        backgroundColor: Colors.accentColor,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    }
})

export default RoundButton