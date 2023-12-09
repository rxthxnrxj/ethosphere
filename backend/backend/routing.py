from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
import base.routing

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(
        base.routing.websocket_urlpatterns
    ),
})
