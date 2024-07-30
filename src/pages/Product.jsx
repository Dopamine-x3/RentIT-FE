import HeaderNav from "../components/layout/header";
import Footer from "../components/layout/footer";
import ImageSlider from "../components/detail/ImageSlider";
// import ImageBlock from '../components/regist/ImageBlock'
import React, { useEffect } from "react";
import { FlexDiv, MaxWidthDiv, Div } from "../components/layout/globalStyle";
import {
  ButtonWrapper,
  DescriptionDiv,
  DetailBtn,
  DetailTitle,
  LocationBox,
  LocationButton,
  ModalBackground,
  NotifiyIcon,
  PriceTitle,
  Registertext,
  ReserveDesc,
  Title,
} from "../components/detail/detailStyle";
// import { PriceDiv, PriceInput, PriceSpan } from '../components/regist/RegistStyled'
import HowProduct from "../components/product/HowProduct";
import DatePicker from "../components/product/DatePicker";
const Zzim = React.lazy(() => import("../components/detail/Zzim"));
const SellorInfo = React.lazy(() => import("../components/detail/SellorInfo"));

function Product() {
  const product = {
    status: "새 상품",
    tradeMethod: "직거래",
    shippingFee: "무료",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv>
        <Div marginTop="10rem">
          <DetailTitle>제품 상세보기</DetailTitle>
        </Div>
        <Div
          width="100%"
          marginTop="2rem"
          fDirection="row"
          jc="space-between"
          gap="2rem"
        >
          {/* 왼쪽 div 영역 */}
          <Div width="100%">
            <Div width="100%">
              {/* 이미지 블록 또는 슬라이더 컴포넌트 */}
              <ImageSlider imageList={[]} />
            </Div>
            <Div width="100%" marginTop="2rem" style={{ position: "relative" }}>
              <img
                style={{ width: "567px", height: "115px" }}
                src="/images/mapBG.webp"
                alt=""
              />
              <LocationButton>
                <NotifiyIcon src="/src/assets/imgs/location 2.png" />
                거래위치 지도에서 보기
              </LocationButton>
            </Div>
          </Div>

          <div style={{ height: "730px", border: "0.5px solid #D7D7D7" }}></div>

          {/* 오른쪽 div 영역 */}
          <Div width="100%" gap="1rem" style={{ boxSizing: "border-box" }}>
            <Div width="100%">
              <Div fDirection="row" width="100%" jc="space-between">
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Title>상품 이름</Title>
                  {/* <Zzim /> */}
                </React.Suspense>
              </Div>

              <Div
                width="100%"
                fDirection="row"
                alignItem="center"
                gap="10px"
                jc="space-between"
              >
                <React.Suspense fallback={<div>Loading...</div>}>
                  <PriceTitle>
                    <span style={{ fontSize: "13px" }}>/ 1일 기준</span>
                  </PriceTitle>
                  <SellorInfo />
                </React.Suspense>
              </Div>
              <Div width="100%" fDirection="row">
                <HowProduct product={product} />
              </Div>
            </Div>
            <Div width="100%">
              <DescriptionDiv>
                상품 설명 이라고 합니다. 이것도 데이터 받아야함
              </DescriptionDiv>
            </Div>

            <Div width="100%" gap="1rem">
              <Div fDirection="row" width="100%" gap="1rem" alignItem="center">
                <ButtonWrapper>
                  {/* 이건 사용자가 볼거임 */}
                  <DatePicker />
                  {/* 등록자는 밑에 버튼이 보이고 */}
                  <DetailBtn theme={"modify"}>수정하기</DetailBtn>
                  <DetailBtn theme={"cancel"}>삭제하기</DetailBtn>
                  {/* 사용자는 채팅하기 버튼이 보일거임  */}
                </ButtonWrapper>
              </Div>

              <Div width="100%">
                <React.Suspense fallback={<div>Loading...</div>}>
                  {/* 예약 관련 컴포넌트는 여기에 추가 */}
                </React.Suspense>
              </Div>
            </Div>
          </Div>
        </Div>
        <React.Suspense fallback={<div>Loading...</div>}>
          {/* 모달 관련 컴포넌트는 여기에 추가 */}
        </React.Suspense>
      </MaxWidthDiv>
      <Footer topRem={6} botRem={2} />
    </FlexDiv>
  );
}
export default Product;
