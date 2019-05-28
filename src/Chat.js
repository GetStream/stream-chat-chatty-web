import React, { Component } from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
  MessageList,
  MessageInput
} from "stream-chat-react";
import { StreamChat } from "stream-chat";

import "./App.css";
import "stream-chat-react/dist/css/index.css";

class App extends Component {
  constructor(props) {
    super(props);

    const { id, name, image } = JSON.parse(sessionStorage.getItem("userData"));

    this.client = new StreamChat(process.env.REACT_APP_STREAM_KEY);

    this.client.setUser(
      {
        id,
        name,
        image
      },
      sessionStorage.getItem("tokenData")
    );

    this.channel = this.client.channel(
      process.env.REACT_APP_CHANNEL_TYPE,
      process.env.REACT_APP_CHANNEL_NAME,
      {
        image: "https://i.imgur.com/LmW57kB.png",
        name: "Feeling Chatty with Kathy"
      }
    );
  }

  render() {
    return (
      <Chat client={this.client} theme={"messaging light"}>
        <Channel channel={this.channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    );
  }
}

export default App;
