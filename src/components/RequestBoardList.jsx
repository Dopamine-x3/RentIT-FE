import React from "react";
import styled from "styled-components";
import RequestBoard from "./RequestBoard";

const requestData = [
  {
    id: 1,
    price: "₩10,000",
    productName: "상품 1",
    date: "2024년 7월 28일",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    price: "₩20,000",
    productName: "상품 2",
    date: "2024년 7월 29일",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    price: "₩30,000",
    productName: "상품 3",
    date: "2024년 7월 30일",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    price: "₩40,000",
    productName: "상품 4",
    date: "2024년 8월 1일",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    price: "₩50,000",
    productName: "상품 5",
    date: "2024년 8월 2일",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    price: "₩60,000",
    productName: "상품 6",
    date: "2024년 8월 3일",
    image: "https://via.placeholder.com/150",
  },
];

const RequestBoardList = () => {
  return (
    <RequestContainer>
      {requestData.map((request) => (
        <RequestBoard key={request.id} request={request} />
      ))}
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

export default RequestBoardList;
