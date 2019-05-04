import React from 'react'
import { View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import Dimens from '../res/Dimens'
import Colors from '../res/Colors'
import SignupForm from '../components/SignupForm'
import TopBanner from '../components/TopBanner';

class SignUp extends React.Component {

    state = {}

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TopBanner />
                <ScrollView scrollEnabled={true} contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView behavior='position'>
                        <SignupForm />
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    statusBar: {
        height: Dimens.statusBarHeight
    },
    scrollView: {
        paddingRight: Dimens.padding,
        paddingTop: Dimens.padding,
        paddingLeft: Dimens.padding,
        flexGrow: 2,
    },
})

export default SignUp