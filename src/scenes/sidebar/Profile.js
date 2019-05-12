import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ToastAndroid } from 'react-native'
import Colors from '../../res/Colors'
import Dimens from '../../res/Dimens'
import { Avatar, Title, Subheading, IconButton } from 'react-native-paper';
import NavBar from '../../components/NavBar';
import { TextInput } from 'react-native-gesture-handler';
import CustomStyles from '../../res/CustomStyles';
import RoundButton from '../../components/RoundButton';

class Profile extends Component {
    state = {}
    render() {

        return (
            <View style={{ flex: 1 }}>
                <NavBar title="Edit Profile" />
                <View style={{
                    height: Dimens.windowHeight * 0.35,
                    backgroundColor: Colors.primaryColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => ToastAndroid.show('edit image', ToastAndroid.SHORT)}>
                        <Avatar.Image size={Dimens.windowHeight * 0.20} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpgF3_oUtUDlrs3UiCsnVtkLtIQ_7xnuGpTpV-y9QsM-GV8J" }} />
                    </TouchableOpacity>
                    <Title style={{ fontSize: 25, color: Colors.White, letterSpacing: 1, marginTop: 20 }}>John Doe</Title>
                    <Subheading style={{ color: Colors.White, marginTop: 8 }}>johndoe@example.com</Subheading>
                </View>
                <View style={{ padding: Dimens.padding / 2 }}>
                    <TextInput placeholder="Name" style={CustomStyles.inputStyle} value='John Doe'></TextInput>
                    <TextInput placeholder="Phone Number" style={CustomStyles.inputStyle} value='johndoe@example.com'></TextInput>
                    <TextInput placeholder="Password" style={CustomStyles.inputStyle} secureTextEntry></TextInput>
                </View>
                <RoundButton handleClick={() => { }} />
            </View >
        );
    }
}

export default Profile