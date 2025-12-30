import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import RegisterScreen from './src/screens/RegisterScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <RegisterScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default App;