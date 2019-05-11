import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/Routes';
import Colors from './src/res/Colors'
import { AppLoading, SecureStore } from 'expo'
import { ACCESS_TOKEN } from './src/res/Constants';

export default class App extends React.Component {

  state = { isReady: false }

  render() {


    if (!this.state.isReady) {
      return (
        <AppLoading startAsync={async () => {
          let accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN)
          this.setState({ isLogged: accessToken !== null })
        }}
          onFinish={() => this.setState({ isReady: true })} />
      )
    }

    return (
      // <Provider store={Store}>
      <PaperProvider theme={paperCustomTheme}>
        <Routes isLogged={this.state.isLogged} />
      </PaperProvider>
      // </Provider>
    );
  }
}

const paperCustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primaryColor,
    accent: Colors.accentColor
  }
}