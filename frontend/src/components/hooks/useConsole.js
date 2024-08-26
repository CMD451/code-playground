

import { useEffect, useState} from "react";


export function useConsole(webSocketInstance) {
    const [content, setContent] = useState("");

    useEffect(()=>{
        webSocketInstance.setOnOutputActionCallback((data)=>{
            setContent(prev => (
                prev+data['content']
            ));
        })
    },[])

    function sendInput(input){
        webSocketInstance.sendInput(input)
    }

    function clear(){
        setContent("")
    }

   return [content,sendInput,clear];
}