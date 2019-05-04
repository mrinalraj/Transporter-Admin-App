import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import Colors from '../res/Colors'

const RoundButton = ({ handleClick }) => {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", margin: 40 }}>
            <TouchableOpacity style={Styles.fabStyleBtn} onPress={handleClick}>
                <Image height={25} source={require('../../assets/r-arrow.png')}></Image>
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    fabStyleBtn: {
        height: 60,
        width: 60,
        borderRadius: 100,
        backgroundColor: Colors.accentColor,
        justifyContent: "center",
        alignItems: "center"

    }
})

export default RoundButton