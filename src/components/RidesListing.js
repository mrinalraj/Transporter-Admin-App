import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Colors from '../res/Colors'
import Dimens from '../res/Dimens'
import { Card, Button, Title, Subheading } from 'react-native-paper';

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
                                <Title>{this.state.from.place}</Title>
                                <Subheading>{this.state.from.subplace}</Subheading>
                            </View>
                            <View>
                                <Title>{this.state.to.place}</Title>
                                <Subheading>{this.state.to.subplace}</Subheading>
                            </View>
                        </View>
                        {/* start editing */}
                        <View style={{ flexDirection: 'column', borderLeftColor: Colors.muteTextColor, borderLeftWidth: 1, flex: 0.6 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, paddingBottom: 10 }}>
                                {/* <Image style={{ height: 21.4, width: 30, marginEnd: 15 }} source={require('../../assets/truck.png')} /> */}
                                <Text>{this.state.loadType}</Text>
                            </View>

                            <View style={{ padding: 20 }}>
                                <Text>{`Start Date`}</Text>
                                <Text>{`End Date`}</Text>
                            </View>

                            <View style={{ borderBottomColor: Colors.muteTextColor, borderBottomWidth: 1, flex: 1 }} />

                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, }}>
                                {/* <Image style={{ height: 21.4, width: 30, marginEnd: 15 }} source={require('../../assets/truck.png')} /> */}
                                <Text>{`Users : ${this.state.usersCount}`}</Text>
                            </View>
                        </View>
                    </View>
                    {/* end editing */}
                </Card.Content>

                <View style={{ borderBottomColor: Colors.muteTextColor, borderBottomWidth: 1, flex: 1 }} />

                <Card.Content>
                    <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 10, alignItems: 'center', justifyContent: 'space-around' }}>
                        <Text style={{ flex: 0.6 }}>{this.state.status}</Text>
                        {/* <Button style={{ flex: 0.4, justifyContent: 'flex-end' }}> View Details </Button> */}
                        <Text style={{ flex: 0.4, textAlign: "right", padding: 10, paddingRight: 0, color: Colors.primaryColor }} onPress={this.props.viewDetails}>{`View Details`.toUpperCase()}</Text>
                    </View>
                </Card.Content>
            </Card>
        );
    }
}

export default RidesListing;