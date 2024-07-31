import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '../components/layout/header';
import Footer from '../components/layout/footer';
import Maps from '../components/regist/Map';
import { Div, FlexDiv, MaxWidthDiv } from '../components/globalStyle';
import { DescInput, PriceDiv, PriceInput, PriceSpan, RegistBtn, RegistTitle, TitleInput } from '../components/regist/RegistStyled';
import useInput from '../hooks/useInput';
import ModalSeller from '../components/detail/ModalSeller';
import useDropdown from '../hooks/useDropdown';
import RegistDropdown from '../components/regist/RegistDropdown';
import HowToRegist from '../components/regist/HowToRegist';
import ImageBlock from '../components/regist/ImageBlock';
import { useParams } from "react-router-dom";
import { getRentBoardItem } from "../apis/axios";


const CreateBoard = () => {
  const userID = localStorage.getItem("userID");

  const [formData, setFormData] = useState({
    userId: userID,
    title: '',
    category: '',
    price: '',
    description: '',
    product_condition: '',
    delivery_method: '',
    delivery_price: '',
    address_name: '',
    building_name: '',
    files: []
  });
  const { id } = useParams();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [buildingInfo, setBuildingInfo] = useState(null);
  const [productCondition, setProductCondition] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState('');
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState({});
  const { values, onChange } = useInput({
    title: "",
    description: "",
    price: '',
  });

  const navigate = useNavigate();
  const { handleClose, isOpen } = useDropdown(true);
  const autofocus = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    autofocus.current.focus();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getRentBoardItem(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);


  
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'files') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files
      }));
      const fileArray = Array.from(files);
      const previews = fileArray.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("userId",userID);
    data.append("title", formData.title || '');
    data.append("category", category || formData.category);
    data.append("price", formData.price || '');
    data.append("description", formData.description || '');
    data.append("product_condition", productCondition || formData.product_condition);
    data.append("delivery_method", deliveryMethod || formData.delivery_method);
    data.append("delivery_price", deliveryPrice || formData.delivery_price);
    data.append("address_name", buildingInfo?.address || formData.address_name);
    data.append("building_name", buildingInfo?.content || formData.building_name);

    if (formData.files.length > 0) {
      formData.files.forEach((file, index) => {
        data.append("files", file, `file${index}`);
      });
    }

    try {
      const response = await axios.post('http://3.36.161.37/api/rentboards', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // const newProductId = response.data.id; // Assuming the API returns the new product ID in response.data.id

      
      setFormData({
        userId: userID,
        title: '',
        category: '',
        price: '',
        description: '',
        product_condition: '',
        delivery_method: '',
        delivery_price: '',
        address_name: '',
        building_name: '',
        files: []
      });
      setImagePreviews([]);
      alert('게시물 등록이 완료되었습니다');
      navigate(`/`); // Navigate to the new product page with the correct ID
    } catch (error) {
      console.error('There was an error creating the board!', error.response?.data || error.message);
      alert('Error creating board: ' + (error.response?.data.message || error.message));
    }
  };

  const onInfoChange = (info) => {
    console.log("Building info received from Maps:", info);
    setBuildingInfo(info);
  };

  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv>
        <form onSubmit={handleSubmit}>
          <Div marginTop="10rem">
            <RegistTitle>대여물품 등록</RegistTitle>
          </Div>
          <Div width="100%" marginTop="2rem" $fDirection="row" jc="space-between" gap="2rem">
            <Div gap="1rem">
              
              <TitleInput
                ref={autofocus}
                name='title'
                placeholder='제목 : 상품명이 드러나도록 제목을 적어주세요!'
                value={formData.title}
                onChange={handleChange}
                maxLength={20}
              />
              <ImageBlock setImage={(files) => handleChange({ target: { name: 'files', files } })} />
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
                  value={formData.price}
                  onChange={handleChange}
                />
              </PriceDiv>
              <DescInput
                name='description'
                placeholder='해당 물품의 기종, 상태, 구매일자 등 상세하게 적어주세요!'
                value={formData.description}
                onChange={handleChange}
              />
              <HowToRegist
                setProductCondition={setProductCondition}
                setDeliveryMethod={setDeliveryMethod}
                setDeliveryPrice={setDeliveryPrice}
              />
              <Maps onInfoChange={onInfoChange} />
              {/* {imagePreviews.length > 0 && (
                <div className="image-previews">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`preview ${index}`}
                      style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                    />
                  ))}
                </div>
              )} */}
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

export default CreateBoard;
