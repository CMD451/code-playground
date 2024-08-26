import React from "react";
import { useEffect, useState, useRef } from "react";

export default function Editor(props) {
    const [code,setCode] = useState("")

    function handleChange(event){
        setCode(event.target.value)
    }

    return (
        <div>
            <textarea onChange={handleChange} />
            <button onClick={()=>{props.websocketInstance.sendExecuteRequest(code)}}>Execute</button>
        </div>
    );
  } 