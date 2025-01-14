import { request } from '../request'

export function apiStatisticsOverallGet() {
  return request<Api.StatOverall>({
    url: 'statistics/overall',
  })
}
