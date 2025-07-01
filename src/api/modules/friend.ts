export function apiFriendListGet(data: any) {
  return request.Get<Api.Friend[]>('friend/list', {
    params: data,
  })
}

export function apiFriendGet(data: any) {
  return request.Get<Api.Friend>('friend', {
    params: data,
  })
}

export function apiFriendPut(data: any) {
  return request.Put<boolean>('friend', data)
}

export function apiFriendPost(data: any) {
  return request.Post<string>('friend', data)
}

export function apiFriendDelete(data: any) {
  return request.Delete<boolean>('friend', data)
}

export function apiFriendGiftListGet(data: any) {
  return request.Get<Api.FriendGifts>('friend/gift-list', {
    params: data,
  })
}
