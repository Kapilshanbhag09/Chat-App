import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
const io = require('socket.io-client')
const socket = io("http://192.168.29.107:4000");
export default function App() {
  const[value,setvalue]=useState('H');
  useEffect(()=>{
    socket.on("message_recieved",(data)=>{
        setvalue(data.message);
    })
},[])
  return (
    <View style={styles.container}>
      <Text>{value}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
