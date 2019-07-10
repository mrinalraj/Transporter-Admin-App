import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Dimens from '../../res/Dimens';
import Colors from '../../res/Colors';
import { Title, Subheading, FAB } from 'react-native-paper';
import UserDetails from '../../components/UserDetails';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import NavBar from '../../components/NavBar';
import LoadingDialog from '../../components/LoadingDialog';
import Axios from 'axios';
import { BASE_API } from '../../res/Constants';

class FullDetail extends Component {
    state = {
        height: 200,
        open: false,
        loading: false,
        ...this.props.data,
        list: []
    }

    componentDidMount() {
        this._getUsers()
    }

    _getUsers = (page = 1) => {
        this.setState({ loading: true })
        Axios.post(`${BASE_API}/userListAPI`, { limit: 20, page, rideId: this.props._id }, { headers: { accessToken: this.props.accessToken } })
            .then(({ data }) => {
                this.setState({ loading: false })
                if (!data.success)
                    return alert(data.payload.error.message)
                    his.setState(prevState => ({ list: [...prevState.list, data.payload.result.data] }))
            })
            .catch(e => {
                this.setState({ loading: false })
                alert(e)
            })
    }


    onCardLayout = event => {
        let { width, height } = event.nativeEvent.layout
        this.setState({
            width, height
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title="Truck Details" />
                <View style={{ padding: Dimens.padding / 2, paddingTop: 0 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Title style={{ flex: 0.5, color: Colors.White }}>{this.props.startAddress.address.split('/')[0]}</Title>
                        <Title style={{ flex: 0.5, textAlign: 'right', color: Colors.White }}>{this.props.endAddress.address.split('/')[0]}</Title>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Subheading style={{ flex: 0.5, color: Colors.White }}>{this.props.startAddress.address.split('/')[1]}</Subheading>
                        <Subheading style={{ flex: 0.5, textAlign: 'right', color: Colors.White }}>{this.props.endAddress.address.split('/')[1]}</Subheading>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Subheading style={{ flex: 0.5, color: Colors.White }}>{this.props.truckData.truckNumber}</Subheading>
                        <Subheading style={{ flex: 0.5, textAlign: 'right', color: Colors.White }}>{`Ride Type: ${this.props.rideType}`}</Subheading>
                    </View>
                    <Title style={{ marginTop: 20, color: Colors.White }}>User Details</Title>
                    <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={true} contentContainerStyle={{ flexGrow: 2 }}>
                        {
                            this.state.list.map((u, i) => <UserDetails key={i} {...u} onLayout={this.onCardLayout} />)
                        }
                    </ScrollView>
                </View>
                {
                    this.props.currentType == 3 ? <FAB style={{ position: 'absolute', margin: Dimens.padding / 2, bottom: 0, right: 0 }}
                        icon='map'
                        onPress={() => Actions.TruckLocationOnMap()} />
                        : null
                }
                <LoadingDialog visible={this.state.loading} />
            </View >
        );
    }
}

export default FullDetail