import React from 'react'
import MapPicker from '../components/MapPicker'
import { View } from 'react-native'
import { Permissions, Location } from 'expo';
import LoadingDialog from './LoadingDialog';
import { Accuracy } from 'expo-location';
import Geocoder from 'react-native-geocoding';

class MapPickerCustom extends React.Component {
    state = {

    }

    componentDidMount() {
        this._getLocationAsync()
    }

    _getLocationAsync = async () => {
        this.setState({ visible: true })
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== 'granted') {
            alert('we need permission')
        }

        let location = await Location.getCurrentPositionAsync({ accuracy: Accuracy.Highest })
        this.setState({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            visible: false
        })
        console.log(location.coords.longitude, location)
    }

    _onLocationSelect = (which, latitude, longitude) => {
        // Geocoder.init('AIzaSyDu9JLR_CCvfdyuaYnkkkfFqJD8e1_Ro28')
        Geocoder.init('AIzaSyBLL9qaRIogGocE7gzxCQi58BYHJB9-0dQ')
        // Geocoder.from(latitude, longitude)
        //     .then(json => {
        //         console.log(json.results[0].address_components[0])
        //         this.props.onLocationSelect(which, latitude, longitude, json.results[0].address_components[0])
        //     })
        //     .catch(err => console.log(err))
        this.props.onLocationSelect(which, latitude, longitude, '')
    }

    _renderMap = () => {
        if (this.state.latitude) {
            return (
                <MapPicker min initialCoordinate={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                }}
                    onLocationSelect={({ latitude, longitude }) => this._onLocationSelect(this.props.which, latitude, longitude)} />
            )
        }
        return;
    }


    render() {

        return (
            <View style={{ flex: 1 }}>
                {
                    this._renderMap()
                }
                <LoadingDialog visible={this.state.visible} />
            </View>
        )
    }

}

export default MapPickerCustom