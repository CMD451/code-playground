import React from "react";
import { useEffect, useState, useRef } from "react";
import { useConsole } from "./hooks/useConsole";
import { useIsRunning } from "./hooks/useIsRunning";
import RunContainerButton from "./runContainerButton";
import Cli from "./cli";
import "../styles/console.css"

export default function Console(props) {
    const isRunning = useIsRunning(props.websocketInstance)
    const [content,sendInput,clearConsole] = useConsole(props.websocketInstance)


    function handleButtonRun(){
        clearConsole()
        props.websocketInstance.sendExecuteRequest(props.code)
    }

    return (    
        <div className="console panel-content">
            <div className="console-handle">
                <RunContainerButton
                    isRunning = {isRunning}
                    onButtonRun = {handleButtonRun}
                    onButtonStop = {()=>{props.websocketInstance.sendStopRequest()}}
                />
            </div>
            <div className="console-output">
                <Cli onSend={(text)=>{sendInput(text)}} content={content} />
            </div>
        </div>
    );
  } 