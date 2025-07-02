export function apiGiftOutPageGet(data: any) {
  return request.Get<Api.PaginationResult<Api.GiftOut>>('gift-out/page', {
    params: data,
  })
}

export function apiGiftOutGet(data: any) {
  return request.Get<Api.GiftOut>('gift-out', {
    params: data,
    hitSource: /^gift-out/,
  })
}

export function apiGiftOutPut(data: any) {
  return request.Put<boolean>('gift-out', data, {
    name: 'gift-out-put',
  })
}

export function apiGiftOutPost(data: any) {
  return request.Post<string>('gift-out', data, {
    name: 'gift-out-post',
  })
}

export function apiGiftOutDelete(data: any) {
  return request.Delete<boolean>('gift-out', data, {
    name: 'gift-out-delete',
  })
}

export function apiGiftOutExportGet() {
  return request.Get<UniNamespace.DownloadSuccessData>('gift-out/export-pdf', {
    requestType: 'download',
  })
}
