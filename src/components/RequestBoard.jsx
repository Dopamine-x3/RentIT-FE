import React from "react";
import styled from "styled-components";
import { formatRelativeTime } from "../utils/dateUtils";
import { useNavigate } from "react-router-dom";
const RequestBoard = ({ request }) => {
  if (!request) return null;

  const requestDate = new Date(request.createDate);
  const relativeTime = formatRelativeTime(requestDate);

  const navigate = useNavigate();

  const handleRequestClick = (id) => {
    console.log(`${id}클릭했습니다.`);
    navigate(`/product/${id}`);
  };

  return (
    <RequestCard onClick={() => handleRequestClick(request.id)}>
      <img src={request.imageUrls[0]} alt={request.title} />
      <RequestContent>
        <div>
          <h2>{request.price}</h2>
          <h4>{request.title}</h4>
        </div>
        <p>{relativeTime}</p>
      </RequestContent>
    </RequestCard>
  );
};
const RequestCard = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.25s ease-in-out, transform 0.25s ease-in-out;
  cursor: pointer; /* 클릭 가능한 카드임을 나타내기 위한 스타일 */

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-10px);
  }

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;

const RequestContent = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    margin: 0;
    font-size: 20px;
    color: #333;
  }

  h4 {
    margin: 10px 0;
    font-size: 16px;
    color: #404040;
  }

  p {
    margin: 5px 0 0;
    color: #acacac;
  }
`;

export default RequestBoard;
