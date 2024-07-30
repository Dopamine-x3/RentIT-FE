import axiosInstance from "./axiosInstance";
import qs from "qs";

export const postJoin = async (email, password, nickname, introduction) => {
  try {
    const response = await axiosInstance.post("/member/join", {
      email,
      password,
      nickname,
      introduction,
    });
    return response.data;
  } catch (error) {
    console.error("회원가입 요청 실패:", error);
    throw error;
  }
};

export const postLogin = async (username, password) => {
  try {
    console.log("Sending login request with:", { username, password });

    const data = qs.stringify({
      username,
      password,
    });

    const response = await axiosInstance.post("/member/login", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=ISO-8859-1",
      },
    });

    const { accessToken, refreshToken } = response.data;

    console.log("Login successful, tokens received:", {
      accessToken,
      refreshToken,
    });

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    if (error.response) {
      console.error("응답 에러:", error.response.data);
      console.error("응답 상태 코드:", error.response.status);
      console.error("응답 헤더:", error.response.headers);
    } else if (error.request) {
      console.error("요청 에러:", error.request);
    } else {
      console.error("에러 메시지:", error.message);
    }
    console.error("전체 에러 객체:", error);
    throw error;
  }
};
