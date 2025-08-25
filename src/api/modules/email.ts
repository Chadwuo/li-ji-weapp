export function apiEmailSendVerifyEmailPost(data: any) {
  return request.Post('email/send-verify-email', data)
}

export function apiEmailVerifyEmailPost(data: any) {
  return request.Post('email/verify-email-code', data)
}
