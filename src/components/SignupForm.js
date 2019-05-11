import React from 'react'
import { View, Text, Picker, TextInput, StyleSheet, ToastAndroid, Alert, } from 'react-native'
import Colors from '../res/Colors'
import CountryCode from '../res/CountryCode'
import RoundButton from './RoundButton'
import CustomStyles from '../res/CustomStyles'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import { ACCESS_TOKEN, BASE_API, } from '../res/Constants'
import { SecureStore } from 'expo'

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
        return CountryCode.map(country => <Picker.Item key={country.iso2} label={`${country.name} (+${country.code})`} value={country.code} />)
    }

    otpSubmitAction = () => {

    }

    afterSignup = async data => {
        this.props.setVisibility(false)

        let { success, payload } = data

        if (!success) {

            let { errorCode, message } = payload.error

            Alert.alert('Error Occured', message)
        }
        else {
            let { accessToken } = payload.result

            try {
                await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken)
                Actions.replace("OtpScreen", { otpType: 'verify', accessToken: accessToken })
            }
            catch (error) {
                Alert.alert("Error Occured", "Error storing token please contact admin.")
            }

        }
    }


    handleSignup = () => {
        const dataClone = Object.assign({}, this.state)
        delete dataClone.passwordMatch
        delete dataClone.countryCode
        this.validate()
            .then(() => {
                this.props.setVisibility(true)
                axios.post(`${BASE_API}/signup`, dataClone)
                    .then(response => {
                        this.afterSignup(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                ToastAndroid.show(error[Object.keys(error)[0]], ToastAndroid.SHORT)
            })

    }

    validate = () => {
        return new Promise((resolve, reject) => {
            let { contactNo, email, name, password, passwordMatch } = this.state
            let errors = {}
            contactNo == undefined ? errors.contactNo = 'Phone Number is Required' : contactNo.trim().length < 10 ? errors.contactNo = 'Phone number should be 10 digits long' : ''
            email == undefined || email.trim() == '' ? errors.email = 'Email is required' : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? '' : errors.email = 'Invalid email format'
            name == undefined || name.trim() == '' ? errors.name = 'Name is required' : ''
            password == undefined || password.trim() == '' ? errors.password = 'Please set a password' : ''
            !passwordMatch ? errors.password = 'Passwords do not match' : ''
            Object.keys(errors).length > 0 ? this.setState({ errors }, reject(errors)) : resolve()
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
                    maxLength={10}
                    onSubmitEditing={() => { this.emailInput.focus() }}
                    blurOnSubmit={false}
                    style={CustomStyles.inputStyle}
                />
                <TextInput
                    onChangeText={text => this.setState({
                        email: text
                    })}
                    placeholder="Email"
                    keyboardType="email-address"
                    style={CustomStyles.inputStyle}
                    ref={input => this.emailInput = input}
                    returnKeyType="next"
                    onSubmitEditing={() => { this.nameInput.focus() }}
                    blurOnSubmit={false} />
                <TextInput
                    onChangeText={text => this.setState({
                        name: text
                    })}
                    placeholder="Full name"
                    style={CustomStyles.inputStyle}
                    ref={input => this.nameInput = input}
                    returnKeyType="next"
                    onSubmitEditing={() => { this.passwordInput.focus() }}
                    blurOnSubmit={false} />
                <TextInput
                    onChangeText={text => this.setState({
                        password: text,
                        passwordMatch: false
                    })}
                    placeholder="Password"
                    secureTextEntry={true}
                    style={CustomStyles.inputStyle}
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
                    style={CustomStyles.inputStyle}
                    ref={input => this.passwordConfirmInput = input}
                    returnKeyType="done"
                    onSubmitEditing={() => { this.handleSignup }}
                    blurOnSubmit={false} />
                <Text
                    style={{ color: Colors.warningRed, fontSize: 12 }}>
                    {this.state.errors != undefined ? this.state.errors[Object.keys(this.state.errors)[0]] : ''}</Text>
                <Text style={{ marginTop: 40, textAlign: 'center', color: Colors.textColor }}>{`We will send a one time password\ncarrier rates may apply.`}</Text>
                <RoundButton handleClick={this.handleSignup} />
            </View>
        );
    }
}


const Styles = StyleSheet.create({

    picker: {
        margin: -8,
        marginTop: 40,
    },

})

export default SignupForm