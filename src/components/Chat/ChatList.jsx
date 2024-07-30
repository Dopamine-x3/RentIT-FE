import React from "react";
import styled from "styled-components";
import ChatItem from "../../components/Chat/ChatItem";
import arrowBottom from "../../assets/imgs/arrow-bottom.svg";

const chatItems = [
  { id: 1, userName: "Chat 1", productName: "자전거", date: "2024년 7월 28일" },
  { id: 2, userName: "Chat 2", productName: "카메라", date: "2024년 7월 28일" },
  { id: 3, userName: "Chat 3", productName: "게임기", date: "2024년 7월 28일" },
  { id: 1, userName: "Chat 1", productName: "자전거", date: "2024년 7월 28일" },
  { id: 2, userName: "Chat 2", productName: "카메라", date: "2024년 7월 28일" },
  { id: 3, userName: "Chat 3", productName: "게임기", date: "2024년 7월 28일" },
  { id: 1, userName: "Chat 1", productName: "자전거", date: "2024년 7월 28일" },
  { id: 2, userName: "Chat 2", productName: "카메라", date: "2024년 7월 28일" },
  { id: 3, userName: "Chat 3", productName: "게임기", date: "2024년 7월 28일" },
];

const ChatList = () => {
  return (
    <ChatListContainer>
      <ChatListHead>
        <p>전체 대화</p>
        <HeadImg src={arrowBottom} alt="arrow bottom" />
      </ChatListHead>
      <ChatListBody>
        {chatItems.map((item) => (
          <ChatItem key={item.id} item={item} />
        ))}
      </ChatListBody>
    </ChatListContainer>
  );
};

const ChatListContainer = styled.div`
  width: 30%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const ChatListHead = styled.div`
  width: 100%;
  height: 120px;
  padding: 20px;
  display: flex;
  align-items: center;

  p {
    font-weight: 600;
    font-size: 32px;
    line-height: 42px;
    letter-spacing: -0.5px;
    color: #373737;
  }
`;

const ChatListBody = styled.div`
  width: 100%;
  height: calc(100% - 120px);
  overflow-y: auto;
  padding: 10px;
`;

const HeadImg = styled.img`
  width: 20px;
  height: 15px;
  margin-left: 10px;
`;

export default ChatList;
