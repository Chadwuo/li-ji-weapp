import { request } from '../request'

export function apiGiftOutPageGet(data: any) {
  return request<Api.PaginationResult<Api.GiftOut>>({
    url: '/gift-out/page',
    data,
  })
}

export function apiGiftOutGet(data: any) {
  return request<Api.GiftOut>({
    url: '/gift-out',
    data,
  })
}

export function apiGiftOutPut(data: any) {
  return request<Api.GiftOut>({
    url: '/gift-out',
    method: 'PUT',
    data,
  })
}

export function apiGiftOutPost(data: any) {
  return request<Api.GiftOut>({
    url: '/gift-out',
    method: 'POST',
    data,
  })
}

export function apiGiftOutDelete(data: any) {
  return request<Api.GiftOut>({
    url: '/gift-out',
    method: 'DELETE',
    data,
  })
}
