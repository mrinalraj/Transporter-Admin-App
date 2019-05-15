import React from 'react'
import { Router, Scene, Drawer, Modal, } from 'react-native-router-flux'
import { ToastAndroid, } from 'react-native'
import { SecureStore, } from 'expo'
import { ACCESS_TOKEN, } from './res/Constants'


import Login from './scenes/Login'
import SignUp from './scenes/SignUp'
import OtpScreen from './scenes/OtpScreen'
import ForgotPassword from './scenes/ForgotPassword'
import ChangePassword from './scenes/ChangePassword'
import Profile from './scenes/sidebar/Profile'
import Vehicles from './scenes/Vehicles'
import DrawerMenu from './components/DrawerMenu'
import Dimens from './res/Dimens'
import Home from './scenes/Home'
import CreateRideUserRequest from './scenes/CreateRideUserRequest'
import MyRides from './scenes/sidebar/MyRides'
import FullDetail from './scenes/intermidiates/FullDetail'
import TruckLocationOnMap from './scenes/intermidiates/TruckLocationOnMap'
import CreateRide from './scenes/CreateRide'
import MyRequests from './scenes/MyRequests'
import MarketRate from './scenes/MarketRate'


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
                <Scene key="root" hideNavBar>
                    <Drawer
                        key="HomeDrawer"
                        hideNavBar
                        initial={this.props.isLogged}
                        contentComponent={DrawerMenu}
                        drawerWidth={Dimens.windowWidth * 0.6}
                        hideDrawerButton={true}
                        drawerPosition="left">

                        <Scene key="Home" component={Home} hideNavBar />
                        <Scene key="Profile" component={Profile} hideNavBar />
                        <Scene key="Vehicles" component={Vehicles} hideNavBar />
                        <Scene key="MyRides" component={MyRides} hideNavBar />
                        <Scene key="MyRequests" component={MyRequests} hideNavBar />
                        <Scene key="MarketRate" component={MarketRate} hideNavBar />

                    </Drawer>

                    <Scene key="Login"
                        component={Login}
                        initial={!this.props.isLogged}
                        hideNavBar />

                    <Scene key="SignUp" component={SignUp} hideNavBar />
                    <Scene key="OtpScreen" component={OtpScreen} hideNavBar />
                    <Scene key="ForgotPassword" component={ForgotPassword} hideNavBar />
                    <Scene key="ChangePassword" component={ChangePassword} hideNavBar />
                    <Scene key="CreateRideUserRequest" component={CreateRideUserRequest} hideNavBar />
                    <Scene key="FullDetail" component={FullDetail} hideNavBar></Scene>
                    <Scene key="TruckLocationOnMap" component={TruckLocationOnMap} hideNavBar></Scene>
                    <Scene key="CreateRide" component={CreateRide} hideNavBar></Scene>
                </Scene>
            </Router>
        );
    }
}
export default Routes