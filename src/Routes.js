import React from 'react'
import { Router, Scene, Drawer, } from 'react-native-router-flux'
import { ToastAndroid, } from 'react-native'
import { SecureStore, } from 'expo'
import { ACCESS_TOKEN, } from './res/Constants'


import Login from './scenes/Login'
import SignUp from './scenes/SignUp'
import OtpScreen from './scenes/OtpScreen'
import ForgotPassword from './scenes/ForgotPassword'
import ChangePassword from './scenes/ChangePassword'
import Profile from './scenes/Profile'
import Vehicals from './scenes/Vehicals'
import DrawerMenu from './components/DrawerMenu'
import Dimens from './res/Dimens'
import Home from './scenes/Home'


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
            const loggedInState = await SecureStore.getItemAsync(ACCESS_TOKEN)
            this.setState({
                loggedInState: loggedInState !== null
            })
        }
        catch (error) {
            ToastAndroid.show(this.state.loggedInState)
        }
    }

    render() {

        return (
            <Router>
                <Scene key="root">
                    {/* <Scene key="InitRouter" initial component={InitRouter} hideNavBar isLogged={this.props.isLogged} /> */}
                    <Drawer
                        key="HomeDrawer"
                        hideNavBar
                        initial={this.props.isLogged}
                        contentComponent={DrawerMenu}
                        drawerWidth={Dimens.windowWidth * 0.6}
                        hideDrawerButton={true}
                        drawerPosition="left">

                        <Scene key="Home"
                            hideNavBar
                            component={Home} />
                        <Scene key="Profile"
                            hideNavBar
                            component={Profile} />
                        <Scene key="Vehicals"
                            hideNavBar
                            component={Vehicals} />

                    </Drawer>
                    <Scene key="Login"
                        component={Login}
                        initial={!this.props.isLogged}
                        hideNavBar />
                    <Scene key="SignUp" component={SignUp} hideNavBar />
                    <Scene key="OtpScreen" component={OtpScreen} hideNavBar />
                    <Scene key="ForgotPassword" component={ForgotPassword} hideNavBar />
                    <Scene key="ChangePassword" component={ChangePassword} hideNavBar />
                </Scene>
            </Router>
        );
    }
}
export default Routes