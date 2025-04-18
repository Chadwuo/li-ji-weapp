import { request } from '../request'

export function apiSubscriptionPlanGet(data: any) {
  return request<Api.SubscriptionPlan>({
    url: 'subscription/plan',
    data,
  })
}

export function apiSubscriptionCreatePayPost(data: any) {
  return request<Api.WechatPayTransactionOutput>({
    url: 'subscription/pay',
    method: 'POST',
    data,
  })
}
