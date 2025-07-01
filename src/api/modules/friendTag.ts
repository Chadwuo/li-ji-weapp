export function apiFriendTagListGet() {
  return request.Get<Api.FriendTag[]>('friend-tag/list')
}

export function apiFriendTagPut(data: any) {
  return request.Put<boolean>('friend-tag', data)
}

export function apiFriendTagPost(data: any) {
  return request.Post<string>('friend-tag', data)
}

export function apiFriendTagDelete(data: any) {
  return request.Delete<boolean>('friend-tag', data)
}
