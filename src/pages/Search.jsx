import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/layout/header";
import styled from "styled-components";
import searchIcon from "../assets/imgs/search.svg";
import offerIcon from "../assets/imgs/offerIcon.svg";
import requestIcon from "../assets/imgs/requestIcon.svg";
import RequestBoardList from "../components/RequestBoardList";
import OfferBoardList from "../components/OfferBoardList";
import { getRentBoards, getSearch } from "../apis/axios";

const Search = () => {
  const location = useLocation();
  const initialCategory = location.state?.category || "offer";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [rentBoards, setRentBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRentBoards();
        setRentBoards(data || []);
      } catch (err) {
        setError(err);
        setRentBoards([]); // 에러 발생 시 빈 배열로 설정
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색어가 변경될 때마다 데이터를 가져오기
  useEffect(() => {
    const fetchSearchData = async () => {
      if (searchQuery.trim()) {
        setLoading(true);
        try {
          const data = await getSearch(searchQuery);
          setRentBoards(data || []); // 검색어를 기반으로 데이터 가져오기, 데이터가 없을 경우 빈 배열 설정
        } catch (err) {
          setError(err);
          setRentBoards([]); // 에러 발생 시 빈 배열로 설정
        } finally {
          setLoading(false);
        }
      } else {
        // 검색어가 없을 경우 초기 데이터를 불러옵니다
        const data = await getRentBoards();
        setRentBoards(data || []);
      }
    };

    const debounceFetch = setTimeout(fetchSearchData, 500); // 500ms 디바운스

    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

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
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </SearchBox>
        <SearchCategory>
          <SearchCategoryMenu>
            <CategoryItem
              $isActive={selectedCategory === "offer"}
              onClick={() => handleCategoryChange("offer")}
            >
              <img src={offerIcon} alt="icon" />
              <p>빌리다</p>
            </CategoryItem>
            <CategoryItem
              $isActive={selectedCategory === "request"}
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
        <ResultsMessage>
          총 {rentBoards.length} 포스트를 찾았습니다.
        </ResultsMessage>
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
  border-radius: 4px;
  background-color: #f8f9fa;

  input {
    height: 3rem;
    width: 100%;
    border: none;
    outline: none;
    font-size: 1.5rem;
    line-height: 2rem;
    padding: 0 1rem;
    background-color: #f8f9fa;
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
  color: ${({ $isActive }) => ($isActive ? "#000" : "#868e96")};

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
  padding: 0 10% 5% 10%;
`;

const ResultsMessage = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 3% 0 5% 0;
  text-align: center;
`;

export default Search;
