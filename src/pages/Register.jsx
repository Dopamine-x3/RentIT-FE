import React, { Suspense } from "react";
import { Div, FlexDiv, MaxWidthDiv } from '../components/layout/globalStyle';
import Footer from '../components/layout/footer';
import Header from '../components/layout/header'
//import ImageBlock from '../components/regist/ImageBlock'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DescInput, PriceDiv, PriceInput, PriceSpan, RegistBtn, RegistTitle, TitleInput } from '../components/regist/RegistStyled'
import useInput from '../hooks/useInput'
import useDropdown from "../hooks/useDropdown";
import ModalSeller from '../components/detail/ModalSeller'


const Register = () => {
  const autofocus = useRef();
  const navi = useNavigate();
  const { handleClose, isOpen } = useDropdown(true);
  const { values, onChange } = useInput({
    title: "",
    description: "",
    price: '',
    location: '',
    images: '',
  })

  // const { mutate, isLoading } = useMutation({
  //   mutationKey:['mutate'],
  //   mutationFn: async(values)=>{
  //     console.log(values)
  //     if(values.location === ''){
  //       return window.alert('장소를 마커로 찍어주세요!')
  //     }else if(values.title === ''){
  //       return window.alert('제목을 기입해주세요!')
  //     }else if(values.description === ''){
  //       return window.alert('물건 상세정보를 작성해주세요!')
  //     }else if(!values.price){
  //       return window.alert('대여 금액을 작성해주세요!')
  //     }else if(!values.images){
  //       return window.alert('물품 이미지를 업로드 해주세요!')
  //     }else{
  //       return await axios.post(`${process.env.REACT_APP_SERVER_URL}/products`,values,{
  //       headers:{
  //         Authorization: `Bearer ${accessToken}`,
  //         "Content-Type": "multipart/form-data"
  //         }
  //       })
  //     }
  //   },
  //   onSuccess : (response) => {
  //     window.alert(response.data.message);
  //     navigate('/search')
  //     window.location.reload();
  //   },
  //   onError : (error) => {
  //     window.alert(error.response.data.message)
  //   }
  // })


  return (
    <FlexDiv boxShadow="none">
      <Header />
      <MaxWidthDiv>
        <Div marginTop="10rem">
          <RegistTitle>대여물품 등록</RegistTitle>
        </Div>
        <Div width="100%" marginTop="2rem" fDirection="row" jc="space-between" gap="2rem">
          <Div gap="1rem">
            <TitleInput
              ref={autofocus}
              name='title'
              placeholder='제목 : 상품명이 드러나도록 제목을 적어주세요!'
              // defaultValue={values.title} 연결 되야 가능
              onChange={onChange}
              maxLength={20}
            />
            {/* <ImageBlock/> 이미지 등록하기*/}
          </Div>
          <div style={{ height: '685px', border: '1px solid #D7D7D7' }}></div>


          <Div width="100%">
            <form>{/*  onSubmit={onSubmitHandler} */}

              <PriceDiv>
                <PriceSpan>가격</PriceSpan>
                <PriceInput
                  min={1}
                  placeholder="가격을 책정해주세요"
                  type={'number'}
                // defaultValue={}
                // onChange={} 연결 시
                />
              </PriceDiv>
              <DescInput
                name='description'
                placeholder="해당 물품의 기종, 상태, 구매일자를 상세하게 적어주세요!"
              // defaultValue={values.description}
              // onChange={}
              />
              {/* <Suspense>
              <Mapcome 이거는 원래 맵 div인데 지도는 일단 보류
            </Suspense> */}
              <RegistBtn> 등록하기 </RegistBtn>
            </form>
          </Div>
        </Div>
        {isOpen && <ModalSeller handleClose = {handleClose} word1 = {'이미지는 "한번에" 5장까지 첨부 가능합니다!'} word2={'다시 설정해주세요'}/>}
      </MaxWidthDiv>
      <Footer topRem={6} botRem={2} />
    </FlexDiv>
  )

};

export default Register;
