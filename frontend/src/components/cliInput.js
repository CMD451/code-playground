import React from "react";
import {useState} from "react";


export default function CliInput(props) {
    const [content,setContent] = useState("")

    function handleChange(event){
        setContent(event.target.value)
    }
    function handleKeyDown(event){
        if(event.key === "Enter"){
            event.preventDefault()
            if(props.hasOwnProperty("onSend")){
                props.onSend(content)   
            }
            setContent("")
        }
    }

    return (  
        <div className="cli-input-container">
            <p className="prompt">
                \&#10095;
            </p>
            <textarea
            rows={1}
            className="console-text"
            wrap="off" 
            onChange={handleChange} 
            onKeyDown={handleKeyDown}
            value={content}>
                {content}
            </textarea>
        </div>
       
    );
  } 