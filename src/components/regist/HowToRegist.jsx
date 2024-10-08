import React, { useState } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #CFCFCF;
  border-radius: 10px;
  margin: 5px 0;
  width: 100%;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  flex: 1;
  margin: 0 10px;
`;

const DropdownButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #000000;
  cursor: pointer;
  width: 100%;
  text-align: center;
`;

const DropdownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  bottom: 100%; /* 이 속성으로 드롭다운이 버튼 위로 위치하도록 설정 */
  left: 0;
  background-color: #ffffff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  margin-bottom: 5px; /* 버튼과 드롭다운 사이에 여백 추가 */
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

const categories = {
  productStatus: ["새 제품", "중고 제품", "리퍼 제품"],
  deliveryMethod: ["택배", "퀵서비스", "직접 픽업"],
  shippingCost: ["무료", "착불", "선불"]
};

const HowToRegist = ({ setProductCondition, setDeliveryMethod, setDeliveryPrice }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selected, setSelected] = useState({
    productStatus: "제품상태",
    deliveryMethod: "배송방법",
    shippingCost: "배송비"
  });

  const toggleDropdown = (e,dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    e.preventDefault()
  };

  const handleCategorySelect = (dropdown, category) => {
    
    setSelected(prev => ({ ...prev, [dropdown]: category }));
    setOpenDropdown(null);

    // 상태를 상위 컴포넌트에 전달
    if (dropdown === 'productStatus') {
      setProductCondition(category);
    } else if (dropdown === 'deliveryMethod') {
      setDeliveryMethod(category);
    } else if (dropdown === 'shippingCost') {
      setDeliveryPrice(category);
    }
  };

  return (
    <Container>
      {Object.keys(categories).map((key) => (
        <DropdownContainer key={key}>
          <DropdownButton onClick={(e) => toggleDropdown(e,key)}>
            {selected[key]}
          </DropdownButton>
          <DropdownContent isOpen={openDropdown === key}>
            {categories[key].map((item, index) => (
              <DropdownItem
                key={index}
              
                onClick={() => handleCategorySelect(key, item)}
              >
                {item}
              </DropdownItem>
            ))}
          </DropdownContent>
        </DropdownContainer>
      ))}
    </Container>
  );
};

export default HowToRegist;
