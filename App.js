import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/Routes';

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <Routes />
      </PaperProvider>
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
