import React from "react";
import { useEffect, useState, useRef } from "react";
import { useIsRunning } from "./hooks/useIsRunning";
import RunContainerButton from "./runContainerButton";

export default function Editor(props) {
    const [code,setCode] = useState("")
    const isRunning = useIsRunning(props.websocketInstance)

    function handleChange(event){
        setCode(event.target.value)
    }

    return (
        <div>
            <textarea onChange={handleChange} />
            <RunContainerButton
                isRunning = {isRunning}
                onButtonRun = {()=>{props.websocketInstance.sendExecuteRequest(code)}}
                onButtonStop = {()=>{props.websocketInstance.sendStopRequest()}}
            />
        </div>
    );
  } 