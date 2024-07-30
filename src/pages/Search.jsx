import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // useLocation 훅을 사용하여 전달된 상태를 받음
import Header from "../components/layout/header";
import styled from "styled-components";
import searchIcon from "../assets/imgs/search.svg";
import offerIcon from "../assets/imgs/offerIcon.svg";
import requestIcon from "../assets/imgs/requestIcon.svg";
import RequestBoardList from "../components/RequestBoardList";
import OfferBoardList from "../components/OfferBoardList";
import { getRentBoards } from "../apis/axios";

const Search = () => {
  const location = useLocation();
  const initialCategory = location.state?.category || "offer";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [rentBoards, setRentBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRentBoards();
        setRentBoards(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <SearchContainer>
      <Header />
      <SearchHead>
        <SearchBox>
          <SearchImg src={searchIcon} alt="searchIcon" />
          <input type="text" placeholder="검색어를 입력하세요" />
        </SearchBox>
        <SearchCategory>
          <SearchCategoryMenu>
            <CategoryItem
              isActive={selectedCategory === "offer"}
              onClick={() => handleCategoryChange("offer")}
            >
              <img src={offerIcon} alt="icon" />
              <p>빌리다</p>
            </CategoryItem>
            <CategoryItem
              isActive={selectedCategory === "request"}
              onClick={() => handleCategoryChange("request")}
            >
              <img src={requestIcon} alt="icon" />
              <p>빌려주다</p>
            </CategoryItem>
          </SearchCategoryMenu>
          <UnderBarContainer selectedCategory={selectedCategory}>
            <UnderBar selectedCategory={selectedCategory} />
          </UnderBarContainer>
        </SearchCategory>
      </SearchHead>
      <SearchBody>
        {selectedCategory === "offer" ? (
          <OfferBoardList boards={rentBoards} />
        ) : (
          <RequestBoardList boards={rentBoards} />
        )}
      </SearchBody>
    </SearchContainer>
  );
};

const SearchContainer = styled.div``;

const SearchHead = styled.div`
  margin-top: 3.5rem;
  width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 3%;
  height: 64px;
  border: 1px solid black;

  input {
    height: 3rem;
    width: 100%;
    border: none;
    outline: none;
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;

const SearchImg = styled.img`
  height: 36px;
`;

const SearchCategory = styled.div`
  margin-top: 5%;
`;

const SearchCategoryMenu = styled.div`
  width: 240px;
  display: flex;
  justify-content: space-between;
`;

const CategoryItem = styled.div`
  width: 240px;
  margin: 20px 0;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.3s ease;
  color: ${({ isActive }) => (isActive ? "#000" : "#868e96")};

  img {
    height: 24px;
    margin-right: 10px;
  }

  p {
    margin-left: 10px;
  }
`;

const UnderBarContainer = styled.div`
  width: 240px;
  display: flex;

  position: relative;
`;

const UnderBar = styled.div`
  width: 120px;
  height: 2px;
  background-color: #000000;
  border-radius: 30px;
  position: absolute;
  bottom: 0;
  left: ${({ selectedCategory }) =>
    selectedCategory === "offer" ? "0" : "calc(100% - 120px)"};
  transition: left 0.3s ease;
`;

const SearchBody = styled.div`
  width: 100%;
  padding: 5% 10% 0 10%;
`;

export default Search;
