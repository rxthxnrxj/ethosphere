// src/Chat.js
import React, { useState } from 'react';
import { Websocket } from 'react-websocket';

const Chat = ({ roomName }) => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const handleData = (data) => {
        const parsedData = JSON.parse(data);
        setChat([...chat, parsedData.message]);
    };

    const sendMessage = () => {
        if (message.trim() !== '') {
            const data = {
                message: message,
                roomName: roomName,
            };
            websocket.sendMessage(JSON.stringify(data));
            setMessage('');
        }
    };

    return (
        <div>
            <div>
                {chat.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>

            <Websocket
                url={`ws://127.0.0.1:8000/ws/chat/${roomName}/`}
                onMessage={handleData}
                ref={(socket) => {
                    websocket = socket;
                }}
            />
        </div>
    );
};

let websocket;

export default Chat;
