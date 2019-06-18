import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ToastAndroid, KeyboardAvoidingView, Alert } from 'react-native'
import Colors from '../../res/Colors'
import Dimens from '../../res/Dimens'
import { Avatar, Title, Subheading, IconButton } from 'react-native-paper'
import NavBar from '../../components/NavBar'
import { TextInput } from 'react-native-gesture-handler'
import CustomStyles from '../../res/CustomStyles'
import FooterButton from '../../components/FooterButton'
import Axios from 'axios';
import { BASE_API, ACCESS_TOKEN } from '../../res/Constants'
import { SecureStore } from 'expo'
import LoadingDialog from '../../components/LoadingDialog'
import { Actions } from 'react-native-router-flux'

class Profile extends Component {
    state = {
        loading: false
    }

    componentDidMount() {
        this._getData()
    }

    _getData = async () => {
        this.setState({ loading: true })
        let accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN)
        headers = {
            accessToken
        }

        Axios.post(`${BASE_API}/myProfile`, '', {
            headers
        }).then(({ data }) => {
            this.setState({ loading: false })
            if (!data.success) {
                return alert(data.payload.error.message)
            }
            let {
                name, _id, email, contactNo, imageUrl
            } = data.payload.result
            this.setState({
                name, _id, email, contactNo, imageUrl
            }, this.setState({ loading: false }))

        }).catch(err => {
            this.setState({ loading: false })
            Alert.alert('', 'Unable to get data', [
                {
                    text: 'Dismiss',
                    onPress: () => Actions.pop()
                }
            ])
        })
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <NavBar title="Edit Profile" />
                <KeyboardAvoidingView behavior="position">
                    <View style={{
                        height: Dimens.hp('35'),
                        backgroundColor: Colors.primaryColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity onPress={() => ToastAndroid.show('edit image', ToastAndroid.SHORT)}>
                            <Avatar.Image size={Dimens.hp('20')} source={{ uri: this.state.imageUrl == '' ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdqpgF3_oUtUDlrs3UiCsnVtkLtIQ_7xnuGpTpV-y9QsM-GV8J" : this.state.imageUrl }} />
                        </TouchableOpacity>
                        <Title style={{ fontSize: 25, color: Colors.White, letterSpacing: 1, marginTop: 20 }}>{this.state.name}</Title>
                        <Subheading style={{ color: Colors.White, marginTop: 8 }}>{this.state.email}</Subheading>
                    </View>
                    <View style={{ padding: Dimens.padding / 2, paddingBottom: Dimens.footerButtonHeight }}>
                        <TextInput placeholder="Name" style={CustomStyles.inputStyle} value={this.state.name} editable={false}></TextInput>
                        <TextInput max placeholder="Phone Number" style={CustomStyles.inputStyle} value={this.state.contactNo} onChange={text => this.setState({ contactNo: text })}></TextInput>
                        {/* <TextInput placeholder="Password" style={CustomStyles.inputStyle} secureTextEntry></TextInput> */}
                    </View>
                </KeyboardAvoidingView>
                <FooterButton name='Save' icon='check' cta={() => { }} />
                <LoadingDialog visible={this.state.loading} />
            </View >
        );
    }
}

export default Profile