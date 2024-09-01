

import { useEffect, useState} from "react";


export function useConsole(webSocketInstance) {
    const [content, setContent] = useState([]);



    function onConsoleOutput(data){
        setContent(prev => (
            [...prev,data['content']]
        ));
    }

    useEffect(()=>{
        webSocketInstance.subscribe(onConsoleOutput,'output')
        return () => {
            webSocketInstance.unsubscribe(onConsoleOutput,'output')
          };
    },[])

    function sendInput(input){
        webSocketInstance.sendContainerInput(input)
        setContent(prev => (
            [...prev,input]
        ));
    }

    function clear(){
        setContent([])
    }

   return [content,sendInput,clear];
}