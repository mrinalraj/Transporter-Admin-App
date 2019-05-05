import React from 'react'
import { View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import Dimens from '../res/Dimens'
import SignupForm from '../components/SignupForm'
import TopBanner from '../components/TopBanner';
import LoadingDialog from '../components/LoadingDialog'

class SignUp extends React.Component {

    state = {
        visible: false
    }

    setVisibility = visibility => this.setState({ visible: visibility })

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TopBanner />
                <ScrollView scrollEnabled={true} contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
                    <SignupForm setVisibility={this.setVisibility} />
                    {/* <KeyboardAvoidingView behavior='position'>
                    </KeyboardAvoidingView> */}
                </ScrollView>
                <LoadingDialog visible={this.state.visible} />
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