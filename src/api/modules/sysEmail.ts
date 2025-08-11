export function apiSysEmailSendVerifyEmailPost(data: any) {
  return request.Post('sys-email/send-verify-email', data)
}

export function apiSysEmailVerifyEmailPost(data: any) {
  return request.Post('sys-email/verify-email', data)
}
