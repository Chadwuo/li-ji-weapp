export function apiFriendListGet(data: any) {
  return request.Get<Api.Friend[]>('friend/list', {
    params: data,
    hitSource: [/^gift/, /^book-item/, /^friend/],
  })
}

export function apiFriendRecyclePageGet(data: Api.PaginationQuery) {
  return request.Get<Api.PaginationResult<Api.Friend>>('friend/recycle-page', {
    params: data,
    hitSource: [/^gift/, /^book-item/, /^friend/],
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

export function apiFriendDeleteConfirm(data: Array<number | string>) {
  return request.Delete<number>('friend/confirm', data, {
    name: 'friend-delete-confirm',
  })
}

export function apiFriendRecoveryPost(data: Array<number | string>) {
  return request.Post<number>('friend/recovery', data, {
    name: 'friend-recovery',
  })
}

export function apiFriendGiftListGet(data: any) {
  return request.Get<Api.FriendGifts>('friend/gift-list', {
    params: data,
    hitSource: [/^book/, /^book-item/, /^gift/],
  })
}
