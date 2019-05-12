import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, ToastAndroid, Alert } from 'react-native'
import Dimens from '../res/Dimens'
import TruckListing from '../components/TruckListing'
import { SecureStore } from 'expo'
import { ACCESS_TOKEN } from '../res/Constants'
import { Actions, } from 'react-native-router-flux';
import Colors from '../res/Colors';
import { IconButton } from 'react-native-paper';


class Home extends Component {
    state = {

    }

    list = [
        {
            from: {
                place: 'New Delhi',
                subplace: 'Okhla'
            },
            to: {
                place: 'Hyderabad',
                subplace: 'Hyderabad',
            },
            truckType: 'container',
            size: '32 ft sxl',
            time: '8 AM Tommorow',
            itemType: 'Electronic goods',
            rate: 49000
        },
        {
            from: {
                place: 'Roorkee',
                subplace: 'Adarsh Nagar'
            },
            to: {
                place: 'Dehradun',
                subplace: 'Dehradun',
            },
            truckType: 'container',
            size: '12 ft sxl',
            time: '10 AM Tommorow',
            itemType: 'Machine parts',
            rate: 49000
        },
        {
            from: {
                place: 'Roorkee',
                subplace: 'Adarsh Nagar'
            },
            to: {
                place: 'Dehradun',
                subplace: 'Dehradun',
            },
            truckType: 'container',
            size: '12 ft sxl',
            time: '10 AM Tommorow',
            itemType: 'Machine parts',
            rate: 49000
        },
        {
            from: {
                place: 'Roorkee',
                subplace: 'Adarsh Nagar'
            },
            to: {
                place: 'Dehradun',
                subplace: 'Dehradun',
            },
            truckType: 'container',
            size: '12 ft sxl',
            time: '10 AM Tommorow',
            itemType: 'Machine parts',
            rate: 49000
        },
        {
            from: {
                place: 'Roorkee',
                subplace: 'Adarsh Nagar'
            },
            to: {
                place: 'Dehradun',
                subplace: 'Dehradun',
            },
            truckType: 'container',
            size: '12 ft sxl',
            time: '10 AM Tommorow',
            itemType: 'Machine parts',
            rate: 49000
        },
        {
            from: {
                place: 'Roorkee',
                subplace: 'Adarsh Nagar'
            },
            to: {
                place: 'Dehradun',
                subplace: 'Dehradun',
            },
            truckType: 'container',
            size: '12 ft sxl',
            time: '10 AM Tommorow',
            itemType: 'Machine parts',
            rate: 49000
        }
    ]

    async componentDidMount() {
        let accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN)
        if (accessToken == null) {
            Actions.replace('Login')
        }
    }
    cardPressed = e => {
        this.setState({
            currentCard: e
        }, Alert.alert('', 'Are you sure you want to accept the request', [
            {
                text: 'Yes',
                onPress: () => Actions.CreateRideUserRequest({ data: e })
                // ToastAndroid.show(JSON.stringify(e), ToastAndroid.SHORT)
            },
            {
                text: "No",
                onPress: () => ToastAndroid.show('no pressed', ToastAndroid.SHORT)
            }
        ],
            { cancelable: false }
        ))
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <View style={{ backgroundColor: Colors.primaryColor, height: Dimens.statusBarHeight }} />
                <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'space-between' }}>

                    <IconButton icon='menu'
                        color={Colors.White}
                        size={25}
                        onPress={() => Actions.drawerOpen()}
                    />

                    <View style={{ backgroundColor: Colors.primaryColor, alignItems: 'center', flex: 0.8 }}>
                        <Image source={require('../../assets/ic.png')} style={{ height: 40, width: 60 }} />
                        <Text style={{ color: Colors.White, letterSpacing: 1, }}>{'Transporter'.toUpperCase()}</Text>
                    </View>

                    <View style={{ flex: 0.1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        {/* <Image source={require('../../assets/ham.png')} style={{ height: 20, width: 20 }} /> */}
                    </View>
                </View>

                <ScrollView style={Styles.rootView}>
                    {this.list.map((e, i) => <TruckListing key={i} {...e} onPress={() => this.cardPressed(e)} />)}
                </ScrollView>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    rootView: {
        padding: Dimens.padding / 2,
        flexGrow: 1
    }
})

export default Home;