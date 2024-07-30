import axiosInstance from "./axiosInstance";

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

export const postLogin = async (userID, password) => {
  try {
    const response = await axiosInstance.post("/login", { userID, password });
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);

    return { accessToken };
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
