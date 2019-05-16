import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Card, Avatar, Title, Subheading } from 'react-native-paper'
import Dimens from '../res/Dimens';
import Colors from '../res/Colors';

class TruckListing extends Component {
    state = {
        ...this.props,
    }

    render() {
        return (
            <Card style={{ marginBottom: Dimens.padding / 2 }} onPress={this.props.onPress}>

                <Card.Content>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: 'column', flex: 0.4 }}>
                            <View style={{ marginTop: 10, marginBottom: 60 }}>
                                <Title>{this.state.from.place}</Title>
                                <Subheading>{this.state.from.subplace}</Subheading>
                            </View>
                            <View>
                                <Title>{this.state.to.place}</Title>
                                <Subheading>{this.state.to.subplace}</Subheading>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', borderLeftColor: Colors.muteTextColor, borderLeftWidth: 1, flex: 0.6 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, }}>
                                <Image style={{ height: 21.4, width: 30, marginEnd: 15 }} source={require('../../assets/truck.png')} />
                                <Text>{this.state.truckType}</Text>
                            </View>

                            <View style={{ borderBottomColor: Colors.muteTextColor, borderBottomWidth: 1, flex: 1 }} />

                            <View style={{ padding: 20 }}>
                                <Text>{this.state.size}</Text>
                                <Text>{this.state.time}</Text>
                            </View>

                            <View style={{ borderBottomColor: Colors.muteTextColor, borderBottomWidth: 1, flex: 1 }} />

                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, }}>
                                <Image style={{ height: 21.4, width: 30, marginEnd: 15 }} source={require('../../assets/truck.png')} />
                                <Text>{this.state.itemType}</Text>
                            </View>
                        </View>
                    </View>
                </Card.Content>

                <View style={{ borderBottomColor: Colors.muteTextColor, borderBottomWidth: 1, flex: 1 }} />

                <Card.Content>
                    <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: -5 }}>
                        <Text style={{ flex: 0.5 }}>Trip Rate</Text>
                        <Text style={{ flex: 0.5, textAlign: 'right' }}> Rs. {this.state.rate} </Text>
                    </View>
                </Card.Content>
            </Card>
        );
    }
}

export default TruckListing;