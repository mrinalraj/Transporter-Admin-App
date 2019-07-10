import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Colors from '../res/Colors'
import Dimens from '../res/Dimens'
import { Card, Button, Title, Subheading, Divider } from 'react-native-paper';
import moment from 'moment'

class RidesListing extends Component {
    state = {
        ...this.props,
    }

    render() {
        return (
            <Card style={{ marginBottom: Dimens.padding / 2 }} onPress={this.props.viewDetails}>

                <Card.Content>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: 'column', flex: 0.4 }}>
                            <View style={{ marginTop: 10, marginBottom: 60 }}>
                                <Title>{this.props.startAddress.address.split('/')[0]}</Title>
                                <Subheading>{this.props.startAddress.address.split('/')[1]}</Subheading>
                            </View>
                            <View>
                                <Title>{this.props.endAddress.address.split('/')[0]}</Title>
                                <Subheading>{this.props.endAddress.address.split('/')[1]}</Subheading>
                            </View>
                        </View>
                        {/* start editing */}
                        <View style={{ flexDirection: 'column', borderLeftColor: Colors.muteTextColor, borderLeftWidth: 1, flex: 0.6 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, paddingBottom: 10 }}>
                                {/* <Image style={{ height: 21.4, width: 30, marginEnd: 15 }} source={require('../../assets/truck.png')} /> */}
                                <Text>{this.props.rideType}</Text>
                            </View>

                            <Divider />

                            <View style={{ padding: 20 }}>
                                <Text>{moment(this.props.startTime).format('MMMM Do YYYY \n hh:mm:ss a')}</Text>
                                <Text>{moment(this.props.endTime).format('MMMM Do YYYY \n hh:mm:ss a')}</Text>
                            </View>

                            <Divider />

                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, }}>
                                {/* <Image style={{ height: 21.4, width: 30, marginEnd: 15 }} source={require('../../assets/truck.png')} /> */}
                                <Text>{`Truck type: ${this.props.truckData.truckType}`}</Text>
                            </View>
                        </View>
                    </View>

                    {/* end editing */}
                </Card.Content>

                <View style={{ borderBottomColor: Colors.muteTextColor, borderBottomWidth: 1, flex: 1 }} />

                <Card.Content>
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 0, alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text style={{ flex: 0.6 }}>{this.props.type}</Text>
                        {/* <Button style={{ flex: 0.4, justifyContent: 'flex-end' }}> View Details </Button> */}
                        <Text style={{ flex: 0.4, textAlign: "right", padding: 10, paddingRight: 0, color: Colors.primaryColor }} onPress={this.props.viewDetails}>{`View Details`.toUpperCase()}</Text>
                    </View>
                </Card.Content>
            </Card>
        );
    }
}

export default RidesListing;