import SERVER from "./url";
import axios from "axios";

// 회원가입
export const addUser = async (userInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/join`, userInfo);
    if (response.status === 200) {
      alert("회원가입 되었습니다");
    }
  } catch (error) {
    throw new Error("sign up user error");
  }
};

// 로그인
export const authUser = async (userInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/login`, userInfo);
    if (response.status === 200) {
      alert("로그인 되었습니다");
    }
  } catch (error) {
    throw new Error("sign in user error");
  }
};
