import React, { Component } from 'react'
import { View, Text, ScrollView, Picker } from 'react-native'
import Colors from '../../res/Colors'
import Dimens from '../../res/Dimens'
import { Title, FAB } from 'react-native-paper'
import RidesListing from '../../components/RidesListing'
import { Actions } from 'react-native-router-flux';
import NavBar from '../../components/NavBar';
import FooterButton from '../../components/FooterButton';

class MyRides extends Component {
    state = {
        filter: '---- Select Filter ----'
    }

    list = [
        {
            from: {
                place: 'New Delhi',
                subplace: 'Okhla'
            },
            to: {
                place: 'Hyderabad',
                subplace: 'Hyderabad',
            },
            loadType: 'Full Load',
            startDate: '',
            endDate: '',
            usersCount: '10',
            status: 'Pending'
        },
        {
            from: {
                place: 'Roorkee',
                subplace: 'Adarsh Nagar'
            },
            to: {
                place: 'Dehradun',
                subplace: 'Dehradun',
            },
            loadType: 'Shared',
            startDate: '',
            endDate: '',
            usersCount: '4',
            status: 'Complete'
        },
        {
            from: {
                place: 'Roorkee',
                subplace: 'Adarsh Nagar'
            },
            to: {
                place: 'Dehradun',
                subplace: 'Dehradun',
            },
            loadType: 'Shared',
            startDate: '',
            endDate: '',
            usersCount: '4',
            status: 'Upcoming'
        },
        {
            from: {
                place: 'Roorkee',
                subplace: 'Adarsh Nagar'
            },
            to: {
                place: 'Dehradun',
                subplace: 'Dehradun',
            },
            loadType: 'Shared',
            startDate: '',
            endDate: '',
            usersCount: '4',
            status: 'Complete'
        },
        {
            from: {
                place: 'Roorkee',
                subplace: 'Adarsh Nagar'
            },
            to: {
                place: 'Dehradun',
                subplace: 'Dehradun',
            },
            loadType: 'Shared',
            startDate: '',
            endDate: '',
            usersCount: '4',
            status: 'Pending'
        },
    ]

    viewDetails = e => {
        Actions.FullDetail({ data: e })
    }

    filters = ["---- Select Filter ----", "Pending", "Complete", "Current", "Upcoming",]

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>

                <NavBar title="My Rides" />

                <View style={{
                    marginLeft: Dimens.padding / 2,
                    marginRight: Dimens.padding / 2, backgroundColor: Colors.White, borderRadius: 5
                }}>
                    <Picker
                        style={{ margin: -4, marginEnd: -11, marginStart: -5 }}
                        selectedValue={this.state.filter}
                        onValueChange={(itemValue, itemIndex) => this.setState({ filter: itemValue })}>
                        {
                            this.filters.map((filter, i) => <Picker.Item key={i} label={filter} value={filter} />)
                        }
                    </Picker>
                </View>

                <View style={{ flex: 1, padding: Dimens.padding / 2, paddingBottom: Dimens.footerButtonHeight, }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 2,}} showsVerticalScrollIndicator={false}>
                        {
                            this.list.map((e, i) => {
                                if (this.state.filter == '---- Select Filter ----')
                                    return <RidesListing key={i} {...e} viewDetails={() => this.viewDetails(e)} />
                                if (e.status == this.state.filter)
                                    return <RidesListing key={i} {...e} viewDetails={() => this.viewDetails(e)} />
                            })
                        }
                    </ScrollView>
                </View>
                {/* <FAB style={{ position: 'absolute', bottom: Dimens.padding / 2, right: Dimens.padding / 2 }} label="Create Ride" icon='add' onPress={() => Actions.CreateRide()} /> */}
                <FooterButton name="Create Ride" icon="add" cta={() => Actions.CreateRide()} />
            </View >
        );
    }
}

export default MyRides;