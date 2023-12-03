import { Platform } from "react-native";

const AUTH_SERVICE_URL = Platform.OS =="ios" ? "http://127.0.0.1:3003/v1/" :  "http://192.168.208.137:3003/v1/"
const HOTEL_SERVICE_URL = Platform.OS =="ios" ? "http://127.0.0.1:3005/v1/:" :  "http://192.168.208.137:3005/v1/"
const USER_SERVICE_URL = Platform.OS =="ios" ? "http://127.0.0.1:3001/v1/" :  "http://192.168.208.137:3001/v1/"
const ROOM_SERVICE_URL = Platform.OS =="ios" ? "http://127.0.0.1:3004/v1/" :  "http://192.168.208.137:3004/v1/"
  
export { AUTH_SERVICE_URL,HOTEL_SERVICE_URL,USER_SERVICE_URL,ROOM_SERVICE_URL };