import { request } from '../request'

export function apiUserNickNamePut(data: any) {
  return request<boolean>({
    url: 'user/nick-name',
    method: 'PUT',
    data,
  })
}

export function apiUserMemberStatusPut(data: any) {
  return request<Api.User>({
    url: 'user/member-status',
    method: 'PUT',
    data,
  })
}
