import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState,useRef} from 'react';
import { StyleSheet, Text, View,SafeAreaView, ScrollView,Dimensions } from 'react-native';
import Login from './components/Login';
export default function App() {
 
  return (
    <View style={styles.container}>
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
 
});
