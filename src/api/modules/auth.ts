export function apiAuthUserInfoGet() {
  return request.Get<Api.User>('auth/user-info')
}

export function apiAuthLoginPost(data: any) {
  return request.Post<Api.LoginToken>('auth/login', data, {
    meta: {
      authRole: 'login',
    },
  })
}
