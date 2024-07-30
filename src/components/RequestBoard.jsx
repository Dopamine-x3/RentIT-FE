import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { formatRelativeTime } from "../utils/dateUtils";

const RequestBoard = ({ request }) => {
  if (!request) return null;

  const requestDate = new Date(request.date); // 문자열을 Date 객체로 변환
  const relativeTime = formatRelativeTime(requestDate); // 상대적인 시간 포맷

  return (
    <RequestCard>
      <img src={request.imageUrls[0]} alt={request.productName} />
      <RequestContent>
        <div>
          <h2>{request.price}</h2>
          <h4>{request.productName}</h4>
        </div>
        <p>{relativeTime}</p>
      </RequestContent>
    </RequestCard>
  );
};

RequestBoard.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired, // imageUrls로 수정
  }).isRequired,
};

const RequestCard = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.25s ease-in-out, transform 0.25s ease-in-out;

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
