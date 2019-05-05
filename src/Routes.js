import React from 'react'
import { Router, Scene, Actions } from 'react-native-router-flux'
import { AsyncStorage, ToastAndroid } from 'react-native'
import { SecureStore } from 'expo'
import { LOGGED_IN_STATE } from './res/Constants'
import Login from './scenes/Login'
import SignUp from './scenes/SignUp'
import OtpScreen from './scenes/OtpScreen'
import ForgotPassword from './scenes/ForgotPassword'
import ChangePassword from './scenes/ChangePassword'

class Routes extends React.Component {
    state = {

    }

    // onBackPress() {
    //     if (backButtonPressedOnceToExit) {
    //         BackAndroid.exitApp();
    //     } else {
    //         if (Actions.currentScene !== 'Home') {
    //             Actions.pop();
    //             return true;
    //         } else {
    //             backButtonPressedOnceToExit = true;
    //             ToastAndroid.show("Press Back Button again to exit", ToastAndroid.SHORT);
    //             //setting timeout is optional
    //             setTimeout(() => { backButtonPressedOnceToExit = false }, 2000);
    //             return true;
    //         }
    //     }
    // }

    componentDidMount() {
        this.loginState()
    }

    loginState = async () => {
        try {
            const loggedInState = await SecureStore.getItemAsync(LOGGED_IN_STATE)
            if (loggedInState !== null) {
                this.setState({ loggedInState })
            }
        }
        catch (error) {
            ToastAndroid.show(this.state.loggedInState)
        }
    }

    render() {

        return (
            <Router>
                <Scene key="root">
                    <Scene key="Login" component={Login} initial={true} hideNavBar={true} />
                    <Scene key="SignUp" component={SignUp} hideNavBar={true} />
                    <Scene key="OtpScreen" component={OtpScreen} hideNavBar={true} />
                    <Scene key="ForgotPassword" component={ForgotPassword} hideNavBar={true} />
                    <Scene key="ChangePassword" component={ChangePassword} hideNavBar={true} />
                </Scene>
            </Router>
        );
    }
}
export default Routes