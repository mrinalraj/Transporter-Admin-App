import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Dimens from '../../res/Dimens';
import Colors from '../../res/Colors';
import { Title, Subheading, FAB } from 'react-native-paper';
import UserDetails from '../../components/UserDetails';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';

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
                <View style={{ height: Dimens.statusBarHeight, backgroundColor: Colors.primaryColor }} />
                <View style={{ padding: Dimens.padding / 2, paddingBottom: 5 }}>
                    <Text style={{ fontSize: 22, color: Colors.White, marginBottom: 60, marginTop: 10 }}>Truck Details</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Title style={{ flex: 0.5, color: Colors.White }}>{this.state.from.place}</Title>
                        <Title style={{ flex: 0.5, textAlign: 'right', color: Colors.White }}>{this.state.to.place}</Title>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Subheading style={{ flex: 0.5, color: Colors.White }}>UK 07A 3129</Subheading>
                        <Subheading style={{ flex: 0.5, textAlign: 'right', color: Colors.White }}>Truck Name</Subheading>
                    </View>
                    <Title style={{ marginTop: 40, color: Colors.White }}>User Details</Title>
                </View>

                <View style={{ flex: 1, padding: Dimens.padding / 2, paddingTop: 5 }}>
                    <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true} contentContainerStyle={{ flexGrow: 2 }}>
                        {
                            this.user.map((u, i) => <UserDetails key={i} {...u} onLayout={this.onCardLayout} />)
                        }
                    </ScrollView>
                </View>
                {/* <MapView></MapView> */}
                <FAB.Group open={this.state.open}
                    icon='local-shipping'
                    onStateChange={({ open }) => this.setState({ open })}
                    onStateChange={({ open }) => this.setState({ open })}
                    actions={[
                        { icon: 'place', label: 'Live Tracking', onPress: () => { } },
                        { icon: 'map', label: 'Open Map', onPress: () => Actions.TruckLocationOnMap() }
                    ]}
                    onPress={() => {
                        if (this.state.open)
                            return this.setState({ open: false })
                        this.setState({ open: true })
                    }}></FAB.Group>
            </View >
        );
    }
}

export default FullDetail