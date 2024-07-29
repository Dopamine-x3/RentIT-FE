import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import banner1 from "../assets/imgs/banner1.jpg";
import banner2 from "../assets/imgs/banner2.jpg";
import banner3 from "../assets/imgs/banner3.png";
import banner4 from "../assets/imgs/banner4.jpg";
import styled from "styled-components";

const SlidImg = styled.img`
  width: 100%;
  height: 500px;
`;

const NavigationButton = styled.div`
  color: #a9a9a9;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
`;

const NextButton = styled(NavigationButton)`
  right: 15px;
`;

const PrevButton = styled(NavigationButton)`
  left: 15px;
`;

const Banner = () => {
  return (
    <div style={{ position: "relative" }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <SlidImg src={banner1} alt="banner img1" />
        </SwiperSlide>
        <SwiperSlide>
          <SlidImg src={banner2} alt="banner img1" />
        </SwiperSlide>
        <SwiperSlide>
          <SlidImg src={banner3} alt="banner img1" />
        </SwiperSlide>
        <SwiperSlide>
          <SlidImg src={banner4} alt="banner img1" />
        </SwiperSlide>
      </Swiper>
      <NextButton className="swiper-button-next"></NextButton>
      <PrevButton className="swiper-button-prev"></PrevButton>
    </div>
  );
};

export default Banner;
