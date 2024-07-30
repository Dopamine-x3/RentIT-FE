import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://3.36.161.37/api",
  timeout: 6000,
});

// 요청 인터셉터 추가하기
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["authorization"] = localStorage.getItem("accessToken");
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.headers["authorization"]) {
      localStorage.setItem("accessToken", response.headers["authorization"]);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("액세스 토큰이 만료되었습니다. 다시 로그인 해주세요.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
