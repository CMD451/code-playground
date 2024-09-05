import ReconnectingWebSocket from 'reconnecting-websocket';


const SERVER_URL = "ws://127.0.0.1:8000/execute/"


class Observable{
    observers = {};

    
    subscribe(func,eventName){
    if(!this.observers.hasOwnProperty(eventName)){
        this.observers[eventName] = new Array()
    }
    this.observers[eventName].push(func)
    }
    
    unsubscribe(func,eventName) {
    if(this.observers.hasOwnProperty(eventName)){
        this.observers[eventName] = this.observers[eventName].filter((observer) => observer !== func);
    }
    }
    
    notify(data,eventName) {
    if(this.observers.hasOwnProperty(eventName)){
        this.observers[eventName].forEach((observer) => observer(data));
    }
    }
}



class WebSocketService extends Observable {
    socketRef = null

    async connect() {
        console.log("connection in progress")
        if (this.socketRef !== null) {
            this.disconnect()
        }
        this.socketRef = new ReconnectingWebSocket(this.getUrl())
        console.log(`socket_ref = ${this.socketRef}`)

        this.socketRef.onopen = () => {
            this.handleOnOpen();
        };
        this.socketRef.onmessage = e => {
            this.handleOnMessage(JSON.parse(e.data));
        };
        this.socketRef.onerror = e => {
            console.log(e.message);
        };
        this.socketRef.onclose = () => {
            console.log("WebSocket closed");
        };

    }
    getUrl(){
        return SERVER_URL
    }
    disconnect() {
        this.socketRef.close();
        this.socketRef = null;
    }

    handleOnMessage(text_data) {   
        this.notify(text_data,'onMessage')
    }

    handleOnOpen() {
        this.notify({},'onOpen')
    }

    sendMessage(data) {
        let jsonData = JSON.stringify({ ...data })
        try {
            this.socketRef.send(jsonData)
        }
        catch (error) {
            console.log(error)
        }

    }
}

class CodePlaygroundWebSocketService extends WebSocketService{
    static instance = null
    lang = "python"

    static getInstance(){
        if (this.instance === null) {
            this.instance = new CodePlaygroundWebSocketService();
        }
        return this.instance;
    }
    setLang(lang){
        this.lang = lang
    }
    getUrl(){
        return SERVER_URL+this.lang
    }
    handleOnMessage(textData) {
        super.handleOnMessage(textData)
        console.log(textData['action'])
        this.notify(textData,textData['action'])
    }

    sendExecuteRequest(code){
        console.log("sending request to execute",code)
        this.sendMessage({
            'action':'execute',
            'content':code
        })
    }

    sendStopRequest(){
        console.log("sending request to stop")
        this.sendMessage({
            'action':'stop'
        })
    }

    sendContainerInput(data){
        this.sendMessage({
            'action':'input',
            'content':data
        })
    }

}


const WebSocketInstance = CodePlaygroundWebSocketService.getInstance();
export default WebSocketInstance;