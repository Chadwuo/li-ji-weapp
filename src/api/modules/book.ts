import { request } from '../request'

export function apiGiftBookPageGet(data: any) {
  return request<Api.Common.PaginationResult<Api.Book.GiftBook>>({
    url: '/gift-book/page',
    data,
  })
}

export function apiGiftBookGet(data: any) {
  return request<Api.Book.GiftBook>({
    url: '/gift-book',
    data,
  })
}
