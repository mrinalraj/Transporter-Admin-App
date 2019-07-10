import React from 'react'
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Actions } from 'react-native-router-flux';


export default class FullScreenImage extends React.Component {
    state = {

    }
    render() {
        return (
            <Modal visible={true} transparent={true} onRequestClose={() => Actions.pop()}>
                <ImageViewer imageUrls={this.props.image} 
                />
            </Modal>
        )
    }
}