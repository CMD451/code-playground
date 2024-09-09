import React from "react";
import { useEffect, useState, useRef } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { useIsRunning } from "../hooks/useIsRunning";
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { oneDark } from "@uiw/react-codemirror";
import {abcdef} from '@uiw/codemirror-themes-all'


import "../../styles/editor.css"

export default function Editor({onChange,websocketInstance,theme}) {
    const lang = python
    const selectedTheme = theme ? theme : abcdef
    const [code,setCode] = useState("")


    const handleChange = React.useCallback((val, viewUpdate) => {
        setCode(val)
        if(onChange){
            props.onChange(val)
        }
      }, []);
    
    return (
        <div className="editor panel-content">
           
            <CodeMirror
             value={code} 
             style={{ width: '100%' }} 
             height="1000px"
             theme={selectedTheme}
             extensions={[lang()]}
             onChange={handleChange} />
        </div>
    );
  } 