import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, } from 'react-native'
import Dimens from '../res/Dimens'
import CustomStyle from '../res/CustomStyles'
import TopBanner from '../components/TopBanner'
import RoundButton from '../components/RoundButton'
import { Actions } from 'react-native-router-flux'
import { SecureStore } from 'expo'
import { ACCESS_TOKEN } from '../res/Constants';

class Login extends Component {
    state = {}

    otpSubmitAction = async accessToken => {
        await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken)
        Actions.replace('Home')
    }

    handleClick = () => {

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TopBanner />
                <ScrollView scrollEnabled={true} contentContainerStyle={{
                    paddingRight: Dimens.padding,
                    paddingTop: Dimens.padding,
                    paddingLeft: Dimens.padding,
                    flexGrow: 2,
                }} showsVerticalScrollIndicator={false}>
                    <Text style={CustomStyle.headText}>{`Welcome back,\nlets get you signed in`}</Text>
                    <TextInput
                        style={CustomStyle.inputStyle}
                        placeholder="Phone Number"
                        returnKeyType="next"
                        keyboardType='number-pad'
                        maxLength={10}
                    />
                    <TextInput
                        style={CustomStyle.inputStyle}
                        placeholder="Password"
                        returnKeyType="done"
                        secureTextEntry={true}
                    />
                    <Text style={{ ...Styles.forgotPassword }} onPress={() => Actions.push('ForgotPassword')}>Forgot Password ?</Text>
                    <Text style={{ padding: 10, textAlign: "center" }} onPress={() => Actions.replace('SignUp')}>New here, Sign up?</Text>
                    <RoundButton handleClick={this.handleClick} />
                </ScrollView>
            </View >
        );
    }
}

const Styles = StyleSheet.create({
    forgotPassword: {
        textAlign: "center",
        color: CustomStyle.headText.color,
        // textDecorationLine: 'underline',
        marginTop: 20,
        marginBottom: 10,
        padding: 10
    },
})

export default Login;

