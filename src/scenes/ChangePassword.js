import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import RoundButton from '../components/RoundButton'
import LoadingDialog from '../components/LoadingDialog'
import TopBanner from '../components/TopBanner'
import CustomStyle from '../res/CustomStyles'
import Dimens from '../res/Dimens'

class ChangePassword extends Component {

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
                    <KeyboardAvoidingView behavior="position">
                        <Text style={CustomStyle.headText}>{`Enter the new password`}</Text>
                        <TextInput
                            style={CustomStyle.inputStyle}
                            placeholder="New Password"
                            returnKeyType="next"
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={CustomStyle.inputStyle}
                            placeholder="Re-enter Password"
                            returnKeyType="done"
                            secureTextEntry={true}
                        />
                        <RoundButton handleClick={this.handleClick} />
                    </KeyboardAvoidingView>
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


export default ChangePassword