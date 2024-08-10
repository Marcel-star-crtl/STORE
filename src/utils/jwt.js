import cookie from "cookiejs";
import { JWT_CONFIG } from "../config/constants";

export const setToken = (token) => {
    cookie.set(JWT_CONFIG.TOKEN_STORAGE_KEY, token);
}

export const getToken = () => {
    return cookie.get(JWT_CONFIG.TOKEN_STORAGE_KEY);
}

export const removeToken = () => {
    return cookie.remove(JWT_CONFIG.TOKEN_STORAGE_KEY);
}


// export const setToken = (token) => {
//     localStorage.setItem(JWT_CONFIG.TOKEN_STORAGE_KEY, token); 
// }

// export const getToken = () => {
//     return localStorage.getItem(JWT_CONFIG.TOKEN_STORAGE_KEY); 
// }

// export const removeToken = () => {
//     localStorage.removeItem(JWT_CONFIG.TOKEN_STORAGE_KEY); 
// }
