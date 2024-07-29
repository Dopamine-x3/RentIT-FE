import React from "react";
import styled from "styled-components";
import basicIcon from "../../assets/imgs/basicIcon.png";

const ChatItem = ({ item }) => {
  return (
    <ChatItemContainer>
      <LeftWrapper>
        <BasicIcon src={basicIcon} alt="basic Icon" />
      </LeftWrapper>
      <RightWrapper>
        <ChattingRoomContant>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <h1>{item.userName}</h1>
            <h2>{item.date}</h2>
          </div>
          <div>
            <p>{item.productName}</p>
          </div>
        </ChattingRoomContant>
      </RightWrapper>
    </ChatItemContainer>
  );
};

const ChatItemContainer = styled.div`
  padding: 20px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-bottom: 1.5px solid #dddddd;
  box-sizing: border-box; /* Ensure padding and border are included in width and height */
`;

const LeftWrapper = styled.div`
  padding-right: 20px;
`;

const BasicIcon = styled.img`
  width: 60px;
  height: 60px;
  border: 1px solid #e2e2e2;
  border-radius: 50%;
`;

const RightWrapper = styled.div`
  width: 80%;
  height: 100%;
`;

const ChattingRoomContant = styled.div`
  height: 100%;

  h1 {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -0.5px;
    color: #383838;
  }

  h2 {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.5px;
    color: #aaaaaa;
    margin: 0 10px;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.5px;
    color: #383838;
  }
`;

export default ChatItem;
