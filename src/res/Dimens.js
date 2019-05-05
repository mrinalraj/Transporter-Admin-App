import { Dimensions, Platform, StatusBar } from 'react-native'

const Dimens = {
    windowWidth: (Dimensions.get('window').width),
    windowHeight: (Dimensions.get('window').height),
    statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    bannerHeight: (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight) + 180,
    padding: (Dimensions.get('window').width) * 0.1
}

export default Dimens