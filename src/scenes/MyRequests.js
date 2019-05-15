import React, { Component } from 'react'
import { TextInput, Image, StyleSheet, View, Text, ScrollView } from 'react-native'
import Colors from '../res/Colors'
import NavBar from '../components/NavBar'
import Dimens from '../res/Dimens';
import UserRequests from '../components/UserRequests'
import Carousel from 'react-native-snap-carousel'

class MyRequests extends Component {


    list = [1, 2, 3, 4, 5, 6, 6, 6, 6,]

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title="My Requests" />
                <View style={{ padding: Dimens.padding / 2, paddingTop: 0 }}>
                    <View style={{ backgroundColor: Colors.White, flexDirection: 'row', borderRadius: 4, justifyContent: 'center' }}>
                        <TextInput placeholder="Search" style={{ flex: 0.9, ...Styles.inputStyle }} />
                        <View style={{ flex: 0.1, justifyContent: 'center', alignContent: 'center' }}>
                            <Image source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/search.png' }} style={{ height: 20, width: 20 }} />
                        </View>
                    </View>
                    <View style={{ marginTop: 40, width: Dimens.windowWidth - Dimens.padding }}>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                this.list.map((e, i) => <UserRequests key={i} />)
                            }
                        </ScrollView>
                    </View>
                </View>
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

export default MyRequests;