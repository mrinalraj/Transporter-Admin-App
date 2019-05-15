import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Colors from '../res/Colors'
import NavBar from '../components/NavBar'
import Dimens from '../res/Dimens';
import { Title } from 'react-native-paper';

class MarketRate extends Component {
    state = {}
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title='Market Rate' />
                <View style={{ padding: Dimens.padding / 2 }}>
                    <Title style={{ color: Colors.White }}>{`Volume / Km : ₹ ${10}`}</Title>
                    <Title style={{ color: Colors.White }}>{`Volume / Km : ₹ ${10}`}</Title>
                </View>
            </View>
        );
    }
}

export default MarketRate;