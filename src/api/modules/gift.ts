export function apiGiftPageGet(data: any) {
  return request.Get<Api.PaginationResult<Api.Gift>>('gift/page', {
    params: data,
    hitSource: [/^gift/, /^friend/],
  })
}

export function apiGiftGet(data: any) {
  return request.Get<Api.Gift>('gift', {
    params: data,
    hitSource: [/^gift/, /^friend/],
  })
}

export function apiGiftPut(data: any) {
  return request.Put<boolean>('gift', data, {
    name: 'gift-put',
  })
}

export function apiGiftPost(data: any) {
  return request.Post<string>('gift', data, {
    name: 'gift-post',
  })
}

export function apiGiftDelete(data: any) {
  return request.Delete<boolean>('gift', data, {
    name: 'gift-delete',
  })
}

export function apiGiftExportGet() {
  return request.Get<UniNamespace.DownloadSuccessData>('gift/export-pdf', {
    requestType: 'download',
  })
}
