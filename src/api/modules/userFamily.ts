import { request } from '../request'

export function apiUserFamilyListGet(data: any) {
  return request<Api.UserFamily[]>({
    url: 'user-fanmily/list',
    data,
  })
}

export function apiUserFamilyGet(data: any) {
  return request<Api.UserFamily>({
    url: 'user-fanmily',
    data,
  })
}

export function apiUserFamilyPut(data: any) {
  return request<Api.UserFamily>({
    url: 'user-fanmily',
    method: 'PUT',
    data,
  })
}

export function apiUserFamilyPost(data: any) {
  return request<Api.UserFamily>({
    url: 'user-fanmily',
    method: 'POST',
    data,
  })
}

export function apiUserFamilyDelete(data: any) {
  return request<Api.UserFamily>({
    url: 'user-fanmily',
    method: 'DELETE',
    data,
  })
}
