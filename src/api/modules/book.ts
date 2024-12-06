import { request } from "../request";

export function apiGiftBookPageGet(params: any) {
  return request<Api.Common.PaginationResult<Api.Book.GiftBook>>({
    url: "/gift-book/page",
    method: "get",
    params,
  });
}

export function apiGiftBookGet(params: any) {
  return request<Api.Book.GiftBook>({
    url: "/gift-book",
    params,
  });
}
