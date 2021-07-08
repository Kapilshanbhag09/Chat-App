import React from 'react'
import { View, Text,TouchableOpacity,Image,StyleSheet, Dimensions } from 'react-native'
import GoogleLogo from '../assets/google_logo.png';
export default function Login() {
    const loginclicked=()=>{
        console.log("Login Clicked");
    }
    return (
        <View style={styles.login}>
        <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
        <View style={styles.login_box }>
            <Text style={styles.login_box_text}>LOGIN TO CHAT APP</Text>
            <View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <TouchableOpacity onPress={loginclicked} style={styles.google_login_button}>
                <View>
                <Image source={GoogleLogo} style={styles.google_logo}/>
                </View>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>                    
                    <Text style={styles.google_text}>oogle</Text>
                </View>
            </TouchableOpacity>
            </View>
        </View>
        </View>
    </View>
    )
}
const styles=StyleSheet.create({
    login:{
        backgroundColor:'#110E17',
        height: Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    login_box:{
        backgroundColor:'#110E17',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#251C31',

        
    },
    login_box_text:{
        color:'white',
        fontSize:30,
        fontWeight:'bold',
        margin:10,
    },
    google_login_button:{
    backgroundColor: '#4D38A2',
    display: 'flex',
    flexDirection:'row',
    borderRadius:10,
    margin:10,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10,
    },
    google_logo:{
        width:50,
        resizeMode:'contain',
        height:50,
    },
    google_text:{
        fontSize: 20,
        color:'white',
        fontWeight:'bold',
        marginLeft:5,
        
    }
});
