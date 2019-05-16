import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Image } from "react-native";
import Colors from '../res/Colors';
import NavBar from '../components/NavBar'
import VehiclesList from '../components/VehiclesList'
import Dimens from '../res/Dimens'
import FooterButton from '../components/FooterButton';

class Vehicles extends Component {
    state = {

    }

    list = [1, 2, 3, 4, 5, 6, 6, 6, 6,]

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title="Vehicles List" />
                <View style={{ padding: Dimens.padding / 2, paddingTop: 0 }}>
                    <View style={{ backgroundColor: Colors.White, flexDirection: 'row', borderRadius: 4, justifyContent: 'center' }}>
                        <TextInput placeholder="Search" style={{ flex: 0.9, ...Styles.inputStyle }} />
                        <View style={{ flex: 0.1, justifyContent: 'center', alignContent: 'center' }}>
                            <Image source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/search.png' }} style={{ height: 20, width: 20 }} />
                        </View>
                    </View>
                </View>
                <View>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{ paddingRight: Dimens.padding / 2 }}>
                        {
                            this.list.map((e, i) => <VehiclesList key={i} />)
                        }
                    </ScrollView>
                </View>
                <FooterButton name='Create Vehicle Listing' icon='add' cta={() => { }} />
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    inputStyle: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
    },
})

export default Vehicles