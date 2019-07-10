import React, { Component } from 'react'
import { TextInput, Image, StyleSheet, View, Text, ScrollView, Picker } from 'react-native'
import Colors from '../res/Colors'
import NavBar from '../components/NavBar'
import Dimens from '../res/Dimens';
import UserRequests from '../components/UserRequests'
import LoadingDialog from '../components/LoadingDialog';
import { SecureStore } from 'expo';
import { ACCESS_TOKEN, BASE_API } from '../res/Constants';
import Axios from 'axios';

class MyRequests extends Component {
    state = {
        loading: false,
        type: 1,
        list: []
    }

    componentDidMount() {
        this._getData()
    }

    _getData = async (clear = false, page = 1) => {
        this.setState({ loading: true })
        if (clear) this.setState({ list: [] })
        const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN)
        if (!!accessToken) {
            Axios.post(`${BASE_API}/listRideRequest`, { limit: 20, page, type: this.state.type }, { headers: { accessToken } })
                .then(({ data }) => {
                    this.setState({ loading: false })
                    if (!data.success)
                        return alert(data.payload.error.message)
                    this.setState(prevState => ({ list: [...prevState.list, ...data.payload.result.data], accessToken }))
                })
        }
    }

    _performAction = (rideRequestId, action) => {
        this.setState({ loading: true })
        const { accessToken } = this.state
        Axios.post(`${BASE_API}/actionOnRideRequest`, { rideRequestId, action }, { headers: { accessToken } })
            .then(({ data }) => {
                this.setState({ loading: false })
                if (!data.success)
                    return alert(data.payload.error.message)
                this._getData(false)

            })
    }

    filters = ['Pending', 'Accepted', 'Rejected', 'Payment Done']

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title="My Requests" searchEnabled />
                {/* <View style={{ padding: Dimens.padding / 2, paddingTop: 0 }}>
                    <View style={{ backgroundColor: Colors.White, flexDirection: 'row', borderRadius: 4, justifyContent: 'center' }}>
                        <TextInput placeholder="Search" style={{ flex: 0.9, ...Styles.inputStyle }} />
                        <View style={{ flex: 0.1, justifyContent: 'center', alignContent: 'center' }}>
                            <Image source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/search.png' }} style={{ height: 20, width: 20 }} />
                        </View>
                    </View>
                </View> */}
                <View style={{
                    marginLeft: Dimens.padding / 2,
                    marginRight: Dimens.padding / 2, backgroundColor: Colors.White, borderRadius: 5
                }}>
                    <Picker
                        style={{ margin: -4, marginEnd: -11, marginStart: -5, paddingLeft: 10 }}
                        selectedValue={this.state.filter}
                        onValueChange={(itemValue, itemIndex) => this.setState({ filter: itemValue, type: itemValue }, () => this._getData(true))}>
                        {
                            this.filters.map((filter, i) => <Picker.Item key={i} label={filter} value={i + 1} />)
                        }
                    </Picker>
                </View>
                <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: Dimens.padding / 2, paddingTop: Dimens.padding / 2 }}>
                        {
                            this.state.list.map((e, i) => <UserRequests key={i} {...e} type={this.state.type} accessToken={this.state.accessToken} performAction={this._performAction} />)
                        }
                    </ScrollView>
                </View>
                <LoadingDialog visible={this.state.loading} />
            </View>
        );
    }
}
const Styles = StyleSheet.create({
    inputStyle: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
    },
})

export default MyRequests;