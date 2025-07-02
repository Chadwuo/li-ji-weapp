export function apiFriendTagListGet() {
  return request.Get<Api.FriendTag[]>('friend-tag/list', {
    hitSource: /^friend-tag/,
  })
}

export function apiFriendTagPut(data: any) {
  return request.Put<boolean>('friend-tag', data, {
    name: 'friend-tag-put',
  })
}

export function apiFriendTagPost(data: any) {
  return request.Post<string>('friend-tag', data, {
    name: 'friend-tag-post',
  })
}

export function apiFriendTagDelete(data: any) {
  return request.Delete<boolean>('friend-tag', data, {
    name: 'friend-tag-delete',
  })
}
