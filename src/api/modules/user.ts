import { request } from '../request'

export function apiUserNickNamePut(data: any) {
  return request({
    url: 'user/nick-name',
    method: 'PUT',
    data,
  })
}
