export function apiGiftOutPageGet(data: any) {
  return request.Get<Api.PaginationResult<Api.GiftOut>>('gift-out/page', {
    params: data,
  })
}

export function apiGiftOutGet(data: any) {
  return request.Get<Api.GiftOut>('gift-out', {
    params: data,
  })
}

export function apiGiftOutPut(data: any) {
  return request.Put<boolean>('gift-out', data)
}

export function apiGiftOutPost(data: any) {
  return request.Post<string>('gift-out', data)
}

export function apiGiftOutDelete(data: any) {
  return request.Delete<boolean>('gift-out', data)
}

export function apiGiftOutExportGet() {
  return request.Get<UniNamespace.DownloadSuccessData>('gift-out/export-pdf', {
    requestType: 'download',
  })
}
