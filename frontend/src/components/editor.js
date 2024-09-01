import React from "react";
import { useEffect, useState, useRef } from "react";
import { useIsRunning } from "./hooks/useIsRunning";

import "../styles/editor.css"

export default function Editor(props) {
    const [code,setCode] = useState("")
    const isRunning = useIsRunning(props.websocketInstance)

    function handleChange(event){
        const newCode = event.target.value
        setCode(newCode)
        if(props.hasOwnProperty("onChange")){
            props.onChange(newCode)
        }
    }

    return (
        <div className="editor panel-content">
            <textarea className="editor-text" wrap="off" onChange={handleChange} value={code}>
                {code}
            </textarea>
        </div>
    );
  } 