export function apiStatsOverallGet() {
  return request.Get<Api.StatsOverall>('statistics/overall')
}

export function apiStatsDashboardGet(data: any) {
  return request.Get<Api.StatsDashboard[]>('statistics/list', {
    params: data,
  })
}
