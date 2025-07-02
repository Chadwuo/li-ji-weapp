export function apiUserFamilyListGet() {
  return request.Get<Api.UserFamily[]>('user-family/list', {
    hitSource: /^user-family/,
  })
}

export function apiUserFamilyGet(data: any) {
  return request.Get<Api.UserFamily>('user-family', {
    params: data,
  })
}

export function apiUserFamilyPost(data: any) {
  return request.Post<string>('user-family', data, {
    name: 'user-family-post',
  })
}

export function apiUserFamilyDelete(data: any) {
  return request.Delete<boolean>('user-family', data, {
    name: 'user-family-delete',
  })
}
