import { request } from '../request'

export function apiWxOpenLoginPost(code: string) {
  return request<Api.LoginToken>({
    url: 'wx-open/login',
    method: 'POST',
    data: {
      jsCode: code,
    },
  })
}
