import React, { Component } from 'react'
import { View, Text, } from 'react-native'
import Colors from '../res/Colors';
import NavBar from './NavBar';
import { Card, Subheading, Title, Button } from 'react-native-paper'
import Dimens from '../res/Dimens'


class UserRequests extends Component {
    state = {

    }

    render() {
        return (

            <Card style={{
                marginLeft: Dimens.padding / 2,
                width: Dimens.windowWidth - Dimens.padding - Dimens.wp('15')
            }}>
                <Card.Content>
                    <Title>Username</Title>
                    <Text>7894561230</Text>
                    <View style={{ marginTop: 30, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, flex: 0.5, }}>{`Pickup Location\nCity`}</Text>
                        <Text style={{ fontSize: 16, flex: 0.5, textAlign: 'right' }}>{`Drop Location\nCity`}</Text>
                    </View>
                    <Title style={{ marginTop: 30 }}>UK 07E 1235</Title>
                    <Text style={{ marginTop: 20 }}>{`Tommorow | 5th, April\n08:35 AM`}</Text>
                    <Text style={{ marginTop: 20 }}>{`Shared`}</Text>
                    <Text style={{ marginTop: 20 }}>{`Electronics Goods`}</Text>

                </Card.Content>
                <Card.Actions style={{ marginTop: 30, flexDirection: 'row', }}>
                    <Text style={{ margin: 5, borderRadius: 5, flex: 0.33, textAlign: 'center', padding: 10, borderColor: Colors.primaryColor, borderWidth: 1 }}>Call</Text>
                    <Text style={{ margin: 5, borderRadius: 5, flex: 0.33, textAlign: 'center', padding: 10, borderColor: Colors.primaryColor, borderWidth: 1 }}>Reject</Text>
                    <Text style={{ margin: 5, borderRadius: 5, flex: 0.33, textAlign: 'center', padding: 10, borderColor: Colors.primaryColor, borderWidth: 1 }}>Accept</Text>
                    {/* <Button icon='phone'>Call</Button>
                    <Button icon='close'>Reject</Button>
                    <Button icon='check'>Accept</Button> */}
                </Card.Actions>
            </Card >
        );
    }
}

export default UserRequests;