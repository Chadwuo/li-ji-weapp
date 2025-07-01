export function apiSubscriptionPlanGet(data: any) {
  return request.Get<Api.SubscriptionPlan>('subscription/plan', {
    params: data,
  })
}

export function apiSubscriptionCreatePayPost(data: any) {
  return request.Post<Api.WechatPayTransactionOutput>('subscription/pay', data)
}
