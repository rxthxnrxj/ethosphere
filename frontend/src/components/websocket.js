import { Websocket } from 'react-websocket';

const WebSocketInstance = {
    socket: null,
    callbacks: null,

    connect: (roomName) => {
        WebSocketInstance.socket = `ws://http://127.0.0.1:8000/ws/chat/${roomName}/`;

        WebSocketInstance.socket.onopen = () => {
            console.log('WebSocket connected');
        };

        WebSocketInstance.socket.onmessage = (e) => {
            WebSocketInstance.callbacks(JSON.parse(e.data));
        };
    },

    disconnect: () => {
        WebSocketInstance.socket.close();
        console.log('WebSocket disconnected');
    },

    addCallbacks: (messageCallback, chatCallback) => {
        WebSocketInstance.callbacks = messageCallback;
        WebSocketInstance.socket.onmessage = (e) => {
            chatCallback(JSON.parse(e.data));
        };
    },

    newChatMessage: (message) => {
        WebSocketInstance.socket.send(JSON.stringify(message));
    },
};

export default WebSocketInstance;
