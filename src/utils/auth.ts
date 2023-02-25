import Cookies from 'js-cookie'

const TOKEN = '_token_'

export const setToken = (token: string) => {
  Cookies.set(TOKEN, token)
}

export const getToken = (): string => {
  // return Cookies.get(TOKEN)
  return '11111'
}

export const removeToken = (): string => {
  return Cookies.remove(TOKEN)
}
