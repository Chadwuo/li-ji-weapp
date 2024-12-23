import { request } from '../request'

export function apiGiftInPageGet(data: any) {
  return request<Api.PaginationResult<Api.GiftIn>>({
    url: 'gift-in/page',
    data,
  })
}

export function apiGiftInGet(data: any) {
  return request<Api.GiftIn>({
    url: 'gift-in',
    data,
  })
}

export function apiGiftInPut(data: any) {
  return request<Api.GiftIn>({
    url: 'gift-in',
    method: 'PUT',
    data,
  })
}

export function apiGiftInPost(data: any) {
  return request<Api.GiftIn>({
    url: 'gift-in',
    method: 'POST',
    data,
  })
}

export function apiGiftInDelete(data: any) {
  return request<Api.GiftIn>({
    url: 'gift-in',
    method: 'DELETE',
    data,
  })
}
