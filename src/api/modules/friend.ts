export function apiFriendListGet(data: any) {
  return request.Get<Api.Friend[]>('friend/list', {
    params: data,
  })
}

export function apiFriendGet(data: any) {
  return request.Get<Api.Friend>('friend', {
    params: data,
    hitSource: /^friend/,
  })
}

export function apiFriendPut(data: any) {
  return request.Put<boolean>('friend', data, {
    name: 'friend-put',
  })
}

export function apiFriendPost(data: any) {
  return request.Post<string>('friend', data, {
    name: 'friend-post',
  })
}

export function apiFriendDelete(data: any) {
  return request.Delete<boolean>('friend', data, {
    name: 'friend-delete',
  })
}

export function apiFriendGiftListGet(data: any) {
  return request.Get<Api.FriendGifts>('friend/gift-list', {
    params: data,
  })
}
