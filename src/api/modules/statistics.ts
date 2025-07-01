export function apiStatisticsOverallGet() {
  return request.Get<Api.StatOverall>('statistics/overall')
}
