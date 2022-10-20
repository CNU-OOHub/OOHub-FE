import SERVER from "./url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 회원가입
export const addUser = async (userInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/join`, userInfo);
    if (response.status === 200) {
      alert("회원가입 되었습니다");
    }
  } catch (error) {
    if (error.response.status === 409) {
      alert("이미 있는 id입니다");
    }
    throw new Error("sign up user error");
  }
};

// 로그인
export const authUser = async (userInfo) => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/login`, userInfo);
    if (response.status === 200) {
      sessionStorage.setItem("accessToken", response.data.token);
      alert("로그인 되었습니다");
    }
  } catch (error) {
    console.log(error);
    throw new Error("sign in user error");
  }
};
