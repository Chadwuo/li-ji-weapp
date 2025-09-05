export function apiSearchGet(data: any) {
  return request.Get<Api.SearchOutput>('search', {
    params: data,
    hitSource: [/^book/, /^book-item/, /^friend/, /^gift/],
  })
}
