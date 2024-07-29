import axiosInstance from "./axiosInstance";

export const postRegister = async (email, password) => {
  const response = await axiosInstance.post("/auth/register", {
    email,
    password,
  });
  return response.data;
};

export const postLogin = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });

  const { accessToken, refreshToken } = response.data;

  // 액세스 토큰은 메모리에 저장 (보안을 위해 localStorage 대신 메모리에 저장하는 것이 권장됩니다)
  localStorage.setItem("accessToken", accessToken);

  // 리프레시 토큰은 로컬 스토리지에 저장
  localStorage.setItem("refreshToken", refreshToken);

  return { accessToken, refreshToken };
};
