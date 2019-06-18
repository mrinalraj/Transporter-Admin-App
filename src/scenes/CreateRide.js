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

    _onLocationSelect = (which, lat, lon, place) => {
        this.setState({
            [which]: {
                lat, lon, place
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
                                onValueChange={(itemValue, itemIndex) => this.setState({ truck: itemValue })}>
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
                            onPress={() => Actions.MapPickerCustom({ onLocationSelect: this._onLocationSelect, which: 'pickup' })}>
                            <TextInput editable={false} placeholder="Pickup Location"
                                style={Styles.inputStyle} value={`${this.state.pickup.place} / ${this.state.pickup.lon}`} ></TextInput>
                        </TouchableOpacity>

                        <Text style={Styles.labelText}>Drop Location</Text>
                        <TouchableOpacity
                            onPress={() => Actions.MapPickerCustom({ onLocationSelect: this._onLocationSelect, which: 'drop' })}>
                            <TextInput editable={false} placeholder="Drop Location"
                                style={Styles.inputStyle} value={this.state.drop.place}></TextInput>
                        </TouchableOpacity>

                        {
                            this.renderBreakPoints()
                        }

                        <DatePicker inputStyle={Styles.inputStyle} mode='datetime' label='Pickup Time' placeholder='Pickup Time' onConfirm={() => { }} />
                        <DatePicker inputStyle={Styles.inputStyle} mode='datetime' label='Drop Time' placeholder='Drop Time' onConfirm={() => { }} />

                    </KeyboardAvoidingView>
                </ScrollView>
                <FooterButton name='Save' icon='check' cta={() => { }} />
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