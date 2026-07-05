export function apiBookPageGet(data: Api.PaginationQuery) {
  return request.Get<Api.PaginationResult<Api.Book>>('book/page', {
    params: data,
    hitSource: [/^book/, /^book-item/],
  })
}

export function apiBookRecyclePageGet(data: Api.PaginationQuery) {
  return request.Get<Api.PaginationResult<Api.Book>>('book/recycle-page', {
    params: data,
    hitSource: [/^book/, /^book-item/],
  })
}

export function apiBookGet(data: any) {
  return request.Get<Api.Book>('book', {
    params: data,
    hitSource: [/^book/, /^book-item/],
  })
}

export function apiBookPut(data: any) {
  return request.Put<boolean>('book', data, {
    name: 'book-put',
  })
}

export function apiBookPost(data: any) {
  return request.Post<string>('book', data, {
    name: 'book-post',
  })
}

export function apiBookDelete(data: any) {
  return request.Delete<boolean>('book', data, {
    name: 'book-delete',
  })
}

export function apiBookDeleteConfirm(data: Array<number | string>) {
  return request.Delete<number>('book/confirm', data, {
    name: 'book-delete-confirm',
  })
}

export function apiBookRecoveryPost(data: Array<number | string>) {
  return request.Post<number>('book/recovery', data, {
    name: 'book-recovery',
  })
}

export function apiBookExportGet(data: any) {
  return request.Get<UniNamespace.DownloadSuccessData>(`book/export-pdf/${data}`, {
    requestType: 'download',
  })
}
