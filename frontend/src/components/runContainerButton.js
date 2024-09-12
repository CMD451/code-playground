import React from "react";
import { useEffect, useState, useRef } from "react";


export default function RunContainerButton({isRunning,isLoading,onButtonRun,onButtonStop}) {

    function generateButton(){
        let className = "console-stopped"
        let text = "Run"
        let onClick = onButtonRun
        if(isRunning){
            className = "console-running"
            text = "Stop"
            onClick = onButtonStop
        }
        if(isLoading){
            className = "console-loading"
            text = "..."
            onClick = onButtonStop
        }
        className+=" console-button"
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




