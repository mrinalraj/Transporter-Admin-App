import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/Routes';
import Colors from './src/res/Colors'
import { Provider } from 'react-redux'
import Store from './src/Store'

export default class App extends React.Component {
  render() {
    return (
      // <Provider store={Store}>
      <PaperProvider theme={paperCustomTheme}>
        <Routes />
      </PaperProvider>
      // </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const paperCustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primaryColor,
    accent: Colors.accentColor
  }
}