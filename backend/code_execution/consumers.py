from channels.generic.websocket import AsyncWebsocketConsumer
import json
from . import containers
from asgiref.sync import async_to_sync

class CodeExecutionConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        await self.accept()
        self.container_manager = containers.ContainerManager()

    async def send_message(self,action,data):
        await self.send(text_data= json.dumps({
                'action':action,
                'content':data
            }))
    
    async def on_container_log(self,log):  
        #json_data = {'message':log}
        await self.send_message('output',log)

    async def execute_action(self,json_data):
        if self.container_manager.is_running():
            self.container_manager.stop()
        self.container_manager.set_on_message(async_to_sync(self.on_container_log))
        self.container_manager.set_code(json_data['content'])
        # self.container_manager.
        print("container start")
        self.container_manager.start()
        
    async def input_action(self,json_data):
        if not self.container_manager.is_running():
            return
        self.container_manager.send_input_to_container(json_data['input'])

    async def stop_action(self,json_data):
        self.container_manager.stop()

    actions = {
        'execute':execute_action,
        'input':input_action,
        'stop':stop_action
    }

    async def receive(self, text_data):
        json_data = json.loads(text_data)
        await self.actions[json_data['action']](self,json_data)

           


