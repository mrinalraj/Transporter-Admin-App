import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from '../res/Colors';
import NavBar from '../components/NavBar'
import VehiclesList from '../components/VehiclesList'
import Dimens from '../res/Dimens';

class Vehicles extends Component {
    state = {

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title="Vehicles List" />
                <View style={{ padding: Dimens.padding / 2 }}>
                    <VehiclesList />
                </View>
            </View>
        );
    }
}

export default Vehicles