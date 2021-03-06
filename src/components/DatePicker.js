import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import Colors from '../res/Colors'
import Dimens from '../res/Dimens'

class DatePicker extends Component {
    state = {
        isVisible: false
    }

    onConfirm = data => {
        let datetime = ''
        if (this.props.mode == 'time')
            datetime = moment(data).format('hh:mm')
        if (this.props.mode == 'date')
            datetime = moment(data).format('Do MMMM YYYY')
        if (this.props.mode == 'datetime')
            datetime = moment(data).format('Do MMMM YYYY / hh:mm a')

        this.setState({
            datetime: datetime, isVisible: false
        }, this.props.onConfirm(this.state.datetime))
    }

    Styles = StyleSheet.create({
        labelText: {
            fontSize: 12,
            color: Colors.White,
        },
        inputStyle: {
            ...this.props.inputStyle
        }
    })

    render() {
        return (
            <View>
                <View style={{ marginTop: Dimens.hp('0.5') }}>
                    <Text style={this.Styles.labelText}>{this.props.label}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                isVisible: true
                            })
                        }}
                        disabled={this.props.disabled}>
                        <TextInput style={this.Styles.inputStyle} placeholder={this.props.placeholder} editable={false} value={this.props.value || this.state.datetime} />
                    </TouchableOpacity>
                </View>
                <DateTimePicker
                    is24Hour={false}
                    isVisible={this.state.isVisible}
                    onConfirm={this.onConfirm}
                    onCancel={() => this.setState({ isVisible: false })}
                    mode={this.props.mode} />
            </View>
        );
    }
}


export default DatePicker