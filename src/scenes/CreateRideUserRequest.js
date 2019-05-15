import React, { Component } from 'react'
import { View, ScrollView, TextInput, Picker, StyleSheet, KeyboardAvoidingView, Text } from 'react-native'
import Colors from '../res/Colors'
import { Title, Subheading, Button, } from 'react-native-paper'
import Dimens from '../res/Dimens'
import NavBar from '../components/NavBar';

class CreateRideUserRequest extends Component {
    state = {
        ...this.props.data
    }

    renderList = () => {
        let vals = ['truck1', 'truck2', 'truck3', 'truck4']
        return vals.map((t, i) => <Picker.Item key={i} value={t} label={t} />)
    }

    componentDidMount() {
        // ToastAndroid.show(JSON.stringify(this.state), ToastAndroid.SHORT)
    }


    render() {
        return (
            <View style={{ backgroundColor: Colors.primaryColor, flex: 1, }}>
                <NavBar title="Create Ride" />
                <View style={{ padding: Dimens.padding / 2 }}>

                    {/* <View style={{ backgroundColor: Colors.primaryColor, height: Dimens.statusBarHeight }} /> */}
                    {/* <Title style={{ color: Colors.White }}>Create ride</Title> */}
                    <Subheading style={{ color: Colors.White }}>Create a ride with the following details</Subheading>
                    <KeyboardAvoidingView behavior='position'>
                        <ScrollView style={{ flexGrow: 2, marginTop: 20 }}>
                            <Text style={Styles.labelText}>Truck Name</Text>
                            <View style={{ backgroundColor: Colors.White, paddingRight: 10, paddingLeft: 10, borderRadius: 4, marginBottom: 20 }}>
                                <Picker >
                                    {this.renderList()}
                                </Picker>
                            </View>
                            <Text style={Styles.labelText}>Pickup Location</Text>
                            <TextInput placeholder="Pickup Location" editable={false} value={this.state.from.place} style={Styles.inputStyle}></TextInput>
                            <Text style={Styles.labelText}>Drop Location</Text>
                            <TextInput placeholder="Drop Location" editable={false} value={this.state.to.place} style={Styles.inputStyle}></TextInput>
                            <Text style={Styles.labelText}>Pickup Date</Text>
                            <TextInput placeholder="Pickup Date" editable={true} value={this.state.to.time} style={Styles.inputStyle}></TextInput>
                            <Text style={Styles.labelText}>Drop Date</Text>
                            <TextInput placeholder="Drop Date" editable={true} style={Styles.inputStyle}></TextInput>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Button color={Colors.muteTextColor} mode='contained' icon='check' style={{ marginTop: 60, width: Dimens.windowWidth * 0.4, backgroundColor: Colors.accentColor, }}>{'Create'.toUpperCase()}</Button>
                            </View>

                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
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

export default CreateRideUserRequest