import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Colors from '../res/Colors'
import NavBar from '../components/NavBar'
import Dimens from '../res/Dimens';
import { Title, Card } from 'react-native-paper';

class MarketRate extends Component {
    state = {}
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title='Market Rate' />
                <View style={{ padding: Dimens.padding / 2, paddingTop: 0 }}>
                    <Card>
                        <Card.Content>
                            <Text >{`Volume / Km : ₹ ${10}`}</Text>
                            <Text >{`Volume / Km : ₹ ${10}`}</Text>
                        </Card.Content>
                    </Card>
                </View>
            </View>
        );
    }
}

export default MarketRate;