import React from "react";
import { StyleSheet } from "react-native";



import Navigation from "./navigation";
import { Block } from "./components";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default class App extends React.Component {

  render() {
    return (
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({});