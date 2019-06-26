import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Card, Avatar, Title, Subheading } from 'react-native-paper'
import Dimens from '../res/Dimens';
import Colors from '../res/Colors';
import moment from 'moment'

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
                                <Title>{this.state.startAddress.address.split('/')[0]}</Title>
                                <Subheading>{this.state.startAddress.address.split('/')[1]}</Subheading>
                            </View>
                            <View>
                                <Title>{this.state.endAddress.address.split('/')[0]}</Title>
                                <Subheading>{this.state.endAddress.address.split('/')[1]}</Subheading>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', borderLeftColor: Colors.muteTextColor, borderLeftWidth: 1, flex: 0.6 }}>
                            <View style={{ padding: 20, }}>
                                <Text>{`${moment(this.state.startTime).format('MMMM Do YYYY')} \n${moment(this.state.startTime).format('hh:mm:ss a')}`}</Text>
                            </View>

                            <View style={{ borderBottomColor: Colors.muteTextColor, borderBottomWidth: 1, flex: 1 }} />

                            <View style={{ padding: 20 }}>
                                <Text>{this.state.truckType}</Text>
                                <Text>{this.state.truckSubType}</Text>
                            </View>

                            <View style={{ borderBottomColor: Colors.muteTextColor, borderBottomWidth: 1, flex: 1 }} />

                            <View style={{ padding: 20, }}>
                                <Text>{`${moment(this.state.endTime).format('MMMM Do YYYY')} \n${moment(this.state.endTime).format('hh:mm:ss a')}`}</Text>
                            </View>
                        </View>
                    </View>
                </Card.Content>

                <View style={{ borderBottomColor: Colors.muteTextColor, borderBottomWidth: 1, flex: 1 }} />

                <Card.Content>
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: -5 }}>
                        <Text style={{ flex: 0.4 }}>Requested By:</Text>
                        <Text style={{ flex: 0.6 }}>{this.state.userData.name}</Text>
                    </View>
                </Card.Content>
            </Card>
        )
    }
}

export default TruckListing