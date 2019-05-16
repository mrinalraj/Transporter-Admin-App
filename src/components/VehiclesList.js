import React, { Component } from 'react'
import { View, Text, StyleSheet } from "react-native"
import Colors from '../res/Colors';
import NavBar from './NavBar';
import { Card, Button } from 'react-native-paper'
import Dimens from '../res/Dimens'

class VehiclesList extends Component {
    state = {

    }
    render() {
        return (
            <Card style={{
                flex: 1,
                marginLeft: Dimens.padding / 2,
                width: Dimens.windowWidth - Dimens.padding - Dimens.wp('15')
            }}>
                <Card.Content>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={Styles.text}>Perpouse :</Text>
                            <Text style={Styles.text}>Truck Type :</Text>
                            <Text style={Styles.text}>Truck Number</Text>
                            <Text style={Styles.text}>Registration Card</Text>
                            <Text style={Styles.text}>Insurance Recipt</Text>
                            <Text style={Styles.text}>Wheight Capacity</Text>
                            <Text style={Styles.text}>Volume Capacity</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ textAlign: 'right', ...Styles.text }}>Refrigrator</Text>
                            <Text style={{ textAlign: 'right', ...Styles.text }}>Full</Text>
                            <Text style={{ textAlign: 'right', ...Styles.text }}>UK 08A 9800</Text>
                            <Text style={{ textAlign: 'right', color: Colors.primaryColor, ...Styles.text }}>{`View`.toUpperCase()}</Text>
                            <Text style={{ textAlign: 'right', color: Colors.primaryColor, ...Styles.text }}>{`View`.toUpperCase()}</Text>
                            <Text style={{ textAlign: 'right', ...Styles.text }}>10000 Kilograms</Text>
                            <Text style={{ textAlign: 'right', ...Styles.text }}>1000 Litres</Text>
                        </View>
                    </View>
                </Card.Content>
                <Card.Actions style={{ justifyContent: 'flex-end' }}>
                    <Button icon='unfold-more'>View</Button>
                    <Button icon='edit'>Edit</Button>
                </Card.Actions>
            </Card>
        );
    }
}

const Styles = StyleSheet.create({
    text: {
        fontSize: 16,
        paddingTop: 12,
        alignItems: 'center',
        paddingBottom: 12,

    }
})

export default VehiclesList