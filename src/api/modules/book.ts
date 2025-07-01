export function apiGiftBookPageGet(data: Api.PaginationQuery) {
  return request.Get<Api.PaginationResult<Api.GiftBook>>('gift-book/page', {
    params: data,
  })
}

export function apiGiftBookGet(data: any) {
  return request.Get<Api.GiftBook>('gift-book', {
    params: data,
  })
}

export function apiGiftBookPut(data: any) {
  return request.Put<boolean>('gift-book', data)
}

export function apiGiftBookPost(data: any) {
  return request.Post<string>('gift-book', data)
}

export function apiGiftBookDelete(data: any) {
  return request.Delete<boolean>('gift-book', data)
}

export function apiGiftBookExportGet(data: any) {
  return request.Get<UniNamespace.DownloadSuccessData>(`gift-book/export-pdf/${data}`, {
    requestType: 'download',
  })
}
