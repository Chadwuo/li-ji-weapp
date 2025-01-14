import { extend, locale } from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

export function setupDayjs() {
  extend(localeData)
  extend(localizedFormat)
  extend(relativeTime)
  locale('zh-cn')
}
