import axios from 'axios'

import { isClientSide } from './detectClient'
import cookie from 'js-cookie'

// import { API } from '../myconf'
const API = process.env.BACKEND_API || "http://domain:8080/api"


export const signOut =  (next) => {
    removeCookie("jwt_token")
    removeLocalStorage("user")
    next()

    return  axios.get(`${API}/auth/signout`).then((res) => console.log(res)).catch((err) => console.log(err))
}

export const setCookie = (key, values) => {
  if (isClientSide) {
    return cookie.set(key, values)
  }
}

export const getCookie = (key) => {
  if (isClientSide) {
    return cookie.get(key);
  }
}

export const removeCookie = (key) => {
  if (isClientSide) {
    cookie.remove(key);
  }
}

export const setLocalStorage = (key, value) => {
  if (isClientSide) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (isClientSide) {
    localStorage.removeItem(key);
  }
};


export const isAuth = () => {
  if (isClientSide) {
    const cookieChecked = getCookie("jwt_token")
    if (cookieChecked) {
      if (localStorage.getItem("user")) {

        return JSON.parse(localStorage.getItem("user"))
      } else {
        return false
      }
    }
  }

  return false
}