import React from "react";
import { useEffect, useState, useRef } from "react";
import WebSocketInstance from "../websockets/websocket";
import Console from "./console";
import Editor from "./editor";


export default function App(props) {


    useEffect(() => {
        WebSocketInstance.connect();
    }, [])


    return (
        <div style={{ backgroundColor: 'blue', padding: 20, display:"flex"
        }}>
            <Console websocketInstance={WebSocketInstance}   />
            <Editor  websocketInstance={WebSocketInstance}   />
        </div>
    );
  } 