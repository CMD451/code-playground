import React from "react";
import { useEffect, useState, useRef } from "react";
import WebSocketInstance from "../websockets/websocket";
import Console from "./console/console";
import Editor from "./editor/editor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SideMenu from "./menu/sideMenu";
import Options from "./menu/options";
import ThemeSelect from "./menu/themeSelect";
import FontSelect from "./menu/fontSelect";
import { okaidia } from "@uiw/codemirror-themes-all";




function setColorsFromTheme(theme){
    const cssString = theme[0][1].value.rules[0];

    let backgroundColorMatch = cssString.match(/background-color:\s*([^;]+);/);
    let colorMatch = cssString.match(/ color:\s*([^;]+);/);

    const backgroundColor = backgroundColorMatch ? backgroundColorMatch[1].trim() : null;
    const color = colorMatch ? colorMatch[1].trim() : null;

    root.style.setProperty('--color-panel-background',backgroundColor );
    root.style.setProperty('--color-panel', color);
    root.style.setProperty('--color-default', color);
}


export default function App({ lang }) {
    const [editorCode,setEditorCode] = useState("")
    const [options,setOptions] = useState({
        'theme':okaidia,
    })

    useEffect(() => {
        WebSocketInstance.setLang(lang)
        WebSocketInstance.connect();
    }, [])

    function handleEditorChange(code){
        setEditorCode(code)
    }

    function handleOptionsChange(name,value){
        setOptions({
            ...options,
            [name]:value
        })
    }

    return (
        <div className="container">
            <SideMenu>
                <Options>
                    <ThemeSelect onChange={handleOptionsChange}/>
                    <FontSelect  onChange={handleOptionsChange}/>
                </Options>
            </SideMenu>

            <PanelGroup autoSaveId="example" direction="vertical" >
                <Panel className="panel"  defaultSize={80}>
                    <Editor onChange={handleEditorChange}  websocketInstance={WebSocketInstance} theme={options.theme} />
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