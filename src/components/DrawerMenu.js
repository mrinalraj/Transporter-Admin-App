import { List, Menu } from 'react-native-paper'
import { View, Text, ToastAndroid, Alert } from 'react-native'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import Dimens from '../res/Dimens'
import { SecureStore } from 'expo'
import { ACCESS_TOKEN } from '../res/Constants'
import Colors from '../res/Colors';

class DrawerMenu extends Component {
    state = {
        active: 'first'
    }

    navigate = (sceneKey, props) => {
        const currentScene = Actions.currentScene.substr(1)

        if (currentScene == 'Home')
            Actions.jump(sceneKey, props)

        else if (currentScene == sceneKey)
            Actions.drawerClose()

        else {
            Actions.pop()
            Actions[sceneKey].call(props)
        }

    }

    render() {
        return (
            <View style={{ flex: 2, }}>
                <View style={{ paddingTop: Dimens.statusBarHeight, height: Dimens.hp('20'), justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primaryColor }}>
                    <Text style={{
                        color: Colors.White,
                        fontSize: 22,
                        letterSpacing: 1,
                    }}>Transporter</Text>
                </View>

                <List.Section>
                    <List.Item style={{ paddingTop: 5, paddingBottom: 5 }} title="My Rides" onPress={() => this.navigate('MyRides')} />
                    <List.Item style={{ paddingTop: 5, paddingBottom: 5 }} title="My Requests" onPress={() => this.navigate('MyRequests')} />
                    <List.Item style={{ paddingTop: 5, paddingBottom: 5 }} title="My Subscription" onPress={() => { }} />
                    <List.Item style={{ paddingTop: 5, paddingBottom: 5 }} title="Vehicles" onPress={() => this.navigate('Vehicles')} />
                    <List.Item style={{ paddingTop: 5, paddingBottom: 5 }} title="Market Rate" onPress={() => this.navigate('MarketRate')} />
                </List.Section>
                <List.Section>
                    <List.Item style={{ paddingTop: 5, paddingBottom: 5 }} title="My Profile" onPress={() => this.navigate('Profile')} />
                    <List.Item style={{ paddingTop: 5, paddingBottom: 5 }} title="Change Password" onPress={() => this.navigate('ChangePassword', { changeType: 'current' })} />
                    <List.Item style={{ paddingTop: 5, paddingBottom: 5 }} title="Logout" onPress={async () => {
                        Alert.alert('Are you sure?', 'Are you sure you want to logout?', [
                            {
                                text: 'Yes',
                                onPress: async () => {
                                    try {
                                        await SecureStore.deleteItemAsync(ACCESS_TOKEN)
                                        Actions.reset('Login')
                                    }
                                    catch{

                                    }
                                }
                            },
                            {
                                text: 'No',
                                onPress: () => { Actions.drawerClose() }
                            },
                        ],
                            { cancelable: false })
                    }} />
                </List.Section>
            </View>
        );
    }
}

export default DrawerMenu;