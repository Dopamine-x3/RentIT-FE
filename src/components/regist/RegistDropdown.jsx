import React, { useState } from 'react';
import styled from 'styled-components';

const DivContainer = styled.div`
  display: flex;
  justify-content: start;
  border: 1px solid #CFCFCF;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  padding: 10px;
  font-size: 14px;
  border: none;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const categories = ["가전제품", "가구", "기타"];

const RegistDropdown = ({ setCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");

  const toggleDropdown = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = ( category) => {
    
    setSelectedCategory(category);
    setIsOpen(false);
    setCategory(category); // 선택된 카테고리를 상위 컴포넌트로 전달
  };

  return (
    <DivContainer>
      <DropdownContainer>
        <DropdownButton onClick={(e)=>toggleDropdown(e)}>
          {selectedCategory}
        </DropdownButton>
        <DropdownContent isOpen={isOpen}>
          {categories.map((category, index) => (
            <DropdownItem key={index} href="#" onClick={() => handleCategorySelect( category)}>
              {category}
            </DropdownItem>
          ))}
        </DropdownContent>
      </DropdownContainer>
    </DivContainer>
  );
};

export default RegistDropdown;
