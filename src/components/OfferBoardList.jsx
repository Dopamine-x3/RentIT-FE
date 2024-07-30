import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import OfferBoard from "./OfferBoard";

const OfferBoardList = ({ boards }) => {
  const navigate = useNavigate();

  const handleRequestClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <OfferContainer>
      {boards.length > 0 ? (
        boards.map((offer) => (
          <OfferBoard
            key={offer.id}
            offer={offer}
            onClick={() => handleRequestClick(offer.id)}
          />
        ))
      ) : (
        <NoDataMessage>등록된 요청이 없습니다.</NoDataMessage>
      )}
    </OfferContainer>
  );
};

const NoDataMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #676767;
`;

const OfferContainer = styled.div`
  display: grid;
  gap: 8.5rem; /* 공백을 줄였습니다. */

  /* 작은 화면에서 1열 레이아웃 */
  @media (min-width: 640px) {
    /* sm */
    grid-template-columns: repeat(2, 1fr); /* 2열 레이아웃 */
  }

  /* 큰 화면에서 3열 레이아웃 */
  @media (min-width: 1024px) {
    /* lg */
    grid-template-columns: repeat(3, 1fr); /* 3열 레이아웃 */
  }

  /* 엑스트라 큰 화면에서 4열 레이아웃 */
  @media (min-width: 1280px) {
    /* xl */
    grid-template-columns: repeat(4, 1fr); /* 4열 레이아웃 */
  }
`;

export default OfferBoardList;
