import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Dimens from '../../res/Dimens';
import Colors from '../../res/Colors';
import { Title, Subheading, FAB } from 'react-native-paper';
import UserDetails from '../../components/UserDetails';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import NavBar from '../../components/NavBar';

class FullDetail extends Component {
    state = {
        height: 200,
        open: false,
        ...this.props.data
    }

    user = [
        {
            name: "Mrinal Raj",
            phone: "7894561230",
            status: "Pending"
        },
        {
            name: "Pankaj Dagar",
            phone: "4561230789",
            status: "Status"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
        {
            name: "Jay Kumar Singh",
            phone: "1234567890",
            status: "Stats"
        },
    ]

    onCardLayout = event => {
        let { width, height } = event.nativeEvent.layout
        this.setState({
            width, height
        })
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title="Truck Details" />
                <View style={{ padding: Dimens.padding / 2, paddingTop: 0 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Title style={{ flex: 0.5, color: Colors.White }}>{this.state.from.place}</Title>
                        <Title style={{ flex: 0.5, textAlign: 'right', color: Colors.White }}>{this.state.to.place}</Title>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Subheading style={{ flex: 0.5, color: Colors.White }}>UK 07A 3129</Subheading>
                        <Subheading style={{ flex: 0.5, textAlign: 'right', color: Colors.White }}>Truck Name</Subheading>
                    </View>
                    <Title style={{ marginTop: 20, color: Colors.White }}>User Details</Title>
                    <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true} contentContainerStyle={{ flexGrow: 2 }}>
                        {
                            this.user.map((u, i) => <UserDetails key={i} {...u} onLayout={this.onCardLayout} />)
                        }
                    </ScrollView>
                </View>
                <FAB style={{ position: 'absolute', margin: Dimens.padding / 2, bottom: 0, right: 0 }}
                    icon='map'
                    onPress={() => Actions.TruckLocationOnMap()} />
            </View >
        );
    }
}

export default FullDetail