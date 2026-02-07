from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<appointment_id>\w+)/$', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/video-call/(?P<room_name>\w+)/$', consumers.VideoCallConsumer.as_asgi()),
]