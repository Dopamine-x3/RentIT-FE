import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderNav from "../components/layout/header";
import Footer from "../components/layout/footer";
import ImageSlider from "../components/detail/ImageSlider";
import { FlexDiv, MaxWidthDiv, Div } from "../components/globalStyle";
import {
  ButtonWrapper,
  DescriptionDiv,
  DetailBtn,
  DetailTitle,
  LocationButton,
  NotifiyIcon,
  PriceTitle,
  Title,
} from "../components/detail/detailStyle";
import HowProduct from "../components/product/HowProduct";
import DatePicker from "../components/product/DatePicker";
const Zzim = React.lazy(() => import("../components/detail/Zzim"));
const SellorInfo = React.lazy(() => import("../components/detail/SellorInfo"));
import { getRentBoardItem } from "../apis/axios";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
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

  if (!product) return <div>로딩 중...</div>;

  return (
    <FlexDiv $boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv>
        <Div $marginTop="10rem">
          <DetailTitle>제품 상세보기</DetailTitle>
        </Div>
        <Div
          $width="100%"
          $marginTop="2rem"
          $fDirection="row"
          $jc="space-between"
          $gap="2rem"
        >
          {/* 왼쪽 div 영역 */}
          <Div width="100%">
            <Div width="100%">
              {/* 이미지 슬라이더 컴포넌트 */}
              <ImageSlider imageList={product.imageUrls} />
            </Div>
            <Div
              width="100%"
              $marginTop="2rem"
              style={{ position: "relative" }}
            >
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
              <Div $fDirection="row" width="100%" $jc="space-between">
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Title>{product.title}</Title>
                  {/* <Zzim /> */}
                </React.Suspense>
              </Div>

              <Div
                $width="100%"
                $fDirection="row"
                $alignItem="center"
                $gap="10px"
                $jc="space-between"
              >
                <React.Suspense fallback={<div>Loading...</div>}>
                  <PriceTitle>
                    <span style={{ fontSize: "13px" }}>/ 1일 기준</span>
                    {product.price}
                  </PriceTitle>
                  <SellorInfo />
                </React.Suspense>
              </Div>
              <Div width="100%" $fDirection="row">
                <HowProduct product={product} />
              </Div>
            </Div>
            <Div width="100%">
              <DescriptionDiv>{product.description}</DescriptionDiv>
            </Div>

            <Div width="100%" gap="1rem">
              <Div
                $fDirection="row"
                width="100%"
                gap="1rem"
                $alignItem="center"
              >
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
