import { request } from '../request'

export function apiFriendListGet(data: any) {
  return request<Api.Friend[]>({
    url: 'friend/list',
    data,
  })
}

export function apiFriendGet(data: any) {
  return request<Api.Friend>({
    url: 'friend',
    data,
  })
}

export function apiFriendPut(data: any) {
  return request<Api.Friend>({
    url: 'friend',
    method: 'PUT',
    data,
  })
}

export function apiFriendPost(data: any) {
  return request<Api.Friend>({
    url: 'friend',
    method: 'POST',
    data,
  })
}

export function apiFriendDelete(data: any) {
  return request<Api.Friend>({
    url: 'friend',
    method: 'DELETE',
    data,
  })
}

export function apiFriendGiftListGet(data: any) {
  return request<Api.FriendGifts>({
    url: 'friend/gift-list',
    data,
  })
}