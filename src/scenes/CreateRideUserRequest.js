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
        let vals = ['Truck1', 'Truck2', 'Truck3', 'Truck4']
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

                            <Input label="Pickup Location" value={this.state.from.place}></Input>
                            <Input label="Drop Location" value={this.state.to.place} ></Input>
                            <Input label="Pickup Date" value={this.state.time}></Input>
                            <Input label="Drop Date" value={this.state.time}></Input>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>

                <FooterButton name="Create" icon="check" cta={() => { }} />
            </View>
        );
    }
}

const Input = ({ label, value }) => {
    return (
        <View>
            <Text style={Styles.labelText}>{label}</Text>
            <TextInput placeholder={label} editable={false} value={value} style={Styles.inputStyle}></TextInput>
        </View>
    )
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