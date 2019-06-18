import React from 'react'
import {Text} from 'react-native'
import { ActivityIndicator, Modal, } from 'react-native-paper'
import Colors from '../res/Colors'
import Dimens from '../res/Dimens';

const LoadingDialog = ({ visible, text }) => {
    if (text) {
        return (
            <Modal style={{ zIndex: 1000 }} dismissable={false} visible={visible} >
                <ActivityIndicator animating={true} size="large" color={Colors.accentColor} ></ActivityIndicator>
                <Text style={{ width: Dimens.wp(100), textAlign: 'center', color:Colors.White }}>{text}</Text>
            </Modal>
        )
    }
    return (
        <Modal style={{ zIndex: 1000 }} dismissable={false} visible={visible} >
            <ActivityIndicator animating={true} size="large" color={Colors.accentColor} ></ActivityIndicator>
        </Modal>
    )
}

export default LoadingDialog