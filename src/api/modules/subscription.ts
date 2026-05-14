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

export function apiSubscriptionCreateXPayPost(data: any) {
  return request.Post<Api.WechatPayTransactionOutput<Api.XPayGoodsTransactionOutput>>('subscription/x-pay', data)
}

export function apiSubscriptionRedeemCouponPut(data: any) {
  return request.Put<Api.User>(`subscription/redeem-coupon/`, data, {
    name: 'subscription-redeem-coupon-put',
  })
}

export function apiSubscriptionSyncMemberStatusFromPaymentGatewayPut(data: any) {
  return request.Put<Api.User>(`subscription/sync-member-status-from-payment-gateway`, data, {
    name: 'subscription-sync-member-status-put',
  })
}
