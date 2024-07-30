// ProductDetail.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  width: 566px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
`;



const InfoBlock = styled.div`
 justify-content: center;
 align-items: center;
 display: flex;
 flex-direction: column;
 margin: 20px 0;
`;

const Line = styled.div`
    border-right: 1px solid gray;
 
`

const Label = styled.label`
  font-weight: bold;
  font-size: 20px;
`;

const Value = styled.p`
  margin: 4px 0;
  justify-content: center;
`;

const HowProduct = ({ product }) => {
    return (
        <Container>

            <InfoBlock>
                <Label>상품 상태</Label>
                <Value>{product.status}</Value>
            </InfoBlock>
            <Line />
            <InfoBlock>
                <Label>거래 방식</Label>
                <Value>{product.tradeMethod}</Value>
            </InfoBlock>
            <Line />
            <InfoBlock>
                <Label>배송비</Label>
                <Value>{product.shippingFee}</Value>
            </InfoBlock>
        </Container>
    );
};

export default HowProduct;
