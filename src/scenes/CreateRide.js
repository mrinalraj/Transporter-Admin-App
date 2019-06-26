import React, { Component } from 'react'
import { Text, View, Picker, ScrollView, KeyboardAvoidingView, StyleSheet, TextInput, Alert, TouchableOpacity, } from 'react-native'
import NavBar from '../components/NavBar'
import DatePicker from '../components/DatePicker'
import Dimens from '../res/Dimens'
import Colors from '../res/Colors'
import FooterButton from '../components/FooterButton';
import { SecureStore } from 'expo';
import { ACCESS_TOKEN, BASE_API } from '../res/Constants';
import Axios from 'axios';
import LoadingDialog from '../components/LoadingDialog';
import { Actions } from 'react-native-router-flux';

class CreateRide extends Component {

    state = {
        truckList: [],
        rideList: [],
        vehiclesList: [],
        pickup: {},
        drop: {}
    }

    componentDidMount() {
        this._getAvailableTrucks()
    }

    _getAvailableTrucks = async () => {
        this.setState({ loading: true })
        let accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN)
        headers = {
            accessToken
        }

        Axios.post(`${BASE_API}/listVehicle`, '', { headers })
            .then(({ data }) => {
                this.setState({ loading: false })
                if (!data.success) {
                    return alert(data.payload.error.message);
                }
                let vehiclesList = data.payload.result
                // alert(JSON.stringify(data))
                this.setState({ vehiclesList })
            }).catch(err => {
                this.setState({ loading: false })
            })
    }

    rideList = ["Full", "Share",]

    renderBreakPoints = () => {

        if (this.state.rideType == 'Share') {
            return (
                <View>
                    <Text style={Styles.labelText}>Break Points</Text>
                    <TextInput placeholder="Break Points (Comma Seperated)"
                        style={Styles.inputStyle}></TextInput>
                </View>
            )
        }
    }

    _validate = () => {
        return new Promise((resolve, reject) => {
            const { startAddress, endAddress, rideType, vehicleId, startTime, endTime } = this.state;
            (!!startTime && !!endTime && !!rideType && !!vehicleId && startAddress.location.length > 0 && endAddress.location.length > 0) ? resolve() : reject()
        })
    }

    _createRideRequest = () => {
        this._validate()
            .then(async () => {
                this.setState({ loading: true })
                const { startTime, endTime, startAddress, endAddress, vehicleId, rideType } = this.state
                    , accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN)
                Axios.post(`${BASE_API}/addRide`, { startTime, endTime, startAddress, endAddress, vehicleId, rideType }, { headers: { accessToken } })
                    .then(({ data }) => {
                        this.setState({ loading: false })
                        if (!data.success)
                            return alert(data.payload.error.message)

                        Actions.pop()
                    })
                    .catch(err => alert(err))
            })
            .catch(() => {
                alert('All fields are mandatory!')
            })
    }

    _onLocationSelect = (which, lat, long, address) => {
        this.setState({
            [which]: {
                location: [lat, long],
                address
            }
        })
        Actions.pop()
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title="Create Ride" />
                <LoadingDialog visible={this.state.loading} />
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: Dimens.padding / 2, flexGrow: 2 }}>
                    <KeyboardAvoidingView behavior='position'>
                        <Text style={Styles.labelText}>Truck Name</Text>
                        <View style={{
                            borderRadius: 4,
                            paddingRight: 10,
                            paddingLeft: 10,
                            backgroundColor: Colors.White,
                            marginBottom: 20
                        }}>
                            <Picker style={{ marginStart: -8, marginTop: -4, marginBottom: -4, marginEnd: -8 }}
                                selectedValue={this.state.truck}
                                onValueChange={(itemValue, itemIndex) => this.setState({ vehiclesId: itemValue })}>
                                {
                                    this.state.vehiclesList.map((e, i) => <Picker.Item label={e.truckNumber} key={i} value={e._id} />)
                                }
                            </Picker>
                        </View>

                        <Text style={Styles.labelText}>Type Of Ride</Text>
                        <View style={{
                            borderRadius: 4,
                            paddingRight: 10,
                            paddingLeft: 10,
                            backgroundColor: Colors.White,
                            marginBottom: 20
                        }}>
                            <Picker style={{ marginStart: -8, marginTop: -4, marginBottom: -4, marginEnd: -8 }}
                                selectedValue={this.state.rideType}
                                onValueChange={(itemValue, itemIndex) => this.setState({ rideType: itemValue })}>
                                {
                                    this.rideList.map((e, i) => <Picker.Item label={e} key={i} value={e} />)
                                }
                            </Picker>
                        </View>

                        <Text style={Styles.labelText}>Pickup Location</Text>
                        <TouchableOpacity
                            onPress={() => Actions.MapPickerCustom({ onLocationSelect: this._onLocationSelect, which: 'startAddress' })}>
                            <TextInput editable={false} placeholder="Pickup Location"
                                style={Styles.inputStyle} value={this.state.startAddress.address} ></TextInput>
                        </TouchableOpacity>

                        <Text style={Styles.labelText}>Drop Location</Text>
                        <TouchableOpacity
                            onPress={() => Actions.MapPickerCustom({ onLocationSelect: this._onLocationSelect, which: 'endAddress' })}>
                            <TextInput editable={false} placeholder="Drop Location"
                                style={Styles.inputStyle} value={this.state.endAddress.address}></TextInput>
                        </TouchableOpacity>

                        {
                            this.renderBreakPoints()
                        }

                        <DatePicker inputStyle={Styles.inputStyle} mode='datetime' label='Pickup Time' placeholder='Pickup Time' onConfirm={() => { (datetime, timestamp) => this.setState({ pickup: datetime, startTime: timestamp }) }} />
                        <DatePicker inputStyle={Styles.inputStyle} mode='datetime' label='Drop Time' placeholder='Drop Time' onConfirm={() => { (datetime, timestamp) => this.setState({ pickup: datetime, startTime: timestamp }) }} />

                    </KeyboardAvoidingView>
                </ScrollView>
                <FooterButton name='Save' icon='check' cta={this._createRideRequest} disabled={this.state.loading}/>
                <LoadingDialog visible={this.state.loading} />
            </View >
        );
    }
}

const Styles = StyleSheet.create({
    labelText: {
        fontSize: 12,
        color: Colors.White
    },
    inputStyle: {
        backgroundColor: Colors.White,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
        marginBottom: 20
    },
})

export default CreateRide