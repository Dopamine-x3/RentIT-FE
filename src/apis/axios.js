import axiosInstance from "./axiosInstance";

export const postJoin = async (userID, password, nickname, introduction) => {
  try {
    const response = await axiosInstance.post("/join", {
      userID,
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
    localStorage.setItem("userID", userID);

    //로그 찍기
    const storedUserID = localStorage.getItem("userID");
    console.log(storedUserID);
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
export const getRentBoards = async () => {
  try {
    const response = await axiosInstance.get("/rentboards");
    return response.data;
  } catch (error) {
    console.error("게시판:", error);
  }
};

export const getRentBoardItem = async (id) => {
  try {
    const response = await axiosInstance.get(`/rentboards/${id}`);
    return response.data;
  } catch (error) {
    console.error("게시판:", error);
  }
};
export const postBoardItem = async (boardData) => {
  const {
    userId,
    title,
    category,
    price,
    description,
    product_condition,
    delivery_method,
    delivery_price,
    address_name,
    building_name,
    files, // images 배열로 예상됨
  } = boardData;

  // FormData 객체 생성
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("title", title);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("product_condition", product_condition);
  formData.append("delivery_method", delivery_method);
  formData.append("delivery_price", delivery_price);
  formData.append("address_name", address_name);
  formData.append("building_name", building_name);

  // 파일이 있는 경우 처리
  if (files && files.length > 0) {
    files.forEach((file, index) => {
      formData.append("files", file, `file${index}.jpg`);
    });
  }

  try {
    // 서버에 POST 요청
    const response = await axiosInstance.post("/rentboards", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시물 등록 요청 실패:", error);
    throw error;
  }
};