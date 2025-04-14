import { request } from '../request'

export function apiSubscriptionPlanGet() {
  return request<Api.SubscriptionPlan>({
    url: 'subscription/plan',
  })
}

export function apiSubscriptionCreatePayPost(data: any) {
  return request<Api.WechatPayTransactionOutput>({
    url: 'subscription/pay',
    method: 'POST',
    data,
  })
}
