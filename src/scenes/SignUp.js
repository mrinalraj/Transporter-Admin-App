import React from 'react'
import { View, StatusBar, StyleSheet, TextInput, Picker, Alert, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native'
import Dimens from '../res/Dimens'
import Colors from '../res/Colors'
import CountryCode from '../res/CountryCode'
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Button, } from 'react-native-paper'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countryCode: ''
        };
    }

    componentDidMount() {
        fetch('http://ip-api.com/json/')
            .then(res => res.json())
            .then(data => {
                let cc = data.countryCode
                CountryCode.forEach(e => {
                    if (e.iso2 === cc) {
                        return this.setState({ countryCode: e.code })
                    }
                })
            })
            .catch(err => {
                Alert.alert(err)
            })
    }

    renderList() {
        return CountryCode.map(country => <Picker.Item key={country.iso2} label={`${country.name} (+${country.code})`} value={country.code
        } />)
    }

    render() {
        return (
            <View behavior="position">
                <View style={Styles.statusBar}>
                    <StatusBar backgroundColor="#b43cfa" />
                </View>
                <View style={Styles.topBanner}>
                    <View style={{ height: 100, width: 150, borderColor: "#fff", borderWidth: 2 }}></View>
                </View>

                <ScrollView style={Styles.scrollView}>
                    <Text style={{ fontSize: 25, letterSpacing: 0.5, color: '#626262' }}>{`New here?\nlets get you onboard.`}</Text>
                    <View style={{
                        marginTop: 40,
                    }} />
                    <Picker
                        style={Styles.picker}
                        selectedValue={this.state.countryCode}
                        onValueChange={(itemValue, itemIndex) => this.setState({ countryCode: itemValue })}>
                        {this.renderList()}
                    </Picker>
                    <TextInput
                        placeholder="Phone Number"
                        keyboardType='number-pad'
                        returnKeyType="next"
                        onSubmitEditing={() => { this.emailInput.focus() }}
                        blurOnSubmit={false}
                        style={Styles.inputStyle}
                        placeholderTextColor={Colors.textColor} />
                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        style={Styles.inputStyle}
                        placeholderTextColor={Colors.textColor}
                        ref={input => this.emailInput = input}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.nameInput.focus() }}
                        blurOnSubmit={false} />
                    <TextInput
                        placeholder="Full name"
                        style={Styles.inputStyle}
                        placeholderTextColor={Colors.textColor}
                        ref={input => this.nameInput = input}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.passwordInput.focus() }}
                        blurOnSubmit={false} />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        style={Styles.inputStyle}
                        placeholderTextColor={Colors.textColor}
                        ref={input => this.passwordInput = input}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.passwordConfirmInput.focus() }}
                        blurOnSubmit={false} />
                    <TextInput
                        placeholder="Confirm password"
                        secureTextEntry={true}
                        style={Styles.inputStyle}
                        placeholderTextColor={Colors.textColor}
                        ref={input => this.passwordConfirmInput = input}
                        returnKeyType="done"
                        // onSubmitEditing={() => { this.passwordConfirmInput.focus() }}
                        blurOnSubmit={false} />
                    <Text style={{ marginTop: 40, textAlign: 'center', color: Colors.textColor }}>{`We will send a one time password\ncarrier rates may apply.`}</Text>
                    <View style={{ justifyContent: "center", alignItems: "center", padding: 40 }}>
                        <TouchableOpacity style={Styles.fabStyleBtn}>
                            <Image source={require('../../assets/r-arrow.svg')}></Image>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    statusBar: {
        height: Dimens.statusBarHeight
    },
    topBanner: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimens.bannerHeight,
        backgroundColor: Colors.primaryColor,
        width: Dimens.windowWidth
    },
    scrollView: {
        padding: Dimens.padding,
    },
    picker: {
        margin: -8
    },
    inputStyle: {
        marginTop: 35,
        paddingBottom: 3,
        fontSize: 15,
        borderBottomColor: Colors.blackColor,
        borderBottomWidth: 1.5,
        letterSpacing: 0.5,
        color: Colors.textColor,
    },
    fabStyleBtn: {
        height: 70,
        width: 70,
        borderRadius: 100,
        backgroundColor: Colors.accentColor,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SignUp;