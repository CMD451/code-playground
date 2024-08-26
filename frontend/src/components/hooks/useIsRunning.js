

import { useEffect, useState} from "react";


export function useIsRunning(webSocketInstance) {
    const [isRunning, setIsRunning] = useState(true);

    useEffect(()=>{
        webSocketInstance.setOnOutputActionCallback((data)=>{
            setIsRunning(data['status'])
        })
    },[])

   return isRunning;
}