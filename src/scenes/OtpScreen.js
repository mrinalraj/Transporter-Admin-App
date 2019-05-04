import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, ToastAndroid, } from 'react-native'
import TopBanner from '../components/TopBanner';
import Colors from '../res/Colors'
import { ActivityIndicator } from 'react-native-paper';
import Dimens from '../res/Dimens';

class OtpScreen extends Component {

    state = {
        otp: []
    }

    componentDidMount() {
        this.input1.focus()
    }

    shiftFocus = (val, name) => {
        if (val.length() == 0) {
            this.setState(prevState => ({
                otp: [...prevState.otp.pop()]
            }), () => {

                switch (name) {
                    case 'in1':
                        break;
                    case 'in2': this.input1.focus()
                        break;
                    case 'in3': this.input2.focus()
                        break;
                    case 'in4': this.input3.focus()
                        break;
                }
            })
        }

        this.setState(prevState => ({
            otp: [...prevState.otp, val]
        }), () => {

            switch (name) {
                case 'in1': this.input2.focus();
                    break;
                case 'in2': this.input3.focus();
                    break;
                case 'in3': this.input4.focus()
                    break;
                case 'in4': this.finishOtp()
                    break;
            }
        })
    }

    finishOtp = () => {
        ToastAndroid.show(JSON.stringify(this.state.otp.join('')), ToastAndroid.SHORT)
    }

    resendOtp = () => {

    }

    render() {
        return (
            <View style={{ backgroundColor: Colors.primaryColor, flex: 1 }}>
                <TopBanner />
                <Text style={{ textAlign: "center", color: Colors.White, fontSize: 20, letterSpacing: 0.5, }}>Verification Code</Text>
                <Text style={{ textAlign: "center", fontSize: 15, letterSpacing: 0.2, color: Colors.muteTextColor }}>Please type the verification code sent to </Text>
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                    <TextInput ref={input => this.input1 = input} keyboardType='number-pad' maxLength={1} onChangeText={val => this.shiftFocus(val, 'in1')} style={Styles.otpInput}></TextInput>
                    <TextInput ref={input => this.input2 = input} keyboardType='number-pad' maxLength={1} onChangeText={val => this.shiftFocus(val, 'in2')} style={Styles.otpInput}></TextInput>
                    <TextInput ref={input => this.input3 = input} keyboardType='number-pad' maxLength={1} onChangeText={val => this.shiftFocus(val, 'in3')} style={Styles.otpInput}></TextInput>
                    <TextInput ref={input => this.input4 = input} keyboardType='number-pad' maxLength={1} onChangeText={val => this.shiftFocus(val, 'in4')} style={Styles.otpInput}></TextInput>
                </View>
                <Text style={{ textAlign: "center", fontSize: 15, letterSpacing: 0.2, marginHorizontal: 30, marginTop: 15, marginBottom: 20, color: Colors.muteTextColor }}>The One Time Password is valid for next 10 minutes only</Text>
                <Text style={{ textAlign: "center", fontSize: 15, letterSpacing: 0.2, color: Colors.White }} onPress={this.resendOtp()}>Resend OTP</Text>
                <ActivityIndicator animating={true} size="large" ></ActivityIndicator>
                <View style={Styles.overlay}>
                    <ActivityIndicator animating={true} size="large" ></ActivityIndicator>
                </View>
            </View>
        );
    }
}


const Styles = StyleSheet.create({
    optScreen: {
        flex: 1,
        backgroundColor: Colors.primaryColor
    },
    otpInput: {
        padding: 15,
        margin: 15,
        color: Colors.White,
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        position: "absolute",
        top: 0,
        left: 0,
        width: Dimens.windowWidth
    }
})

export default OtpScreen;