import { request } from '../request'

/**
 * Login
 *
 * @param code Code
 */
export function apiLoginPost(code: string) {
  return request<Api.LoginToken>({
    url: 'wx-open/login',
    method: 'POST',
    data: {
      jsCode: code,
    },
  })
}

/** Get user info */
export function apiUserInfoGet() {
  return request<Api.LoginUser>({
    url: 'auth/user-info',
  })
}

export function apiUserRefreshTokenGet() {
  return request({
    url: 'auth/refresh-token',
  })
}
