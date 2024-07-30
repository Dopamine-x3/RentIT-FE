import React from "react";
import styled from "styled-components";
import RequestBoard from "./RequestBoard";

const RequestBoardList = ({ boards }) => {
  return (
    <RequestContainer>
      {boards.length > 0 ? (
        boards.map((request) => (
          <RequestBoard key={request.id} request={request} />
        ))
      ) : (
        <NoDataMessage>등록된 요청이 없습니다.</NoDataMessage>
      )}
    </RequestContainer>
  );
};

const RequestContainer = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NoDataMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #676767;
`;

export default RequestBoardList;
