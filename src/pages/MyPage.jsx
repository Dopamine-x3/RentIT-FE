import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import useGetMyPageData from '../hooks/useGetMyPageData'
import Footer from '../components/layout/footer'
import HeaderNav from '../components/layout/header'
import PagingTap from '../components/mypage/PagingTap'
import UserCard from '../components/mypage/UserCard'
import { FlexDiv, MaxWidthDiv } from '../components/globalStyle'
import { useParams } from "react-router-dom";
// import { getCookie } from '../shared/Cookies'
import MapInfo from "../components/product/MapInfo"; // Import MapInfo component




function MyPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navi = useNavigate();
  // const token = getCookie("token");
  const [currentBtn, setCurrentBtn] = useState("products");
  // const {data, refetch} = useGetMyPageData(currentBtn);

  const btnInfo = [
    { name: "products", title: "내가 작성한 글" },
    { name: "rents", title: "대여중인 항목" },
    
  ]

  const buttonClickHandler = (e) => {
    setCurrentBtn(e.target.name);
  }

  // useEffect(()=>{
  //   if(!token){
  //     navi('/login')
  //   }
  // },[token])
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
  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv>
        <div style={{ marginTop: "10rem" }}>
          <h2>마이페이지</h2>
        </div>

        {/* components/mypage */}
        <UserCard 
          data={'1212'}
          refetch={'1212'}
        />
        
        {/* components/mypage */}
        <PagingTap
          data={'1212'}
          btnInfo={btnInfo}
          currentBtn={currentBtn}
          buttonClickHandler={buttonClickHandler}
          />
          
      </MaxWidthDiv>
      <Footer topRem={3} botRem={2} />
    </FlexDiv>
  )
}

export default MyPage