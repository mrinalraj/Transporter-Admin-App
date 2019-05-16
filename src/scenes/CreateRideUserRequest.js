import React, { Component } from 'react'
import { View, ScrollView, TextInput, Picker, StyleSheet, KeyboardAvoidingView, Text } from 'react-native'
import Colors from '../res/Colors'
import { Title, Subheading, Button, } from 'react-native-paper'
import Dimens from '../res/Dimens'
import NavBar from '../components/NavBar';
import FooterButton from '../components/FooterButton';

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
                <ScrollView contentContainerStyle={{ flexGrow: 2, padding: Dimens.padding / 2, paddingTop: Dimens.padding / 4 }}>
                    <KeyboardAvoidingView behavior='position'>
                        <Subheading style={{ color: Colors.White }}>Create a ride with the following details</Subheading>
                        <View style={{ marginTop: 10, }}>
                            <Text style={Styles.labelText}>Truck Name</Text>
                            <View style={{ backgroundColor: Colors.White, paddingRight: 10, paddingLeft: 10, borderRadius: 4, marginBottom: 20 }}>
                                <Picker style={{ margin: -4, marginStart: -8, marginEnd: -8 }}>
                                    {this.renderList()}
                                </Picker>
                            </View>
                            <Text style={Styles.labelText}>Pickup Location</Text>
                            <TextInput placeholder="Pickup Location" editable={false} value={this.state.from.place} style={Styles.inputStyle}></TextInput>
                            <Text style={Styles.labelText}>Drop Location</Text>
                            <TextInput placeholder="Drop Location" editable={false} value={this.state.to.place} style={Styles.inputStyle}></TextInput>
                            <Text style={Styles.labelText}>Pickup Date</Text>
                            <TextInput placeholder="Pickup Date" editable={false} value={this.state.to.time} style={Styles.inputStyle} value={this.state.time}></TextInput>
                            <Text style={Styles.labelText}>Drop Date</Text>
                            <TextInput placeholder="Drop Date" editable={false} style={Styles.inputStyle} value={this.state.time}></TextInput>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>

                <FooterButton name="Create" icon="check" cta={() => { }} />
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