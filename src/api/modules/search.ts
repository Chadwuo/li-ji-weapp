export function apiSearchGet(data: any) {
  return request.Post<Api.SearchOutput>('search', {
    params: data,
    hitSource: [/^book/, /^book-item/, /^friend/, /^gift/],
  })
}
