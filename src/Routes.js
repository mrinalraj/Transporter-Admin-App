import React from 'react'
import { Router, Scene, Actions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'
import SplashScreen from './scenes/SplashScreen'
import SignUp from './scenes/SignUp'
import { LOGGED_IN_STATE } from './res/Constants'
import OtpScreen from './scenes/OtpScreen';

class Routes extends React.Component {
    state = {
        loggedInState: false
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
            const loggedInState = await AsyncStorage.getItem(LOGGED_IN_STATE)
            if (loggedInState !== null) {
                this.setState({ loggedInState })
            }
        }
        catch (error) {
            console.log('failed to get async storage key')
        }
    }

    render() {

        return (
            <Router>
                <Scene key="root">
                    <Scene key="SignUp" component={SignUp} hideNavBar={true} />
                    <Scene key="OtpScreen" component={OtpScreen} initial={true} hideNavBar={true} />
                </Scene>
            </Router>
        );
    }
}
export default Routes