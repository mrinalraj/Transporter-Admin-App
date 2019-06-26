import React, { Component } from 'react'
import { View } from 'react-native'
import LoadingDialog from '../components/LoadingDialog'
import { ACCESS_TOKEN, BASE_API, USER_PROFILE } from '../res/Constants';
import { SecureStore } from 'expo';
import Axios from 'axios';
import { Actions } from 'react-native-router-flux';
import Colors from '../res/Colors';


class CheckLoginState extends Component {

    state = {
        loading: false
    }

    async componentDidMount() {
        this.setState({ loading: true })
        const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN)
        if (!!accessToken) {
            Axios.post(`${BASE_API}/myProfile`, '', { headers: { accessToken } })
                .then(async ({ data }) => {
                    if (!data.success)
                        return alert(data.payload.error.message)
                    await SecureStore.setItemAsync(USER_PROFILE, JSON.stringify(data.payload.result))
                    this.setState({ loading: false })
                    Actions.reset('HomeDrawer')
                })
                .catch(error => alert(error))
        }
        else {
            this.setState({ loading: false })
            Actions.reset('Login')
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <LoadingDialog visible={true} />
            </View>
        )
    }
}

export default CheckLoginState