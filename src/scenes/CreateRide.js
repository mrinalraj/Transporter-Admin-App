import React, { Component } from 'react'
import { Text, View, Picker, ScrollView, KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native'
import { Button } from 'react-native-paper'
import NavBar from '../components/NavBar'
import Dimens from '../res/Dimens'
import Colors from '../res/Colors'

class CreateRide extends Component {

    state = {
        truck: '---- Select Truck ----',
        rideList: '---- Select Truck ----'
    }

    truckList = ["---- Select Truck ----", "Truck 1", "Truck 2", "Truck 3", "Truck 4"]
    rideList = ["---- Select Truck ----", "Share", "Full",]

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
                <KeyboardAvoidingView behavior='position'>
                    <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: Dimens.padding / 2, flexGrow: 2 }}>
                        <Text style={Styles.labelText}>Truck Name</Text>
                        <View style={{
                            borderRadius: 4,
                            paddingRight: 10,
                            paddingLeft: 10,
                            backgroundColor: Colors.White,
                            marginBottom: 20
                        }}>
                            <Picker style={{ marginStart: -8, marginTop: -3, marginBottom: -3, marginEnd: -8 }}
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
                            <Picker style={{ marginStart: -8, marginTop: -3, marginBottom: -3, marginEnd: -8 }}
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

                        <Text style={Styles.labelText}>Pickup Time</Text>
                        <TextInput placeholder="Pickup Time"
                            style={Styles.inputStyle}></TextInput>
                        <Text style={Styles.labelText}>Drop Time</Text>
                        <TextInput placeholder="Drop Time"
                            style={Styles.inputStyle}></TextInput>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Button color={Colors.muteTextColor} mode='contained' icon='check' style={{ marginTop: 60, width: Dimens.windowWidth * 0.4, backgroundColor: Colors.accentColor, }}>{'Save'.toUpperCase()}</Button>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
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