export function apiStatsOverallGet() {
  return request.Get<Api.StatsOverall>('stats/overall', {
    hitSource: [/^gift/, 'friend-delete'],
  })
}

export function apiStatsDashboardGet() {
  return request.Get<Api.StatsDashboard>('stats/dashboard', {
    hitSource: [/^gift/, 'friend-delete'],
  })
}
