import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../res/Colors'
import NavBar from '../components/NavBar';


class CreateVehicle extends Component {
    state = {}
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title="Create Vehicle" />
            </View>
        );
    }
}

export default CreateVehicle