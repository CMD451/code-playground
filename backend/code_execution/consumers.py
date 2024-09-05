from channels.generic.websocket import AsyncWebsocketConsumer
import json
from . import containers
from asgiref.sync import async_to_sync

class CodeExecutionConsumer(AsyncWebsocketConsumer):
    container_image_name = ''

    
    async def connect(self):
        await self.accept()
        self.container_manager = containers.ContainerManager(self.container_image_name)

    async def send_message(self,action,data):
        await self.send(text_data= json.dumps({
                'action':action,
                'content':data
            }))
    
    async def on_container_log(self,log):  
        await self.send_message('output',log)

    async def on_container_start(self):
        await self.send_message('status',True)

    async def on_container_stop(self):
        await self.send_message('status',False)
        
    def set_container_callbacks(self):
        self.container_manager.set_on_message(async_to_sync(self.on_container_log))
        self.container_manager.set_on_start(async_to_sync(self.on_container_start))
        self.container_manager.set_on_stop(async_to_sync(self.on_container_stop))


    async def execute_action(self,json_data):
        if self.container_manager.is_running():
            self.container_manager.stop()
        self.set_container_callbacks()
        self.container_manager.set_code(json_data['content'])
        self.container_manager.start()
        
    async def input_action(self,json_data):
        if not self.container_manager.is_running():
            return
        self.container_manager.send_input_to_container(json_data['content'])

    async def stop_action(self,json_data):
        print("Reacived request to stop")
        if self.container_manager.is_running():
            print("Trying to stop container")
            self.container_manager.stop()

    actions = {
        'execute':execute_action,
        'input':input_action,
        'stop':stop_action
    }

    async def receive(self, text_data):
        json_data = json.loads(text_data)
        await self.actions[json_data['action']](self,json_data)

           
        

class PythonCodeExecutionConsumer(CodeExecutionConsumer):
    container_image_name = 'test_app2'

class CCodeExecutionConsumer(CodeExecutionConsumer):
    container_image_name = 'testc'



