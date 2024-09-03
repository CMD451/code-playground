import React from "react";
import { useEffect, useState, useRef } from "react";
import WebSocketInstance from "../websockets/websocket";
import Console from "./console/console";
import Editor from "./editor/editor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";



export default function App(props) {
    const [editorCode,setEditorCode] = useState("")


    useEffect(() => {
        WebSocketInstance.connect();
    }, [])

    function handleEditorChange(code){
        setEditorCode(code)
    }

    return (
        <div className="container">
            <PanelGroup autoSaveId="example" direction="vertical" >
                <Panel className="panel"  defaultSize={80}>
                    <Editor onChange={handleEditorChange}  websocketInstance={WebSocketInstance}    />
                </Panel>
                <PanelResizeHandle className="handle">

                </PanelResizeHandle>
                <Panel className="panel"  defaultSize={15}>
                    <Console websocketInstance={WebSocketInstance} code={editorCode}  />
                </Panel>
            </PanelGroup>   
        </div>   
    );
  } 