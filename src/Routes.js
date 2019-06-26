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
import CreateVehicle from './scenes/CreateVehicle';
import MapPickerCustom from './components/MapPickerCustom';
import CheckLoginState from './scenes/CheckLoginState';


class Routes extends React.Component {

    render() {

        return (
            <Router>
                <Scene key="root" hideNavBar>
                    <Scene key="CheckLoginState" component={CheckLoginState} initial hideNavBar />
                    <Drawer
                        key="HomeDrawer"
                        hideNavBar
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
                        hideNavBar />
                    <Scene key="SignUp" component={SignUp} hideNavBar />
                    <Scene key="OtpScreen" component={OtpScreen} hideNavBar />
                    <Scene key="ForgotPassword" component={ForgotPassword} hideNavBar />
                    <Scene key="ChangePassword" component={ChangePassword} hideNavBar />
                    <Scene key="CreateRideUserRequest" component={CreateRideUserRequest} hideNavBar />
                    <Scene key="FullDetail" component={FullDetail} hideNavBar />
                    <Scene key="TruckLocationOnMap" component={TruckLocationOnMap} hideNavBar />
                    <Scene key="CreateRide" component={CreateRide} hideNavBar />
                    <Scene key="CreateVehicle" component={CreateVehicle} hideNavBar />
                    <Scene key="MapPickerCustom" component={MapPickerCustom} hideNavBar />
                </Scene>
            </Router>
        );
    }
}
export default Routes