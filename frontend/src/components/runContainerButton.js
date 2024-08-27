import React from "react";
import { useEffect, useState, useRef } from "react";
import WebSocketInstance from "../websockets/websocket";
import Console from "./console";
import Editor from "./editor";


export default function RunContainerButton(props) {

    function generateButton(){
        let className = "console-stopped"
        let text = "Run"
        let onClick = props.onButtonRun
        if(props.isRunning){
            className = "console-running"
            text = "Stop"
            onClick = props.onButtonStop
        }
        return (
            <button className={className} onClick={onClick}>
                {text}
            </button>
        )
    }

    return (
        <React.Fragment>
           {generateButton()}
        </React.Fragment>
    );
  } 




