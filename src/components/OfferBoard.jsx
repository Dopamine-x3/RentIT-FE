import React from "react";
import styled from "styled-components";

const OfferBoard = ({ offer }) => {
  return (
    <OfferItem>
      <OfferImg
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt5mrj4ndQG8Kp3pTq8g7eljkuqncrsAXDGQ&s"
        }
        alt="img"
      />
      <OfferContents>
        <h5>{offer.title}</h5>
        <p>{offer.description}</p>
        <p>{offer.date}</p>
      </OfferContents>
    </OfferItem>
  );
};

// OfferBoard 스타일
const OfferItem = styled.div`
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  border: 1px solid #e0e0e0;
  background: #fff;
  transition: box-shadow 0.25s ease-in-out, transform 0.25s ease-in-out;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-10px);
  }
  h5 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  p {
    margin: 5px 0 0;
    color: #666;
  }
`;
const OfferImg = styled.img`
  width: 100%;
  height: 150px;
`;
const OfferContents = styled.div`
  padding: 10px;
  width: 100%;
  height: 150px;
`;
export default OfferBoard;
