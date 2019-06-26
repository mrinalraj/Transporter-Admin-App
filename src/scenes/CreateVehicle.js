import React, { Component } from 'react'
import { Text, View, Picker, ScrollView, KeyboardAvoidingView, StyleSheet, TextInput, Alert } from 'react-native'
import NavBar from '../components/NavBar'
import Dimens from '../res/Dimens'
import Colors from '../res/Colors'
import FooterButton from '../components/FooterButton'
import { Button, List } from 'react-native-paper';
import { ImagePicker, Permissions, SecureStore } from 'expo'
import { BottomSheet, SnackBar } from 'react-native-btr'
import LoadingDialog from '../components/LoadingDialog'
import { RNS3 } from 'react-native-aws3'
import Axios from 'axios';
import { BASE_API, ACCESS_TOKEN } from '../res/Constants'
import { Actions } from 'react-native-router-flux'

class CreateVehicle extends Component {
    state = {
        truckType: 'Open',
        truckSubType: '6 TYRE(19-24 FT)',
        bottomSheetVisible: false,
        loading: false,
        SnackBarVisible: false
    }

    truckList = ["Open", "Container", "Trailer",]
    truckSubTypeOpen = ['6 TYRE(19-24 FT)', '10 TYRE', '12 TYRE', '14 TYRE', '18 TYRE', '22 TYRE', 'TEMPO 407', 'LCV(14-17 FT)']
    truckSubTypeContainer = ['32 FT MXL', '32 FT SXL', '19-22 FT SXL', 'LCV(14-17 FT)', '24 FT MXL', '24 FT SXL', '32 FT MXL HQ', '32 FT SXL HQ', '32 FT TXL', '32 FT TXL HQ']
    truckSubTypeTrailer = ['High Bed', 'Low Bed', 'Semi Bed']

    renderSubType = () => {
        switch (this.state.truckType) {
            case 'Open':
                return this.truckSubTypeOpen.map((e, i) => <Picker.Item label={e} key={i} value={e} />)
            case 'Container':
                return this.truckSubTypeContainer.map((e, i) => <Picker.Item label={e} key={i} value={e} />)
            case 'Trailer':
                return this.truckSubTypeTrailer.map((e, i) => <Picker.Item label={e} key={i} value={e} />)
            default:
                return <Picker.Item label='Select Truck type first' value='' />
        }
    }

    componentDidMount() {
        this.getPermissionAsync();
    }


    getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }

    truckTypeChanged = itemValue => {
        var truckSubType = null
        switch (itemValue) {
            case 'Open':
                truckSubType = this.truckSubTypeOpen[0]
                break;
            case 'Container':
                truckSubType = this.truckSubTypeContainer[0]
                break;
            case 'Trailer':
                truckSubType = this.truckSubTypeTrailer[0]
                break;
            default:
                truckSubType = null
        }

        if (truckSubType != null) {
            this.setState({ truckType: itemValue, truckSubType: truckSubType })
        }
    }

    _makeid = (length = 12) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    _pickImage = async from => {
        let type = this.state.imageType
        this._toggleBottomNavigationView()
        this.setState({ loading: true, loadingText: `Uploading\nPlease Wait` })
        var result = null

        if (from == 'gallery') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true
            })
        }
        else {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true
            })
        }

        if (!result.cancelled) {

            const file = {
                uri: result.uri,
                name: this._makeid(),
                type: 'image/jpeg'
            }

            const options = {
                keyPrefix: `${type}-`,
                bucket: 'trans-app',
                region: 'us-east-2',
                accessKey: 'AKIAQC4EZDNK4VRJ7RVB',
                secretKey: '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',
                successActionStatus: 201
            }

            RNS3.put(file, options).then(response => {
                this.setState({ loading: false, loadingText: `` })
                if (response.status !== 201) {
                    return alert('Failed to upload. Please try again.')
                }
                type === 'rc' ? this.setState({ rcCardUrl: response.body.postResponse.location }) : this.setState({ insuranceUrl: response.body.postResponse.location })

            }).catch(err => this.loading(false))
        }
        else {
            this.setState({ loading: false, loadingText: `` })
        }
    }

    _showRcImageOrButton = () => {
        if (this.state.rcCardUrl) {
            return <Text style={{ color: Colors.White, paddingTop: 10, paddingBottom: 10, fontSize: 25 }}>Uploaded</Text>
        }
        return <Button style={{ marginBottom: 10, marginTop: 10 }} color={Colors.accentColor} onPress={() => this._startPicker('rc')} mode='outlined'>Select File</Button>
    }

    _showInsuranceImageOrButton = () => {
        if (this.state.insuranceUrl) {
            return <Text style={{ color: Colors.White, paddingTop: 10, paddingBottom: 10, fontSize: 25 }}>Uploaded</Text>
        }
        return <Button style={{ marginBottom: 10, marginTop: 10 }} color={Colors.accentColor} onPress={() => this._startPicker('insurance')} mode='outlined'>Select File</Button>
    }

    _startPicker = type => {
        this.setState({ imageType: type })
        this._toggleBottomNavigationView()
    }

    _toggleBottomNavigationView = () => {
        this.setState({ bottomSheetVisible: !this.state.bottomSheetVisible });
    }

    _validateFields = () => {
        return new Promise((resolve, reject) => {
            let { truckType, truckSubType, truckNumber, rcCardUrl, insuranceUrl } = this.state
            let errors = 0
            truckNumber == undefined ? errors++ : ''
            rcCardUrl == undefined ? errors++ : ''
            insuranceUrl == undefined ? errors++ : ''
            errors > 0 ? reject() : resolve()
        })
    }

    _createTruck = async () => {
        let accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN)
        this._validateFields()
            .then(() => {
                this.setState({ loading: true })
                let data = {
                    truckType: this.state.truckType,
                    truckSubType: this.state.truckSubType,
                    truckNumber: this.state.truckNumber,
                    rcCardUrl: this.state.rcCardUrl,
                    insuranceUrl: this.state.insuranceUrl
                }
                headers = {
                    accessToken
                }
                Axios.post(`${BASE_API}/addVehicle`, data, { headers })
                    .then(response => {
                        this.setState({ loading: false })
                        this.setState({ SnackBarVisible: true })
                        setTimeout(() => {
                            Actions.pop()
                            Actions.refresh()
                        }, 1200)
                    })
            })
            .catch(() => {
                Alert.alert('', 'All fields are mandatory!')
            })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <NavBar title="Create Vehicle" />
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: Dimens.padding / 2, flexGrow: 2 }}>
                    <KeyboardAvoidingView behavior='position'>
                        <Text style={Styles.labelText}>Truck Type</Text>
                        <View style={{
                            borderRadius: 4,
                            paddingRight: 10,
                            paddingLeft: 10,
                            backgroundColor: Colors.White,
                            marginBottom: 20
                        }}>
                            <Picker style={{ marginStart: -8, marginTop: -4, marginBottom: -4, marginEnd: -8 }}
                                selectedValue={this.state.truckType}
                                onValueChange={(itemValue, itemIndex) => this.truckTypeChanged(itemValue)}>
                                {
                                    this.truckList.map((e, i) => <Picker.Item label={e} key={i} value={e} />)
                                }
                            </Picker>
                        </View>

                        <Text style={Styles.labelText}>Truck SubType</Text>
                        <View style={{
                            borderRadius: 4,
                            paddingRight: 10,
                            paddingLeft: 10,
                            backgroundColor: Colors.White,
                            marginBottom: 20
                        }}>
                            <Picker style={{ marginStart: -8, marginTop: -4, marginBottom: -4, marginEnd: -8 }}
                                selectedValue={this.state.truckSubType}
                                onValueChange={(itemValue, itemIndex) => this.setState({ truckSubType: itemValue })}>
                                {
                                    this.renderSubType()
                                }
                            </Picker>
                        </View>

                        <Text style={Styles.labelText}>Truck Number</Text>
                        <TextInput placeholder="Truck Registration Number"
                            autoCapitalize="characters"
                            style={Styles.inputStyle} onChangeText={text => this.setState({ truckNumber: text })}></TextInput>
                        <Text style={Styles.labelText}>Upload Vehicle Registration Card</Text>
                        {
                            this._showRcImageOrButton()
                        }
                        <Text style={Styles.labelText}>Insurance URL</Text>
                        {
                            this._showInsuranceImageOrButton()
                        }
                    </KeyboardAvoidingView>
                </ScrollView>
                <BottomSheet visible={this.state.bottomSheetVisible}
                    onBackButtonPress={this._toggleBottomNavigationView}
                    onBackdropPress={this._toggleBottomNavigationView} >
                    <View style={{ backgroundColor: Colors.White, padding: 20 }}>
                        <List.Item title='Select from gallery' onPress={() => this._pickImage('gallery')} />
                        <List.Item title='Open Camera' onPress={() => this._pickImage('camera')} />
                    </View>
                </BottomSheet>
                <FooterButton name='Create Truck' icon='check' cta={this._createTruck} />
                <LoadingDialog visible={this.state.loading} text={this.state.loadingText} />
                <SnackBar visible={this.state.SnackBarVisible} duration={1200} onDismiss={() => this.setState({ SnackBarVisible: false })}>Truck Created</SnackBar>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    labelText: {
        fontSize: 12,
        color: Colors.White
    },
    inputStyle: {
        backgroundColor: Colors.White,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
        marginBottom: 20
    },
})

export default CreateVehicle