import { request } from '../request'

export function apiFriendTagListGet() {
  return request<Api.FriendTag[]>({
    url: 'friend-tag/list',
  })
}

export function apiFriendTagPut(data: any) {
  return request<boolean>({
    url: 'friend-tag',
    method: 'PUT',
    data,
  })
}

export function apiFriendTagPost(data: any) {
  return request<string>({
    url: 'friend-tag',
    method: 'POST',
    data,
  })
}

export function apiFriendTagDelete(data: any) {
  return request<boolean>({
    url: 'friend-tag',
    method: 'DELETE',
    data,
  })
}
