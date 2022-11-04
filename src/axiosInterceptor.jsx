import axios from "axios";
import { useNavigate } from "react-router-dom";
import SERVER from "./url";

export const AxiosInterCeptor = () => {
  // 요청 인터셉터 (요청 보내기 전)
  // 모든 요청의 header에 accessToken 추가
  axios.interceptors.request.use(
    function (config) {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 (응답 받기 전)
  // 401 에러(권한 에러) 발생 시, refreshToken 재발급한 후 다시 요청보내는 함수 호출
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const { response: errorResponse } = error;
      if (errorResponse.status === 401) {
        return await reRequest(error);
      }
      return Promise.reject(error);
    }
  );

  // 토큰 갱신 후 에러 났던 요청을 다시 요청
  let isFetchingAccessToken = false; // 토큰 재발급 요청 여부
  let subscribers = []; // 에러 났던 요청을 담고 있을 배열

  async function reRequest(error) {
    try {
      const { response: errorResponse } = error;
      const retryRequest = new Promise((resolve, reject) => {
        addSubscriber(async (accessToken) => {
          // 구독에 요청 넣기
          try {
            errorResponse.config.headers["Authorization"] =
              "Bearer" + accessToken;
            resolve(axios(errorResponse.config));
          } catch (err) {
            reject(err);
          }
        });
      });

      if (!isFetchingAccessToken) {
        isFetchingAccessToken = true; // 문 닫기
        const { data } = await tokenReissue();
        sessionStorage.setItem("accessToken", data.token);
        sessionStorage.setItem("refreshToken", data.refreshToken);
        isFetchingAccessToken = false;
        executeSubscriber(data.token);
      }
      return retryRequest;
    } catch (error) {
      // 토큰 재발급 요청 중 에러
      signOut();
      return Promise.reject(error);
    }
  }

  // subscriber 에 요청 추가
  function addSubscriber(requestCallback) {
    subscribers.push(requestCallback);
  }

  // subscriber 에 담긴 요청들 실행
  function executeSubscriber(accessToken) {
    subscribers.forEach((callback) => callback(accessToken));
    subscribers = [];
  }

  // 토큰 재발급 요청 api
  const tokenReissue = async () => {
    const response = await axios.post(`${SERVER}/api/v1/refresh`, undefined, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        Refresh: "Bearer" + sessionStorage.getItem("refreshToken"),
      },
    });
    return response;
  };

  const signOut = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    localStorage.clear();
    window.location.href = "/logIn";
  };
};
