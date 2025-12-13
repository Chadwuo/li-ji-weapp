export function apiStatsDashboardGet() {
  return request.Get<Api.StatsDashboard>('stats/dashboard', {
    hitSource: [/^book/, /^gift/, 'friend'],
  })
}
