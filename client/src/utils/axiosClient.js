import axios from "axios";
import { KEY_ACCESS_TOKEN, getItem } from "./localStorageManager";

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

