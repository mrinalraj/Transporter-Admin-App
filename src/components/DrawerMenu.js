import { List, Menu } from 'react-native-paper'
import { View, Text, ToastAndroid, Alert } from 'react-native'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import Dimens from '../res/Dimens'
import { SecureStore } from 'expo'
import { ACCESS_TOKEN } from '../res/Constants'

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
            Actions[sceneKey].call()
        }

    }

    render() {
        return (
            <View style={{ flex: 2, marginTop: Dimens.statusBarHeight + 50 }}>
                <Text style={{
                    textAlign: "center",
                    fontSize: 22,
                    letterSpacing: 1,
                    marginBottom: 50
                }}>Transporter</Text>

                <List.Section>
                    <List.Item title="My Rides" onPress={() => this.navigate('MyRides')} />
                    {/* <List.Item title="My Subscription" onPress={() => this.navigate('Vehicles')} /> */}
                    <List.Item title="My Requests" onPress={() => this.navigate('MyRequests')} />
                    <List.Item title="Market Rate" onPress={() => this.navigate('MarketRate')} />
                    <List.Item title="Vehicles" onPress={() => this.navigate('Vehicles')} />
                </List.Section>
                <List.Section>
                    <List.Item title="My Profile" onPress={() => this.navigate('Profile')} />
                    <List.Item title="Change Password" onPress={() => this.navigate('ChangePassword', { changeType: 'current' })} />
                    <List.Item title="Logout" onPress={async () => {
                        Alert.alert('Are you sure?', 'Are you sure you want to logout?', [
                            {
                                text: 'Yes',
                                onPress: async () => {
                                    try {
                                        await SecureStore.deleteItemAsync(ACCESS_TOKEN)
                                        Actions.reset('Login')
                                    }
                                    catch{
                                        console.log('error')
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