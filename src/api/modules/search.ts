export function apiSearchGet() {
  return request.Get<Api.SearchOutput>('search', {
    hitSource: [/^book/, /^book-item/, /^friend/, /^gift/],
  })
}
