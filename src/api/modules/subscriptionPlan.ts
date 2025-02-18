import { request } from '../request'

export function apiSubscriptionPlanGet() {
  return request<Api.SubscriptionPlan>({
    url: 'subscription-plan',
  })
}
