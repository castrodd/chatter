import socket from './ws-client';
import {ChatForm, ChatList} from './dom';

class ChatApp {
  constructor() {
    this.chatForm = new ChatForm('[data-chat="chat-form"]', '[data-chat="message-input"]');
    this.chatList = new ChatList('[data-chat="message-list"]', 'chatterbox');
    socket.init('ws://localhost:3001');
    socket.registerOpenHandler(() => {
      this.chatForm.init((text) => {
        let message = new ChatMessage({ message: text });
        socket.sendMessage(message.serialize());
      });
    });
    socket.registerMessageHandler((data) => {
      console.log('second', data);
      let message = new ChatMessage(data);
      this.chatList.drawMessage(message.serialize());
    })
  }
}

class ChatMessage {
  constructor({
    message: m,
    user: u='anon',
    timestamp: t=(new Date()).getTime()
  }) {
      this.message = m;
      this.user = u;
      this.timestamp = t;
    }
    serialize() {
      return {
        user: this.user,
        message: this.message,
        timestamp: this.timestamp
      };
    }
}

export default ChatApp;
