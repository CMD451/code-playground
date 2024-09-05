import React from "react";
import { useEffect, useState, useRef } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { useIsRunning } from "../hooks/useIsRunning";
import { okaidia } from '@uiw/codemirror-theme-okaidia';


import "../../styles/editor.css"

export default function Editor(props) {
    const lang = python
    const theme = okaidia
    const [code,setCode] = useState("")
    const isRunning = useIsRunning(props.websocketInstance)

    const handleChange = React.useCallback((val, viewUpdate) => {
        setCode(val)
        if(props.hasOwnProperty("onChange")){
            props.onChange(val)
        }
      }, []);
    

    return (
        <div className="editor panel-content">
            <CodeMirror
             value={code} 
             style={{ width: '100%' }} 
             height="1000px"
             theme={theme}
             extensions={[lang()]}
             onChange={handleChange} />
        </div>
    );
  } 