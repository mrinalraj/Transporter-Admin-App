import React from 'react'
import { View, Text, Picker, TextInput, StyleSheet, Alert } from 'react-native'
import Colors from '../res/Colors'
import CountryCode from '../res/CountryCode'
import RoundButton from './RoundButton'
import { BASE_API } from '../res/Constants'
import CustomStyles from '../res/CustomStyles'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'

class SignupForm extends React.Component {
    state = {
        countryCode: '',
        passwordMatch: true
    };

    componentDidMount() {
        fetch('http://ip-api.com/json/')
            .then(res => res.json())
            .then(data => {
                let cc = data.countryCode
                CountryCode.forEach(e => {
                    if (e.iso2 === cc) {
                        return this.setState({ countryCode: e.code })
                    }
                })
            })
            .catch(err => {
                Alert.alert(err)
            })
    }

    renderList = () => {
        return CountryCode.map(country => <Picker.Item key={country.iso2} label={`${country.name} (+${country.code})`} value={country.code
        } />)
    }

    afterSignup = response => {
        if (response.error) {
            let errCode = response.error.errorCode
            let errMsg = response.error.message
        }
        else {
            let accessToken = response.data.payload
            Alert.alert('response', JSON.stringify(accessToken))
        }
    }

    dummyHandleSignup = () => {
        Actions.OtpScreen({ onBack: () => null })
    }

    handleSignup = () => {
        const dataClone = Object.assign({}, this.state)
        delete dataClone.passwordMatch
        delete dataClone.countryCode
        axios.post(`${BASE_API}/transporter/signup`, dataClone)
            .then(response => {
                this.afterSignup(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <View>
                <Text style={CustomStyles.headText}>{`New here?\nlets get you onboard.`}</Text>

                <Picker
                    style={Styles.picker}
                    selectedValue={this.state.countryCode}
                    onValueChange={(itemValue, itemIndex) => this.setState({ countryCode: itemValue })}>
                    {this.renderList()}
                </Picker>
                <TextInput
                    onChangeText={text => this.setState({
                        contactNo: text
                    })}
                    placeholder="Phone Number"
                    keyboardType='number-pad'
                    returnKeyType="next"
                    onSubmitEditing={() => { this.emailInput.focus() }}
                    blurOnSubmit={false}
                    style={Styles.inputStyle}
                />
                <TextInput
                    onChangeText={text => this.setState({
                        email: text
                    })}
                    placeholder="Email"
                    keyboardType="email-address"
                    style={Styles.inputStyle}
                    ref={input => this.emailInput = input}
                    returnKeyType="next"
                    onSubmitEditing={() => { this.nameInput.focus() }}
                    blurOnSubmit={false} />
                <TextInput
                    onChangeText={text => this.setState({
                        name: text
                    })}
                    placeholder="Full name"
                    style={Styles.inputStyle}
                    ref={input => this.nameInput = input}
                    returnKeyType="next"
                    onSubmitEditing={() => { this.passwordInput.focus() }}
                    blurOnSubmit={false} />
                <TextInput
                    onChangeText={text => this.setState({
                        password: text
                    })}
                    placeholder="Password"
                    secureTextEntry={true}
                    style={Styles.inputStyle}
                    ref={input => this.passwordInput = input}
                    returnKeyType="next"
                    onSubmitEditing={() => { this.passwordConfirmInput.focus() }}
                    blurOnSubmit={false} />
                <TextInput
                    onChangeText={text => {
                        this.setState({ passwordMatch: this.state.password === text })
                    }}
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    style={Styles.inputStyle}
                    ref={input => this.passwordConfirmInput = input}
                    returnKeyType="done"
                    onSubmitEditing={() => { this.handleSignup }}
                    blurOnSubmit={false} />
                <Text
                    style={{ color: Colors.warningRed, fontSize: 12 }}>
                    {this.state.passwordMatch ? '' : 'Passwords do not match'}</Text>
                <Text style={{ marginTop: 40, textAlign: 'center', color: Colors.textColor }}>{`We will send a one time password\ncarrier rates may apply.`}</Text>
                <RoundButton handleClick={this.dummyHandleSignup} />
            </View>
        );
    }
}


const Styles = StyleSheet.create({

    picker: {
        margin: -8,
        marginTop: 40,
    },
    inputStyle: {
        marginTop: 35,
        paddingBottom: 3,
        fontSize: 15,
        borderBottomColor: Colors.blackColor,
        borderBottomWidth: 1.5,
        letterSpacing: 0.5,
    },
})

export default SignupForm