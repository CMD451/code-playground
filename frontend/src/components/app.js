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
import { themes,setColorsFromTheme } from "./menu/theme";
import LanguageSelection from "./menu/languageSelection";

export default function App({ lang }) {
    const [editorCode,setEditorCode] = useState("")
    const [options,setOptions] = useState({
        'theme':'okaidia',
        'font':'monospace'
    })

    useEffect(() => {
        WebSocketInstance.setLang(lang)
        WebSocketInstance.connect();
        setColorsFromTheme(themes[options.theme])
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
    function handleFontChange(name,value){
        handleOptionsChange(name,value)
    }
    function handleThemeChange(name,value){
        handleOptionsChange(name,value)
        setColorsFromTheme(themes[value])

    }

    return (
        <div className="container">
            <SideMenu>
                <Options>
                    <ThemeSelect value={options.theme}   onChange={handleThemeChange}/>
                    <FontSelect  value={options.font}    onChange={handleFontChange}/>
                </Options>
                <div className="space"></div>
                <LanguageSelection/>
                
               
            </SideMenu>

            <PanelGroup autoSaveId="example" direction="vertical" >
                <Panel className="panel"  defaultSize={90}>
                    <Editor onChange={handleEditorChange}  websocketInstance={WebSocketInstance} theme={themes[options.theme]} />
                </Panel>
                <PanelResizeHandle className="handle">

                </PanelResizeHandle>
                <Panel className="panel"  defaultSize={5}>
                    <Console websocketInstance={WebSocketInstance} code={editorCode}  />
                </Panel>
            </PanelGroup>   
        </div>   
    );
  } 