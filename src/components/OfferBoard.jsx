import React from "react";
import styled from "styled-components";
import { formatRelativeTime } from "../utils/dateUtils";

const OfferBoard = ({ offer }) => {
  const createDate = new Date(offer.createDate); // 문자열을 Date 객체로 변환
  const relativeTime = formatRelativeTime(createDate); // 상대적인 시간 포맷

  return (
    <OfferItem>
      <OfferImg src={offer.imageUrls[0]} alt="img" />
      <OfferContents>
        <h5>{offer.title}</h5>
        <p>{offer.description}</p>
        <p>{relativeTime}</p> {/* 상대적인 시간 표시 */}
      </OfferContents>
    </OfferItem>
  );
};

// OfferBoard 스타일
const OfferItem = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  background: #fff;
  transition: box-shadow 0.25s ease-in-out, transform 0.25s ease-in-out;
  display: flex;
  flex-direction: column; /* Flexbox로 카드 내부 구성 */
  height: 100%; /* 높이 설정 */
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-10px);
  }
`;

const OfferImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const OfferContents = styled.div`
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h5 {
    margin: 0;
    font-size: 18px; /* 제목 크기 조정 */
    color: #333;
  }

  p {
    margin: 5px 0;
    color: #666;
    font-size: 14px; /* 설명 및 시간 크기 조정 */
  }
`;

export default OfferBoard;
