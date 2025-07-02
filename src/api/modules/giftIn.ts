export function apiGiftInPageGet(data: any) {
  return request.Get<Api.PaginationResult<Api.GiftIn>>('gift-in/page', {
    params: data,
  })
}

export function apiGiftInGet(data: any) {
  return request.Get<Api.GiftIn>('gift-in', {
    params: data,
    hitSource: /^gift-in/,
  })
}

export function apiGiftInPut(data: any) {
  return request.Put<boolean>('gift-in', data, {
    name: 'gift-in-put',
  })
}

export function apiGiftInPost(data: any) {
  return request.Post<string>('gift-in', data, {
    name: 'gift-in-post',
  })
}

export function apiGiftInDelete(data: any) {
  return request.Delete<boolean>('gift-in', data, {
    name: 'gift-in-delete',
  })
}
