import React from 'react'
import { View, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import Dimens from '../res/Dimens'
import SignupForm from '../components/SignupForm'
import TopBanner from '../components/TopBanner';
import LoadingDialog from '../components/LoadingDialog'
import RoundButton from '../components/RoundButton'

class SignUp extends React.Component {

    state = {
        visible: false
    }

    changeText = obj => {
        this.setState(obj)
    }

    afterSignup = async data => {
        this.setVisibility(false)

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
        // delete dataClone.passwordMatch
        // delete dataClone.countryCode
        this.validate()
            .then(() => {
                this.setVisibility(true)
                axios.post(`${BASE_API}/signup`, dataClone)
                    .then(response => {
                        this.afterSignup(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                Alert.alert('Error', error[Object.keys(error)[0]])
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

    handleSignupDmmy = () => Alert.alert('', JSON.stringify(this.state))


    setVisibility = visibility => this.setState({ visible: visibility })

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TopBanner />
                <KeyboardAvoidingView behavior='position'>
                    <ScrollView scrollEnabled={true} contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
                        <SignupForm changeText={this.changeText} />
                    </ScrollView>
                </KeyboardAvoidingView>
                <LoadingDialog visible={this.state.visible} />
                <RoundButton handleClick={this.handleSignupDmmy} />
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
        zIndex: -1
    },
})

export default SignUp