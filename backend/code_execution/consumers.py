from channels.generic.websocket import AsyncWebsocketConsumer
import json
from . import temp
from asgiref.sync import async_to_sync


class CodeExecutionConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        await self.accept()
        self.container_handler = temp.ContainerHandler("test_app2")

    async def send_message(self,action,data):
        await self.send(text_data= json.dumps({
                'action':action,
                'content':data
            }))
        
    async def on_container_log(self,log):
        json_data = {'message':log}
        await self.send_message('container_output',json_data)


    async def execute_action(self,json_data):
        if self.container_handler.running:
            self.container_handler.stop()
        self.container_handler.set_on_message(async_to_sync(self.on_container_log))
        self.container_handler.set_code(json_data['code'])
        self.container_handler.start()
        

    async def input_action(self,json_data):
        if not self.container_handler.running:
            return
        self.container_handler.send_input(json_data['input'])


    actions = {
        'execute':execute_action,
        'input':input_action,
    }

    async def receive(self, text_data):
        json_data = json.loads(text_data)
        await self.actions[json_data['action']](self,json_data)

           


