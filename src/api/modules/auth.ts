import { request } from '../request'

/**
 * Login
 *
 * @param code Code
 */
export function apiLoginPost(code: string) {
  return request<Api.User.LoginToken>({
    url: '/wx-open/login',
    method: 'POST',
    data: {
      jsCode: code,
    },
  })
}

/** Get user info */
export function apiUserInfoGet() {
  return request<Api.User.LoginUser>({
    url: '/auth/user-info',
  })
}
