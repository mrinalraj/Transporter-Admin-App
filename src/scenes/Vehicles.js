import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Image } from "react-native";
import Colors from '../res/Colors';
import NavBar from '../components/NavBar'
import VehiclesList from '../components/VehiclesList'
import Dimens from '../res/Dimens'
import FooterButton from '../components/FooterButton';
import { Actions } from 'react-native-router-flux';
import LoadingDialog from '../components/LoadingDialog';
import Axios from 'axios';
import { SecureStore } from 'expo'
import { BASE_API, ACCESS_TOKEN } from '../res/Constants';
import { Title } from 'react-native-paper';

class Vehicles extends Component {
    state = {
        loading: false,
        vehicleData: []
    }



    componentDidMount() {
        this._getVehiclesList()
    }

    _getVehiclesList = async () => {
        this.setState({ loading: true })
        const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN)
        headers = {
            accessToken
        }

        Axios.post(`${BASE_API}/listVehicle`, '', { headers })
            .then(({ data }) => {
                this.setState({ loading: false })
                if (!data.success) {
                    return alert(data.payload.error.message);
                }
                let vehicleData = data.payload.result
                // alert(JSON.stringify(data))
                this.setState({ vehicleData })
            }).catch(err => {
                this.setState({ loading: false })
            })
    }

    _renderVehiclesList = () =>{
        if(this.state.vehicleData.length > 0){
            return (
                this.state.vehicleData.map((e, i) => <VehiclesList key={i} {...e} />)
            )
        }
        else{
            return (
                <Title style={{color:Colors.White, marginLeft: Dimens.padding / 2,marginRight: Dimens.padding / 2,}}>{`No vehicles added yet.\nStart By adding one below.`}</Title>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title="Vehicles List" searchEnabled />
                {/* <View style={{ padding: Dimens.padding / 2, paddingTop: 0 }}>
                    <View style={{ backgroundColor: Colors.White, flexDirection: 'row', borderRadius: 4, justifyContent: 'center' }}>
                        <TextInput placeholder="Search" style={{ flex: 0.9, ...Styles.inputStyle }} />
                        <View style={{ flex: 0.1, justifyContent: 'center', alignContent: 'center' }}>
                            <Image source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/search.png' }} style={{ height: 20, width: 20 }} />
                        </View>
                    </View>
                </View> */}
                <View>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{ paddingRight: Dimens.padding / 2 }}>
                        {
                            this._renderVehiclesList()
                        }
                    </ScrollView>
                </View>
                <LoadingDialog visible={this.state.loading} />
                <FooterButton name='Create Vehicle Listing' icon='add' cta={() => { Actions.CreateVehicle() }} />
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

export default Vehicles