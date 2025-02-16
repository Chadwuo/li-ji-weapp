import { request } from '../request'

export function apiUserNickNamePut(data: any) {
  return request<boolean>({
    url: 'user/nick-name',
    method: 'PUT',
    data,
  })
}

export function apiUserSubscriptionGet() {
  return request<Api.UserSubscription>({
    url: 'user/user-subscription',
  })
}
