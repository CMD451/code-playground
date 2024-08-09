from django.urls import re_path
from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path("ws/execute/", consumers.CodeExecutionConsumer.as_asgi())
]