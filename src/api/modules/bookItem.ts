export function apiBookItemPageGet(data: any) {
  return request.Get<Api.PaginationResult<Api.BookItem>>('book-item/page', {
    params: data,
    hitSource: [/^book-item/, /^friend/],
  })
}

export function apiBookItemGet(data: any) {
  return request.Get<Api.BookItem>('book-item', {
    params: data,
    hitSource: [/^book-item/, /^friend/],
  })
}

export function apiBookItemPut(data: any) {
  return request.Put<boolean>('book-item', data, {
    name: 'book-item-put',
  })
}

export function apiBookItemPost(data: any) {
  return request.Post<string>('book-item', data, {
    name: 'book-item-post',
  })
}

export function apiBookItemDelete(data: any) {
  return request.Delete<boolean>('book-item', data, {
    name: 'book-item-delete',
  })
}

export function apiBookItemBatchPost(data: Api.BookItem[]) {
  return request.Post<string[]>('book-item/batch', data, {
    name: 'book-item-batch-post',
  })
}
