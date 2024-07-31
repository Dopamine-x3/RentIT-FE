import React, { useState, useEffect, useRef } from 'react';
import { Div, FlexDiv, MaxWidthDiv } from '../components/globalStyle';
import HeaderNav from '../components/layout/header';
import useInput from '../hooks/useInput';
import { DescInput, PriceDiv, PriceInput, PriceSpan, RegistBtn, RegistTitle, TitleInput } from '../components/regist/RegistStyled';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/footer';
import ModalSeller from '../components/detail/ModalSeller';
import useDropdown from '../hooks/useDropdown';
import RegistDropdown from '../components/regist/RegistDropdown';
import HowToRegist from '../components/regist/HowToRegist';
import { postBoardItem } from '../apis/axios';
import Maps from '../components/regist/Map';
import ImageBlock from '../components/regist/ImageBlock';

function Regist() {
  const [buildingInfo, setBuildingInfo] = useState(null);
  const [productCondition, setProductCondition] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const userId = '선우야되냐?';

  const autofocus = useRef();
  const navigate = useNavigate();
  const { handleClose, isOpen } = useDropdown(true);
  const { values, onChange } = useInput({
    title: "",
    description: "",
    price: '',
  });

  const onInfoChange = (info) => {
    console.log("Building info received from Maps:", info);
    setBuildingInfo(info);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId || '');
    formData.append("title", values.title || '');
    formData.append("category", category || '');
    formData.append("price", values.price || '');
    formData.append("description", values.description || '');
    formData.append("product_condition", productCondition || '');
    formData.append("delivery_method", deliveryMethod || '');
    formData.append("delivery_price", deliveryPrice || '');
    formData.append("address_name", buildingInfo?.address || '');
    formData.append("building_name", buildingInfo?.content || '');

    if (images.length > 0) {
      images.forEach((file, index) => {
        formData.append("files", file, `file${index}`);
      });
    }

    try {
      const response = await postBoardItem(formData);
      console.log("Server response:", response);
      window.alert(response.message || '게시물 등록 완료');
      navigate('/product');
    } catch (error) {
      console.error("게시물 등록 요청 실패:", error);
      window.alert("게시물 등록 요청 실패");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    autofocus.current.focus();
  }, []);

  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv>
      <form onSubmit={onSubmitHandler}>
        <Div marginTop="10rem">
          <RegistTitle>대여물품 등록</RegistTitle>
        </Div>
        <Div width="100%" marginTop="2rem" $fDirection="row" jc="space-between" gap="2rem">
          <Div gap="1rem">
            <TitleInput
              ref={autofocus}
              name='title'
              placeholder='제목 : 상품명이 드러나도록 제목을 적어주세요!'
              value={values.title}
              onChange={onChange}
              maxLength={20}
            />
            <ImageBlock setImage={setImages} />
          </Div>
          <div style={{ height: '685px', border: '1px solid #D7D7D7' }}></div>
          <Div width="100%">
            
              <RegistDropdown setCategory={setCategory} />
              <PriceDiv>
                <PriceSpan>가격</PriceSpan>
                <PriceInput
                  min={1}
                  type='number'
                  name='price'
                  placeholder='가격을 책정해주세요'
                  value={values.price}
                  onChange={onChange}
                />
              </PriceDiv>
              <DescInput
                name='description'
                placeholder='해당 물품의 기종, 상태, 구매일자 등 상세하게 적어주세요!'
                value={values.description}
                onChange={onChange}
              />
              <HowToRegist
                setProductCondition={setProductCondition}
                setDeliveryMethod={setDeliveryMethod}
                setDeliveryPrice={setDeliveryPrice}
              />
              <Maps onInfoChange={onInfoChange} />
              <RegistBtn type="submit">등록하기</RegistBtn>
              </Div>
            
          </Div>
          </form>
        {isOpen && <ModalSeller handleClose={handleClose} word1={'이미지는 "한번에" 5장까지 첨부 가능합니다!'} />}
      </MaxWidthDiv>
      <Footer topRem={6} botRem={2} />
    </FlexDiv>
  );
}

export default Regist;
