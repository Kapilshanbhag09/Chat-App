import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState,useRef} from 'react';
import { StyleSheet, Text, View,SafeAreaView, ScrollView,Dimensions } from 'react-native';
import axios from 'axios';
const io = require('socket.io-client')
const socket = io("http://192.168.29.107:4000");
export default function App() {
  const[myside,setmyside]=useState('Kapil');
  const [messagearr,setmessagearray]=useState([])
  const [newmessagearr,setnewmessagearr]=useState([]);
  const scrollViewRef = useRef();

  
  useEffect(()=>{
    axios.get(`http://192.168.29.107:4000/getmessage/`+myside)
    .then(res => {
      const messres = res.data;
      const tempmesres=[];
      for(let i=0;i<messres.length;i++){
          console.log(messres[i]);
          tempmesres[i]=[];
          tempmesres[i][0]=messres[i].sender;
          tempmesres[i][1]=messres[i].message;
      }
      setmessagearray(tempmesres);
      
    })
    //This is for Socket IO
},[])
useEffect(()=>{
  socket.on("message_recieved",(data)=>{
    const tempmesarr=newmessagearr;
    const tempmesarrnewdata=[];
    tempmesarrnewdata[0]=data.myside;
    tempmesarrnewdata[1]=data.message;
    tempmesarr.push(tempmesarrnewdata);
    setnewmessagearr([]);
    setnewmessagearr(tempmesarr);

})
},[])
  return (
    <View style={styles.container}>
      
      
        <View style={styles.header}>
        <SafeAreaView>
          <Text>Sender</Text>
          </SafeAreaView>
        </View>
        
        {//Chat logs div
        }
        <ScrollView style={styles.chatbox} 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {
          messagearr.map((indmess)=>{
return(

  indmess[0]==myside?
  <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',width:Dimensions.get('window').width}}>
  <View style={{backgroundColor:"white"}}>
  </View>

  <View style={{backgroundColor:"#4D38A2",marginTop:10,marginRight:10,borderRadius:10,padding:10,textOverflow : 'ellipsis',maxWidth:'70%'}}>
  <Text style={{color:'white', fontSize:12,fontWeight:'bold'}}>You</Text>
  <Text style={{color:'white', fontSize:18}}>{indmess[1]}</Text>
  </View>
  </View>
  
  :
  <View style={{width:Dimensions.get('window').width, flex:1,flexDirection:'row',justifyContent:'space-between'}}>
    <View style={{backgroundColor:'#19182A',marginLeft:10,marginTop:10, borderRadius:10,padding:10, maxWidth:'80%'}}>
    <Text style={{color:'white', fontSize:12,fontWeight:"bold"}}>{indmess[0]}</Text>
    <Text style={{color:'white', fontSize:18}}>{indmess[1]}</Text>
    </View>
    <View style={{backgroundColor:'#110E17'}}></View>
  </View>
)
          })}
          {
          newmessagearr.map((indmess)=>{
return(

  indmess[0]==myside?
  <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',width:Dimensions.get('window').width}}>
  <View style={{backgroundColor:"white"}}>
  </View>

  <View style={{backgroundColor:"#4D38A2",marginTop:10,marginRight:10,borderRadius:10,padding:10,textOverflow : 'ellipsis',maxWidth:'70%'}}>
  <Text style={{color:'white', fontSize:12,fontWeight:'bold'}}>You</Text>
  <Text style={{color:'white', fontSize:18}}>{indmess[1]}</Text>
  </View>
  </View>
  
  :
  <View style={{width:Dimensions.get('window').width, flex:1,flexDirection:'row',justifyContent:'space-between'}}>
    <View style={{backgroundColor:'#19182A',marginLeft:10,marginTop:10, borderRadius:10,padding:10, maxWidth:'80%'}}>
    <Text style={{color:'white', fontSize:12,fontWeight:"bold"}}>{indmess[0]}</Text>
    <Text style={{color:'white', fontSize:18}}>{indmess[1]}</Text>
    </View>
    <View style={{backgroundColor:'#110E17'}}></View>
  </View>
)
          })}
        </ScrollView>
       
        <View style={styles.chatbox_text_div}>
<Text>Hi</Text>
        </View>
       
      
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  header:{
    backgroundColor:'yellow',
    height:Dimensions.get('window').height/10,
  },
  chatbox:{
    height:(Dimensions.get('window').height/10)*8,
    backgroundColor:"#251C31",
  },
  chatbox_text_div:{
    backgroundColor:"#110E17",
    width:'100%',
    height:(Dimensions.get('window').height/10)
  }
});
