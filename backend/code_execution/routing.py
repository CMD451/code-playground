from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path("execute/python", consumers.PythonCodeExecutionConsumer.as_asgi()),
    path("execute/c", consumers.CCodeExecutionConsumer.as_asgi())
]