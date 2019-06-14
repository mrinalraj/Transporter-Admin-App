import React, { Component } from 'react'
import { Text, View, Picker, ScrollView, KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native'
import { Button } from 'react-native-paper'
import NavBar from '../components/NavBar'
import DatePicker from '../components/DatePicker'
import Dimens from '../res/Dimens'
import Colors from '../res/Colors'
import FooterButton from '../components/FooterButton';

class CreateRide extends Component {

    state = {
        truck: '---- Select Truck ----',
        rideList: '---- Select Truck ----'
    }

    truckList = ["---- Select Truck ----", "Truck 1", "Truck 2", "Truck 3", "Truck 4"]
    rideList = ["---- Select Ride ----", "Share", "Full",]

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

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title="Create Ride" />
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
                                    this.truckList.map((e, i) => <Picker.Item label={e} key={i} value={e} />)
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
                        <TextInput placeholder="Pickup Location"
                            style={Styles.inputStyle}></TextInput>
                        <Text style={Styles.labelText}>Drop Location</Text>
                        <TextInput placeholder="Drop Location"
                            style={Styles.inputStyle}></TextInput>
                        {
                            this.renderBreakPoints()
                        }

                        <DatePicker inputStyle={Styles.inputStyle} mode='datetime' label='Pickup Time' placeholder='Pickup Time' onConfirm={()=>{}}/>
                        <DatePicker inputStyle={Styles.inputStyle} mode='datetime' label='Drop Time' placeholder='Drop Time' onConfirm={()=>{}}/>
                        
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