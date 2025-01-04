import { request } from '../request'

export function apiUserFamilyListGet() {
  return request<Api.UserFamily[]>({
    url: 'user-family/list',
  })
}

export function apiUserFamilyGet(data: any) {
  return request<Api.UserFamily>({
    url: 'user-family',
    data,
  })
}

export function apiUserFamilyPost(data: any) {
  return request({
    url: 'user-family',
    method: 'POST',
    data,
  })
}

export function apiUserFamilyDelete(data: any) {
  return request({
    url: 'user-family',
    method: 'DELETE',
    data,
  })
}
