import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  initializeSocket,
  sendMessage,
  disconnectSocket,
} from "../../apis/socket";

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { userName: "User1", content: "Hello!", time: "10:00 AM" },
    { userName: "User2", content: "Hi there!", time: "10:05 AM" },
    { userName: "User1", content: "How are you?", time: "10:10 AM" },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const { userName, roomName } = useParams();
  const messageBoxRef = useRef(null);

  useEffect(() => {
    const handleMessageReceived = (parsedMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          userName: parsedMessage.userName,
          content: parsedMessage.message,
          time: parsedMessage.time,
        },
      ]);
    };

    initializeSocket(
      "ws://43.202.160.134:8080/chat",
      roomName,
      handleMessageReceived
    );

    return () => {
      disconnectSocket();
    };
  }, [roomName]);

  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      sendMessage(roomName, userName, messageInput);
      setMessageInput("");
      event.preventDefault();
    }
  };

  const scrollToBottom = () => {
    if (messageBoxRef.current !== null) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatRoomContainer>
      <ChatBox ref={messageBoxRef}>
        <ul>
          {messages.map((message, index) => (
            <Message
              key={index}
              userName={message.userName}
              currentUser={userName}
            >
              <p className="userName">
                {message.userName !== userName ? message.userName : ""}
              </p>
              <MessageContent
                className="content"
                currentUser={userName === message.userName}
              >
                {message.content}
              </MessageContent>
              <MessageDate className="date">{message.time}</MessageDate>
            </Message>
          ))}
        </ul>
      </ChatBox>
      <SendBox>
        <textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="메시지 입력"
          onKeyDown={handleOnKeyDown}
        />
        <button
          onClick={() => {
            sendMessage(roomName, userName, messageInput);
            setMessageInput("");
          }}
        >
          보내기
        </button>
      </SendBox>
    </ChatRoomContainer>
  );
};

const ChatRoomContainer = styled.div`
  width: 70%;
  height: 100%;
  background-color: #fdfdfd;
`;

const ChatBox = styled.div`
  height: calc(100% - 80px);
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const SendBox = styled.div`
  padding: 10px;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;

  textarea {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    resize: none;
    min-height: 40px;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Message = styled.li`
  padding: 10px;
  margin-bottom: 10px;
  align-items: ${(props) =>
    props.userName === props.currentUser ? "flex-end" : "flex-start"};

  border-radius: 10px;
  display: flex;
  flex-direction: column;

  .userName {
    font-size: 12px;
    color: #c1c0c0;
    margin-bottom: 5px;
  }
`;

const MessageContent = styled.p`
  background-color: ${(props) =>
    props.currentUser ? "#fffc97" : "rgb(215, 237, 198)"};
  border-radius: ${(props) =>
    props.currentUser ? "10px 0px 10px 10px" : "0px 10px 10px 10px"};
  padding: 10px;

  word-wrap: break-word;
`;

const MessageDate = styled.span`
  font-size: 8px;
  color: #b8b8b8;
  margin-top: 5px;
  align-items: ${(props) => (props.currentUser ? "flex-end" : "flex-start")};
`;

export default ChatRoom;
