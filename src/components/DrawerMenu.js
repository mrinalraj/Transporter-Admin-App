import { List, Menu } from 'react-native-paper'
import { View, Text, ToastAndroid } from 'react-native'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux';
import Dimens from '../res/Dimens';
import { SecureStore } from 'expo'
import { ACCESS_TOKEN } from '../res/Constants';

class DrawerMenu extends Component {
    state = {
        active: 'first'
    }

    navigate = sceneKey => {
        const currentScene = Actions.currentScene.substr(1)

        if (currentScene == 'Home') {
            Actions[sceneKey].call()
        }

        if (currentScene == sceneKey) {
            ToastAndroid.show('same key, closing drawer : ' + currentScene, ToastAndroid.SHORT)
            Actions.drawerClose
        }
        else {
            ToastAndroid.show('different key, change screen', ToastAndroid.SHORT)
            Actions.pop()
            Actions[sceneKey].call()
        }

        // ToastAndroid.show(
        //     `Current Scene is ${Actions.currentScene.substr(1)} and we are jumping to ${sceneKey} , and they are ${Actions.currentScene == '_' + sceneKey ? 'similar' : 'different'}`
        //     , ToastAndroid.SHORT)
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
                    <List.Item title="My Profile" onPress={() => this.navigate('Profile')} />
                    <List.Item title="Vehicals" onPress={() => this.navigate('Vehicals')} />
                    <List.Item title="My Rides" onPress={() => this.navigate('Vehicals')} />
                    <List.Item title="My Subscription" onPress={() => this.navigate('Vehicals')} />
                    <List.Item title="My Requests" onPress={() => this.navigate('Vehicals')} />
                    <List.Item title="Market Rate" onPress={() => this.navigate('Vehicals')} />
                </List.Section>
                <List.Section>
                    <List.Item title="Logout" onPress={async () => {
                        try {
                            await SecureStore.deleteItemAsync(ACCESS_TOKEN)
                            Actions.reset('Login')
                        }
                        catch{
                            console.log('error')
                        }
                    }} />
                </List.Section>
            </View>
        );
    }
}

export default DrawerMenu;