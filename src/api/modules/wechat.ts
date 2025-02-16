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

export function apiWxPayCreatePayPost(data: any) {
  return request<Api.WechatPayTransactionOutput>({
    url: 'wx-pay/pay-transaction',
    method: 'POST',
    data,
  })
}
