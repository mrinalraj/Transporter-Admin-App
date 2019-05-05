import React from 'react'
import { ActivityIndicator, Modal, } from 'react-native-paper'
import Colors from '../res/Colors'

const LoadingDialog = ({ visible }) => {
    return (
        <Modal dismissable={false} visible={visible} >
            <ActivityIndicator animating={true} size="large" color={Colors.accentColor} ></ActivityIndicator>
        </Modal>
    )
}

export default LoadingDialog