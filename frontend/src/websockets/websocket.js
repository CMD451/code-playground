import ReconnectingWebSocket from 'reconnecting-websocket';


const SERVER_URL = "ws://127.0.0.1:8000/execute/"

class WebSocketService {
    static instance = null
    socketRef = null
    callbacks = {}

    static getInstance() {
        if (this.instance === null) {
            this.instance = new WebSocketService();
        }
        return this.instance
    }
    async connect() {
        console.log("connection in progress")
        console.log(`socket_ref = ${this.socketRef}`)

        if (this.socketRef !== null) {
            this.disconnect()
        }
        this.socket_ref = new ReconnectingWebSocket(SERVER_URL)

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

    handleOnMessage(textData) {
        super.handleOnMessage(textData)
        if(this.onActionCallbacks.hasOwnProperty(textData['action'])){
            textData['action'](textData)
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

}

   
const WebSocketInstance = CodePlaygroundWebSocketService.getInstance();

export default WebSocketInstance;