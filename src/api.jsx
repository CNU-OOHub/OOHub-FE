import SERVER from "./url";
import axios from "axios";

// 회원가입
export const addUser = async (userInfo) => {
  console.log(userInfo);
  try {
    const response = await axios.post(`${SERVER}/api/v1/join`, userInfo);
    if (response.status === 200) {
      alert("회원가입 되었습니다");
    }
  } catch (error) {
    throw new Error("signup user error");
  }
};
