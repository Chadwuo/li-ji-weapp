export function apiUserInfoGet() {
  return request.Get<Api.User>('auth/user-info')
}
