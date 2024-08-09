from channels.generic.websocket import AsyncWebsocketConsumer

class CodeExecutionConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        await self.accept()

    async def receive(self, text_data):
           pass
           


