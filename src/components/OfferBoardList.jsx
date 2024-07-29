import React from "react";
import styled from "styled-components";
import OfferBoard from "./OfferBoard";

const offerData = [
  { id: 1, title: "제목 1", description: "설명 1", date: "2024년7월28일" },
  { id: 2, title: "제목 2", description: "설명 2", date: "2024년7월28일" },
  { id: 3, title: "제목 3", description: "설명 3", date: "2024년7월28일" },
  { id: 4, title: "제목 4", description: "설명 4", date: "2024년7월28일" },
  { id: 5, title: "제목 5", description: "설명 5", date: "2024년7월28일" },
  { id: 6, title: "제목 6", description: "설명 6", date: "2024년7월28일" },
  { id: 7, title: "제목 7", description: "설명 7", date: "2024년7월28일" },
  { id: 8, title: "제목 8", description: "설명 8", date: "2024년7월28일" },
];

const OfferBoardList = () => {
  return (
    <OfferContainer>
      {offerData.map((offer) => (
        <OfferBoard key={offer.id} offer={offer} />
      ))}
    </OfferContainer>
  );
};

const OfferContainer = styled.div`
  display: grid;
  gap: 2.5rem;

  /* 작은 화면에서 2열 레이아웃 */
  @media (min-width: 640px) {
    /* sm */
    grid-template-columns: repeat(2, 1fr);
    gap: 5rem;
  }

  /* 큰 화면에서 3열 레이아웃 */
  @media (min-width: 1024px) {
    /* lg */
    grid-template-columns: repeat(3, 1fr);
    gap: 8.75rem;
  }

  /* 엑스트라 큰 화면에서 4열 레이아웃 */
  @media (min-width: 1280px) {
    /* xl */
    grid-template-columns: repeat(4, 1fr);
    gap: 8.75rem;
  }
`;

export default OfferBoardList;
