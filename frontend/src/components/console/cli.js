import React from "react";
import { useEffect, useState} from "react";
import CliInput from "./cliInput";
import "../../styles/cli.css"


export default function Cli(props) {
    function handleChange(line){
        if(props.hasOwnProperty("onSend")){
            props.onSend(line)
        }
    }

    const linesJsx = props.content.map((line)=>{
        let i = 0;
        return(
            <p className="cli-output output" key={++i}>
                {line}
            </p>
        )
    }) 
    return (
       <div className="cli-container">
            {linesJsx}
            <CliInput onSend={handleChange} />
       </div>
    );
  } 