import React, { Component } from 'react'
import { View, Text, ScrollView, Picker } from 'react-native'
import Colors from '../../res/Colors'
import Dimens from '../../res/Dimens'
import { Title, FAB } from 'react-native-paper'
import RidesListing from '../../components/RidesListing'
import { Actions } from 'react-native-router-flux';

class MyRides extends Component {
    state = {
        filter: 'None'
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

    filters = ["None", "Pending", "Complete", "Current", "Upcoming",]

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>

                <View style={{ height: Dimens.statusBarHeight, backgroundColor: Colors.primaryColor }} />

                <View style={{ padding: Dimens.padding / 2, paddingBottom: 0 }}>

                    <Title style={{ color: Colors.White, letterSpacing: 1 }}>My Rides</Title>

                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 30, }}>
                        <Text style={{ flex: 0.4, color: Colors.White }}>Filter</Text>
                        <Picker style={{ flex: 0.6, color: Colors.White }}
                            selectedValue={this.state.filter}
                            onValueChange={(itemValue, itemIndex) => this.setState({ filter: itemValue })}>
                            {
                                this.filters.map((filter, i) => <Picker.Item key={i} label={filter} value={filter} />)
                            }
                        </Picker>
                    </View>

                </View>


                <View style={{ flex: 1, padding: Dimens.padding / 2, paddingBottom: 0 }}>
                    <ScrollView contentContainerStyle={{ marginTop: 20, flexGrow: 2, marginBottom: 20 }} showsVerticalScrollIndicator={false}>
                        {
                            this.list.map((e, i) => {
                                if (this.state.filter == 'None')
                                    return <RidesListing key={i} {...e} viewDetails={() => this.viewDetails(e)} />
                                if (e.status == this.state.filter)
                                    return <RidesListing key={i} {...e} viewDetails={() => this.viewDetails(e)} />
                            })
                        }
                    </ScrollView>
                </View>
                <FAB style={{ position: 'absolute', bottom: Dimens.padding / 2, right: Dimens.padding / 2 }} label="Create Ride" icon='add' />
            </View >
        );
    }
}

export default MyRides;