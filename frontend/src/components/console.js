import React from "react";
import { useEffect, useState, useRef } from "react";
import { useConsole } from "./hooks/useConsole";
import { useIsRunning } from "./hooks/useIsRunning";
import "../styles/console.css"

export default function Console(props) {
    const isRunning = useIsRunning(props.websocketInstance)
    const [content,sendInput,clearConsole] = useConsole(props.websocketInstance)

    return (
        <div>
            <p className="output" >{content}</p>
        </div>
    );
  } 