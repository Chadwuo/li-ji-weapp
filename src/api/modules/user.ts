export function apiUserNickNamePut(data: any) {
  return request.Put<boolean>('user/nick-name', data)
}

export function apiUserMemberStatusPut(data: any) {
  return request.Put<Api.User>('user/member-status', data)
}

export function apiUserAvatarPut(data: any) {
  return request.Put<UniNamespace.UploadFileSuccessCallbackResult>('user/upload-avatar', data, {
    // 设置请求方式为上传，适配器内将调用uni.uploadFile
    requestType: 'upload',
    fileType: 'image',
  })
}
