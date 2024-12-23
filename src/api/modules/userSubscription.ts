import { request } from '../request'

export function apiUserSubscriptionListGet(data: any) {
  return request<Api.UserSubscription[]>({
    url: 'user-subscription/list',
    data,
  })
}

export function apiUserSubscriptionGet(data: any) {
  return request<Api.UserFamily>({
    url: 'user-subscription',
    data,
  })
}

export function apiUserSubscriptionPut(data: any) {
  return request<Api.UserFamily>({
    url: 'user-subscription',
    method: 'PUT',
    data,
  })
}

export function apiUserSubscriptionPost(data: any) {
  return request<Api.UserFamily>({
    url: 'user-subscription',
    method: 'POST',
    data,
  })
}

export function apiUserSubscriptionDelete(data: any) {
  return request<Api.UserFamily>({
    url: 'user-subscription',
    method: 'DELETE',
    data,
  })
}
