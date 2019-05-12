import React, { Component } from 'react'
import { MapView } from 'expo'

class TruckLocationOnMap extends Component {
    state = {}
    render() {
        return (
            <MapView style={{ flex: 1 }}
                initialRegion={{
                    latitude: 29.852970,
                    longitude: 77.875450,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }} />
        );
    }
}

export default TruckLocationOnMap;