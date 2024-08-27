

import { useEffect, useState} from "react";


export function useIsRunning(webSocketInstance) {
    const [isRunning, setIsRunning] = useState(false);

    useEffect(()=>{
        webSocketInstance.subscribe((data)=>{
            setIsRunning(data['content'])
        },'status')
    },[])

   return isRunning;
}