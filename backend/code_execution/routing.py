from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path("execute/", consumers.CodeExecutionConsumer.as_asgi())
]