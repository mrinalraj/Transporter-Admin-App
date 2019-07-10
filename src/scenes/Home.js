import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, ToastAndroid, Alert, TextInput } from 'react-native'
import Dimens from '../res/Dimens'
import TruckListing from '../components/TruckListing'
import { SecureStore } from 'expo'
import { ACCESS_TOKEN, BASE_API } from '../res/Constants'
import { Actions, } from 'react-native-router-flux'
import Colors from '../res/Colors'
import { IconButton, ActivityIndicator } from 'react-native-paper'
import LoadingDialog from '../components/LoadingDialog'
import Axios from 'axios'

const CancelToken = Axios.CancelToken,
    source = CancelToken.source()


class Home extends Component {
    state = {
        searchShown: false,
        loading: false,
        list: []
    }

    _getData = async (page = 1) => {
        this.setState({ loading: true })
        const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN)
        if (!!accessToken) {
            Axios.post(`${BASE_API}/listUserRide`, {
                limit: 15,
                page,
            }, { headers: { accessToken }, cancelToken: source.token })
                .then(async ({ data }) => {
                    this.setState({ loading: false })
                    if (!data.success)
                        return alert(data.payload.error.message)
                    return this.setState(prevState => ({ list: [...prevState.list, ...data.payload.result.data] }))

                })
                .catch(error => alert(error))
        }
    }

    componentDidMount() {
        this._getData()
    }

    componentWillUnMount() {
        source.cancel()
    }

    cardPressed = e => {
        this.setState({
            currentCard: e
        }, Alert.alert('', 'Are you sure you want to accept the request', [
            {
                text: 'Yes',
                onPress: () => Actions.CreateRide({ ...e, createType: 'userRequested' })
            },
            {
                text: "No",
                onPress: () => { this.setState({ currentCard: undefined }) }
            }
        ],
            { cancelable: false }
        ))
    }

    searchBar = () => {
        return (
            <View style={{ alignItems: 'center', marginLeft: Dimens.padding / 6, marginRight: Dimens.padding / 6, borderRadius: 5, backgroundColor: Colors.White, justifyContent: 'space-between', flexDirection: 'row' }}>
                <IconButton icon='arrow-back'
                    color={Colors.muteTextColor}
                    size={25}
                    onPress={() => this.setState({ searchShown: false })}
                />

                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 0.9 }}>
                    <TextInput ref={i => this.searchInput = i} placeholder="Search" style={{ flex: 1 }}></TextInput>
                </View>

                <IconButton icon="search"
                    color={Colors.muteTextColor}
                    size={25}
                    onPress={() => this.setState({ searchShown: true }, () => this.searchInput.focus())}
                />
            </View>
        )
    }

    topBar = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                <IconButton icon='menu'
                    color={Colors.White}
                    size={25}
                    onPress={() => Actions.drawerOpen()}
                />

                <View style={{ backgroundColor: Colors.primaryColor, alignItems: 'center', justifyContent: 'center', flex: 0.8, flexDirection: 'row' }}>
                    <Image source={require('../../assets/ic.png')} style={{ height: 30, width: 45, marginRight: 10 }} />
                    <Text style={{ color: Colors.White, letterSpacing: 1, }}>{'Transporter'.toUpperCase()}</Text>
                </View>

                <IconButton icon="search"
                    color={Colors.White}
                    size={25}
                    onPress={() => this.setState({ searchShown: true }, () => this.searchInput.focus())}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <View style={{ backgroundColor: Colors.primaryColor, height: Dimens.statusBarHeight }} />
                <View style={{ backgroundColor: Colors.primaryColor, padding: Dimens.padding / 3, }}>

                    {
                        this.state.searchShown ? this.searchBar() : this.topBar()
                    }

                </View>

                <ScrollView style={Styles.rootView}>
                    {this.state.list.map((e, i) => <TruckListing key={i} {...e} onPress={() => this.cardPressed(e)} />)}
                    {
                        this.state.loading ? <ActivityIndicator animating={true} size="small" color={Colors.accentColor} ></ActivityIndicator> : null
                    }
                </ScrollView>

            </View>
        );
    }
}

const Styles = StyleSheet.create({
    rootView: {
        padding: Dimens.padding / 2,
        paddingTop: 0,
        flexGrow: 1
    }
})

export default Home;