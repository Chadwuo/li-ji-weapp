import { request } from '../request'

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
