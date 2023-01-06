// cookie.js (or cookie.ts): 별도 파일이 아니어도 됩니다.
import { Cookies } from "react-cookie"

const cookies = new Cookies()

export const setCookie = (name: string, value: string, option?: any) => {
  return cookies.set(name, value, { ...option })
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}