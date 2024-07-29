import React from "react";
import styled from "styled-components";
import Header from "../components/layout/header";
import ChatList from "../components/Chat/ChatList";
import ChatRoom from "../components/Chat/ChatRoom";

const Chat = () => {
  return (
    <div>
      <Header />
      <ChatContainer>
        <ChatList />
        <ChatRoom />
      </ChatContainer>
    </div>
  );
};

const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #dadada;
`;

export default Chat;
