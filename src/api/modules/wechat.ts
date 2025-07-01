export function apiWxOpenLoginPost(code: string) {
  return request.Post<Api.LoginToken>('wx-open/login', {
    jsCode: code,
  }, {
    meta: {
      authRole: 'login',
    },
  })
}
