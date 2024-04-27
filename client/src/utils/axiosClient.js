import axios from "axios";
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from "./localStorageManager";
const base = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL  ; 

export const axiosClient = axios.create({
    baseURL: `http://localhost:4000`,
    withCredentials: true,
  });


//interceptors 
// request interceptor 
axiosClient.interceptors.request.use(
  (request) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    // pass access token in authorization header  
    request.headers["Authorization"] = `Bearer ${accessToken}`; 
    return request;
  } // ,
  // (error) => {

  // }
);

axiosClient.interceptors.response.use(
  async (response) => {
    const data = response.data;

    if (data.status === "ok") {
      //everything is fine
      return data;
    }

    const statusCode = data.statusCode;
    const error = data.message;
    const originalRequest = response.config;
    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // it means we have to call refresh api
      // here we have to add something
      const response = await axios
        .create({
          withCredentials: true,
        })
        .get(`${base}/api/auth/refresh`);

      //   console.log(response) ;
      if (response.status === "ok") {
        setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.result.accessToken}`;
        console.log("refresh api called") ; 
        return axios(originalRequest);
      } else {
        // it means user ko 1 ssall ho gya
        // this will log out the use
        // remove accesss token from llocal storage
        removeItem(KEY_ACCESS_TOKEN);
        console.log("refresh api error : " , error) ;
        window.location.replace("/login", "_self");
        return Promise.reject(error);
      }
    }
   // console.log("backend error" , data) ;
    console.log("backend error message : " , error) ;
    return Promise.reject(error);
  } // ,
  // (error) => {

  // }
);


