import ReconnectingWebSocket from 'reconnecting-websocket';


const SERVER_URL = "ws://127.0.0.1:8000/execute/"

class WebSocketService {
    socketRef = null
    callbacks = {}

    async connect() {
        console.log("connection in progress")
        if (this.socketRef !== null) {
            this.disconnect()
        }
        this.socketRef = new ReconnectingWebSocket(SERVER_URL)
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
    disconnect() {
        this.socketRef.close();
        this.socketRef = null;
    }

    handleOnMessage(text_data) {
        if (this.callbacks.hasOwnProperty('onMessage')) {
            this.callbacks['onMessage'](text_data)
        }
    }

    handleOnOpen() {
        if (this.callbacks.hasOwnProperty('onOpen')) {
            this.callbacks['onOpen']()
        }
    }

    sendMessage(data) {
        console.log("Sending msg")
        let jsonData = JSON.stringify({ ...data })
        try {
            this.socketRef.send(jsonData)
        }
        catch (error) {
            console.log(error)
        }

    }
    setOnOpenCallback(callback) {
        this.callbacks['onOpen'] = callback
    }
    setOnMessageCallback(callback) {
        this.callbacks['onMessage'] = callback
    }
}

class CodePlaygroundWebSocketService extends WebSocketService{
    onActionCallbacks = {}
    static instance = null

    static getInstance(){
        if (this.instance === null) {
            this.instance = new CodePlaygroundWebSocketService();
        }
        return this.instance;
    }

    handleOnMessage(textData) {
        console.log("msg was reacived")
        super.handleOnMessage(textData)
        console.log("action callbacks")
        if(this.onActionCallbacks.hasOwnProperty(textData['action'])){
            this.onActionCallbacks[textData['action']](textData)
        }
    }

    setOnOutputActionCallback(callback){
        this.setOnActionCallback('output',callback)
    }

    setOnStatusActionCallback(callback){
        this.setOnActionCallback('status',callback)
    }

    setOnActionCallback(action,callback){
        this.onActionCallbacks[action] = callback
    }

    sendExecuteRequest(code){
        console.log("sending request to execute",code)
        this.sendMessage({
            'action':'execute',
            'content':code
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