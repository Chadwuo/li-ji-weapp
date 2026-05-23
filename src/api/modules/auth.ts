export function apiAuthUserInfoGet() {
  return request.Get<Api.User>('auth/user-info')
}

export function apiAuthLoginEmailPost(data: any) {
  return request.Post<Api.LoginToken>('auth/login-email', data, {
    meta: {
      authRole: 'login',
    },
  })
}

export function apiAuthSignupEmailPost(data: any) {
  return request.Post('auth/signup-email', data)
}
