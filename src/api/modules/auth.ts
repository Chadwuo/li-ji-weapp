import { request } from '../request'

/** Get user info */
export function apiUserInfoGet() {
  return request<Api.User>({
    url: 'auth/user-info',
  })
}

export function apiUserRefreshTokenGet() {
  return request({
    url: 'auth/refresh-token',
  })
}
