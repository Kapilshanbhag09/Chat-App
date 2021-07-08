import React from 'react'
import './Login.css';
import GoogleLogo from './assets/google_logo.png'
import app,{googleprovider} from './Firebase1.js';
function Login(props) {
    

    const loginclicked=()=>{
        app.auth().signInWithPopup(googleprovider).then(function(result){
            localStorage.setItem('Emailid',result.user.email);
            localStorage.setItem('Name',result.user.displayName);
            localStorage.setItem('Photo',result.user.photoURL);
            props.history.push('/chat');
        })
    }
    return (
        <div className="login">
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
            <div className="login_box ">
                <p className="login_box_text">LOGIN TO CHAT APP</p>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <button onClick={loginclicked} className="google_login-button">
                    <div>
                    <img src={GoogleLogo} className="google_logo"/>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',height:'50px'}}>                    
                        <p className="google_text">oogle</p>
                    </div>
                </button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login
