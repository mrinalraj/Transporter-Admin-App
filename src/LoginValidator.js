import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { ACCESS_TOKEN } from './res/Constants'


class InitRouter extends Component {

    async componentDidMount() {

        try {
            const loggedInState = await SecureStore.getItemAsync(ACCESS_TOKEN)
            loggedInState !== null ? Actions.replace('HomeDrawer') : Actions.replace('Login')
        }
        catch (error) {

        }

    }

    render() {
        return (
            <View />
        )
    }
}

export default InitRouter;