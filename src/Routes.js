import React from 'react'
import { Router, Scene, Actions } from 'react-native-router-flux'
import SplashScreen from './scenes/SplashScreen'
import SignUp from './scenes/SignUp'


class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onBackPress() {
        if (backButtonPressedOnceToExit) {
            BackAndroid.exitApp();
        } else {
            if (Actions.currentScene !== 'Home') {
                Actions.pop();
                return true;
            } else {
                backButtonPressedOnceToExit = true;
                ToastAndroid.show("Press Back Button again to exit", ToastAndroid.SHORT);
                //setting timeout is optional
                setTimeout(() => { backButtonPressedOnceToExit = false }, 2000);
                return true;
            }
        }
    }


    render() {

        return (
            <Router>
                <Scene key="root">
                    <Scene key="SplashScreen" component={SplashScreen} initial={true} hideNavBar={true} />
                    <Scene key="SignUp" component={SignUp} hideNavBar={true} />
                </Scene>
            </Router>
        );
    }
}
export default Routes