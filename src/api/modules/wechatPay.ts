import { request } from '../request'

export function apiWechatPayCreatePayPost(data: any) {
  return request<Api.WechatPayTransactionOutput>({
    url: 'wechat-pay/pay-transaction',
    method: 'POST',
    data,
  })
}
