export function apiSubscriptionPlanGet(data: any) {
  return request.Get<Api.SubscriptionPlan>('subscription/plan', {
    params: data,
  })
}

export function apiSubscriptionCreateJsapiPayPost(data: any) {
  return request.Post<Api.WechatPayTransactionOutput<Api.WechatPayTransactionJsapiSingInfo>>('subscription/jsapi-pay', data)
}

export function apiSubscriptionCreateH5PayPost(data: any) {
  return request.Post<Api.WechatPayTransactionOutput<Api.WechartPayTransactionH5SingInfo>>('subscription/h5-pay', data)
}
