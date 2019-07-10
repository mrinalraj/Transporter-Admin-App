import React, { Component } from 'react'
import { View, Text, ScrollView, Picker } from 'react-native'
import Colors from '../../res/Colors'
import Dimens from '../../res/Dimens'
import { Title, FAB } from 'react-native-paper'
import RidesListing from '../../components/RidesListing'
import { Actions } from 'react-native-router-flux';
import NavBar from '../../components/NavBar';
import FooterButton from '../../components/FooterButton';
import LoadingDialog from '../../components/LoadingDialog';
import { SecureStore } from 'expo';
import { ACCESS_TOKEN, BASE_API } from '../../res/Constants';
import Axios from 'axios';

class MyRides extends Component {
    state = {
        loading: false,
        type: 1,
        list: []
    }


    componentDidMount() {
        this._getData()
    }

    _getData = async (page = 1) => {
        this.setState({ loading: true })
        const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN)
        if (!!accessToken) {
            Axios.post(`${BASE_API}/myRides`, { limit: 20, page, type: this.state.type }, { headers: { accessToken } })
                .then(({ data }) => {
                    this.setState({ loading: false })
                    if (!data.success)
                        return alert(data.payload.error.message)
                    this.setState(prevState => ({ list: [...prevState.list, ...data.payload.result.data], accessToken }))
                })
        }
        else this.state({ loading: false })
    }

    viewDetails = e => {
        Actions.FullDetail({ ...e, accessToken: this.state.accessToken, currentType: this.state.type })
    }

    filters = ['Upcoming', "Pending", "Current", "Complete",]

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>

                <NavBar title="My Rides" />

                <View style={{
                    marginLeft: Dimens.padding / 2,
                    marginRight: Dimens.padding / 2, backgroundColor: Colors.White, borderRadius: 5
                }}>
                    <Picker
                        style={{ margin: -4, marginEnd: -11, marginStart: -5 }}
                        selectedValue={this.state.filter}
                        onValueChange={(itemValue, itemIndex) => this.setState({ filter: itemValue, type: itemIndex + 1 }, () => this._getData())}>
                        {
                            this.filters.map((filter, i) => <Picker.Item key={i} label={filter} value={i + 1} />)
                        }
                    </Picker>
                </View>

                <View style={{ flex: 1, padding: Dimens.padding / 2, paddingBottom: Dimens.footerButtonHeight, }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 2, }} showsVerticalScrollIndicator={false}>
                        {
                            this.state.list.map((e, i) => <RidesListing key={i} accessToken={this.state.accessToken} {...e} viewDetails={() => this.viewDetails(e)} type={this.state.type} />)
                        }
                    </ScrollView>
                </View>
                {/* <FAB style={{ position: 'absolute', bottom: Dimens.padding / 2, right: Dimens.padding / 2 }} label="Create Ride" icon='add' onPress={() => Actions.CreateRide()} /> */}
                <FooterButton name="Create Ride" icon="add" cta={() => Actions.CreateRide()} />
                <LoadingDialog visible={this.state.loading} />
            </View >
        );
    }
}

export default MyRides;