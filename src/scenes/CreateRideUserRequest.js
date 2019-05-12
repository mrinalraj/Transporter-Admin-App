import React, { Component } from 'react'
import { View, ScrollView, TextInput, Picker, StyleSheet, ToastAndroid, Platform } from 'react-native'
import Colors from '../res/Colors'
import { Title, Subheading, Button, } from 'react-native-paper'
import Dimens from '../res/Dimens'

class CreateRideUserRequest extends Component {
    state = {
        ...this.props.data
    }

    renderList = () => {
        let vals = ['truck1', 'truck2', 'truck3', 'truck4']
        return vals.map((t, i) => <Picker.Item key={i} value={t} label={t} />)
    }

    componentDidMount() {
        // ToastAndroid.show(JSON.stringify(this.state), ToastAndroid.SHORT)
    }


    render() {
        return (
            <View style={{ backgroundColor: Colors.primaryColor, flex: 1, padding: Dimens.padding }}>
                <View style={{ backgroundColor: Colors.primaryColor, height: Dimens.statusBarHeight }} />
                <Title style={{ color: Colors.White }}>Create rids</Title>
                <Subheading style={{ color: Colors.White }}>Create a ride with the following details</Subheading>
                <ScrollView style={{ flexGrow: 2, marginTop: 50 }}>
                    <View style={{ backgroundColor: Colors.White, paddingRight: 10, paddingLeft: 10, borderRadius: 4, marginBottom: 20 }}>
                        <Picker >
                            {this.renderList()}
                        </Picker>
                    </View>
                    <TextInput placeholder="From" editable={false} value={this.state.from.place} style={Styles.inputStyle}></TextInput>
                    <TextInput placeholder="To" editable={false} value={this.state.to.place} style={Styles.inputStyle}></TextInput>
                    <TextInput placeholder="From Date" editable={false} value={this.state.to.time} style={Styles.inputStyle}></TextInput>
                    <TextInput placeholder="To Date" editable={true} style={Styles.inputStyle}></TextInput>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Button mode='contained' icon='check' style={{ marginTop: 60, width: Dimens.windowWidth * 0.4, backgroundColor: Colors.accentColor, }}>{'Create'.toUpperCase()}</Button>
                    </View>
                    {/* {() => Platform.OS === 'ios' ? <DatePickerIOS /> : <DatePickerAndroid />} */}

                </ScrollView>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: Colors.White,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 4,
        marginTop: 10
    }
})

export default CreateRideUserRequest