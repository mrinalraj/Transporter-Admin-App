import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Colors from '../res/Colors';
import { Card, Subheading, Title, Button } from 'react-native-paper'
import Dimens from '../res/Dimens'
import moment from 'moment'

class UserRequests extends Component {
    state = {

    }

    _renderActions = () => {
        return this.props.type == 1 ?
            <Card.Actions style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => this.props.performAction(this.props._id,2)}
                    style={{ margin: 5, borderRadius: 5, flex: 0.33, textAlign: 'center', padding: 10, borderColor: Colors.primaryColor, borderWidth: 1 }}>
                    <Text>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.performAction(1)}
                    style={{ margin: 5, borderRadius: 5, flex: 0.33, textAlign: 'center', padding: 10, borderColor: Colors.primaryColor, borderWidth: 1 }}>
                    <Text>Accept</Text>
                </TouchableOpacity>
                {/* <Button icon='phone'>Call</Button>
                    <Button icon='close'>Reject</Button>
                    <Button icon='check'>Accept</Button> */}
            </Card.Actions>
            : null
    }

    render() {
        return (

            <Card style={{
                marginLeft: Dimens.padding / 2,
                width: Dimens.windowWidth - Dimens.padding - Dimens.wp('15')
            }}>
                <Card.Content>
                    <Title>{this.props.userData.name}</Title>
                    <Text>{this.props.userData.contactNo}</Text>
                    <View style={{ marginTop: 30, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, flex: 0.5, }}>{`${this.props.rideData.startAddress.address.split('/')[0]}\n${this.props.rideData.startAddress.address.split('/')[1]}`}</Text>
                        <Text style={{ fontSize: 16, flex: 0.5, textAlign: 'right' }}>{`${this.props.rideData.endAddress.address.split('/')[0]}\n${this.props.rideData.endAddress.address.split('/')[1]}`}</Text>
                    </View>
                    <Title style={{ marginTop: 30 }}>UK 07E 1235</Title>
                    <Text style={{ marginTop: 20 }}>{moment(this.props.rideData.startTime).format('MMMM Do YYYY / hh:mm:ss a')}</Text>
                    <Text style={{ marginTop: 20 }}>{moment(this.props.rideData.endTime).format('MMMM Do YYYY / hh:mm:ss a')}</Text>
                    <Text style={{ marginTop: 20 }}>{this.props.rideType}</Text>

                </Card.Content>
                {
                    this._renderActions()
                }
            </Card >
        );
    }
}

export default UserRequests;