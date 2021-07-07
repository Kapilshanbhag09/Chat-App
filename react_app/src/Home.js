import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link, withRouter } from "react-router-dom";
import io from "socket.io-client";
import axios from 'axios';
import Chat_Logo from './assets/chat.png'
import Settings_Logo from './assets/settings.png';
import Call_Logo from './assets/call.png';
import Logout_Logo from './assets/logout.png'
import Pin_Black from "./assets/attach_black.png";
import Send_logo from "./assets/send.png"
import Mess_Sent_Sound from "./assets/sounds/mess_sent.mp3"
const socket = io("http://localhost:4000");
function Home() {
    const [myside,setmyside]=useState('Kapil')
    const [message,setmessage]=useState('')
    const [messagearr,setmessagearray]=useState([])
    const [newmessagearr,setnewmessagearr]=useState([])
    let mess_sent_audio = new Audio(Mess_Sent_Sound);
    const handlechange=(e)=>{
        setmyside(e.target.value)
    }
    const messageformsubmit=(e)=>{
        e.preventDefault();
        if(message==''){
            console.log("Empty message")
            alert("Empty message");
        }else{
        socket.emit('message_sent',({message,myside}));
        setmessage('')
        mess_sent_audio.play()
        }
    }
    const messageformtextchange=(e)=>{
        setmessage(e.target.value)
    }

    useEffect(()=>{
        axios.get(`http://localhost:4000/getmessage/`+myside)
        .then(res => {
          const messres = res.data;
          const tempmesres=[];
          for(let i=0;i<messres.length;i++){
              tempmesres[i]=[];
              tempmesres[i][0]=messres[i].sender;
              tempmesres[i][1]=messres[i].message;
          }
        setmessagearray([]);
          setmessagearray(tempmesres);
        });
        setnewmessagearr([]);
    },[myside])
    //This is for socket message recieved
    useEffect(()=>{
        socket.on("message_recieved",(data)=>{
           
            const tempmesarrnewdata=[];
            tempmesarrnewdata[0]=data.myside;
            tempmesarrnewdata[1]=data.message;
            console.log(newmessagearr)
            const tempmesarr=newmessagearr;
            console.log("Tempmesarr");
            console.log(tempmesarr);
            tempmesarr.push(tempmesarrnewdata);
            console.log("After new message");
            console.log(tempmesarr)
            setnewmessagearr([]);
            setnewmessagearr(tempmesarr)
        })
    },[])
    return (
        <div>
            <div className="sidebar">
                <div style={{width:"100%"}}>
            <div style={{marginBottom:"15px",display:'flex', flexDirection:'column', alignItems:'center'}}>
               
                <img src={Chat_Logo} width="40px"/>
               
                </div>
            <div className="sidebar_logos">
            <Link to="/calls">
                <img src={Call_Logo} width="40px"/>
                </Link>
                </div>
                <div   className="sidebar_logos">
                    <Link to="/settings">
                    <img src={Settings_Logo} width="40px"/>
                    </Link>
                </div>
                <div   className="sidebar_logos">
                <img src={Logout_Logo} width="40px"/>
                </div>
                </div>
</div>
<div className="chatbar">
    <div className="chatbar_header">
        <div>
            <p style={{color:"#E9E8EA",fontSize:"20px",fontWeight:"bold",marginLeft:"80px"}}>Messaging</p>
        </div>
        <div>
            <p>Search</p>
        </div>
    </div>
    <div className="chatbar_body">

    
    <div className="chatbar_people_list">
        <div className="chatbar_pl_chat">
            <p style={{color: 'white',fontSize:"20px",fontWeight:"bold",marginLeft:"30px"}}>Chats</p>
            <p style={{color: 'white',fontSize:"20px",fontWeight:"bold",marginRight:"30px"}}>+</p>
        </div>
        <div>
        <input type="text" name="name" myside={myside} onChange={handlechange} className="chatbar_pl_input" placeholder="Your name" autocomplete="off" />
        </div>
<h1 style={{color: "white"}}>{myside}</h1>
    </div>
    {//Chat box Conversation
    }
    <div className="chatbox">
        <div className="chatbox_logs_div">
            {
                messagearr.map((indmess)=>{
                    return(
                        indmess[0]==myside?
                            <div style={{display:'flex',alignItems:'end',justifyContent:'space-between'}}>
                            <div style={{backgroundColor:"110E17"}}></div>
                            <div style={{backgroundColor:"#4D38A2",marginTop:'10px',marginRight:'10px',borderRadius:"10px",padding:"10px",textOverflow : 'ellipsis',maxWidth:'70%'}}>
                            
                            <p style={{color:'white', fontSize:"10px",fontWeight:'bold'}}>You</p>
                            <p style={{color:'white', fontSize:"15px"}}>{indmess[1]}</p>
                            </div>
                            </div>
                            
                        :
                        <div style={{width:'100%',display:'flex'}}>
                        <div style={{backgroundColor:"#19182A",marginTop:'10px',marginLeft:'10px',borderRadius:"10px",padding:"10px",maxWidth:'70%',textOverflow : 'ellipsis'}}>
                            <p style={{color:'white', fontSize:"10px",fontWeight:"bold"}}>{indmess[0]}</p>
                            <p style={{color:'white', fontSize:"15px"}}>{indmess[1]}</p>
                        </div>
                        <div style={{backgroundColor:"110E17"}}></div>
                        </div>
                    
                    )
                })
            }
            {

    newmessagearr.map((indmess)=>{
        return(
            indmess[0]==myside?
                <div style={{display:'flex',alignItems:'end',justifyContent:'space-between'}}>
                <div style={{backgroundColor:"110E17"}}></div>
                <div style={{backgroundColor:"#4D38A2",marginTop:'10px',marginRight:'10px',borderRadius:"10px",padding:"10px",textOverflow : 'ellipsis',maxWidth:'70%'}}>
                
                <p style={{color:'white', fontSize:"10px",fontWeight:'bold'}}>You</p>
                <p style={{color:'white', fontSize:"15px"}}>{indmess[1]}</p>
                </div>
                </div>
                
            :
            <div style={{width:'100%',display:'flex'}}>
            <div style={{backgroundColor:"#19182A",marginTop:'10px',marginLeft:'10px',borderRadius:"10px",padding:"10px",maxWidth:'70%',textOverflow : 'ellipsis'}}>
                <p style={{color:'white', fontSize:"10px",fontWeight:"bold"}}>{indmess[0]}</p>
                <p style={{color:'white', fontSize:"15px"}}>{indmess[1]}</p>
            </div>
            <div style={{backgroundColor:"110E17"}}></div>
            </div>
        
        )
    })
            }
        </div>
        <div className="chatbox_text_div">
            <img src={Pin_Black} height="30px" style={{marginLeft:"10px"}}/>
            <form style={{width:"80%"}} autocomplete="off" onSubmit={messageformsubmit}>
            <input type="text" name="name" className="chatbox_text_input" value={message} placeholder="Write your message" onChange={messageformtextchange} autoFocus/>
            </form>
            <img src={Send_logo} height="30px" style={{marginRight:"10px"}} onClick={messageformsubmit}/>
        
        </div>
    </div>
    {
        //Chat Options
    }
    <div className="chat_options">
        <div>
            <p className="chat_to_name">Kapil Shanbhag</p>
        </div>
    </div>
    </div>
    
   
      </div>
  </div>
        
    )
}

export default Home
