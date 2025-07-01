export function apiUserNickNamePut(data: any) {
  return request.Put<boolean>('user/nick-name', data)
}

export function apiUserMemberStatusPut(data: any) {
  return request.Put<Api.User>('user/member-status', data)
}
