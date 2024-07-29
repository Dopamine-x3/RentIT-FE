import styled from "styled-components";

// 컴포넌트
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import Banner from "../components/Banner";
import RequestBoard from "../components/RequestBoard";
import OfferBoard from "../components/OfferBoard";

// 이미지
import banner5 from "../assets/imgs/banner5.png";
import banner6 from "../assets/imgs/banner6.png";
import banner7 from "../assets/imgs/banner7.png";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Section1>
        <SectionHead>
          <SectionTitle>필요로 하는 이웃에게 빌려주세요!</SectionTitle>
        </SectionHead>
        <SectionBody>
          <OfferBoard />
        </SectionBody>
      </Section1>
      <Section2>
        <SectionHead>
          <SectionTitle>렌드잇을 처음 이용하는 고객이시라면</SectionTitle>
          <p>더보기</p>
        </SectionHead>
        <SectionBody>
          <LeftWrapper width="57.5%">
            <BannerImg src={banner5} alt="쿠폰 배너" width="100%" />
          </LeftWrapper>
          <RightWrapper width="40%">
            <BannerImg
              src={banner7}
              alt="수수료 면제"
              width="100%"
              height="47.5%"
            />
            <BannerImg
              src={banner6}
              alt="20% 쿠폰"
              width="100%"
              height="47.5%"
            />
          </RightWrapper>
        </SectionBody>
      </Section2>
      <Section3>
        <SectionHead>
          <SectionTitle>빌리고 싶은 물건을 찾아보세요!</SectionTitle>
        </SectionHead>
        <div>
          <RequestBoard />
        </div>
      </Section3>

      <Footer  />
    </div>
  );
};

const Section1 = styled.div`
  width: 100%;
  padding: 5% 10%;
`;
const Section2 = styled.div`
  width: 100%;
  padding: 5% 10%;
`;
const Section3 = styled.div`
  width: 100%;
  padding: 5% 10%;
`;
const SectionHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 3% 0;

  p {
    font-size: 20px;
    color: #676767;
  }
`;
const SectionBody = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SectionTitle = styled.h4`
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
  letter-spacing: -0.5px;
  color: #373737;
`;
const BannerImg = styled.img`
  width: ${(props) => props.width};
  heigth: ${(props) => props.height};
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
`;

const LeftWrapper = styled.div`
  width: ${(props) => props.width};
  heigth: ${(props) => props.height};
`;
const RightWrapper = styled.div`
  width: ${(props) => props.width};
  heigth: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export default Home;
