import React from 'react'
import { View } from 'react-native'
import { IconButton, Title } from 'react-native-paper'
import Colors from '../res/Colors'
import Dimens from '../res/Dimens'
import { Actions } from 'react-native-router-flux';


const NavBar = props => {
    return (
        <View>
            <View style={{ height: Dimens.statusBarHeight, backgroundColor: Colors.primaryColor }} />
            <View style={{
                flexDirection: 'row', height: 60, alignItems: 'center', paddingLeft: Dimens.padding / 4, paddingRight: Dimens.padding / 4, justifyContent: 'space-between', backgroundColor: Colors.primaryColor
            }}>
                <IconButton color={Colors.White} size={24} icon='arrow-back' onPress={() => Actions.pop()} />
                <Title style={{ color: Colors.White, textAlign: 'center', justifyContent: 'center', flex: 0.8 }}>{props.title}</Title>
                <View style={{ flex: 0.1 }}></View>
            </View>
        </View>
    )
}

export default NavBar