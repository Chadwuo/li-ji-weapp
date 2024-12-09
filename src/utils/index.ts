/**
 * 问个好
 *
 * @author Chadwuo
 */
export function welcome() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? '早上好'
    : hour <= 11
      ? '上午好'
      : hour <= 13
        ? '中午好'
        : hour < 20
          ? '下午好'
          : '晚上好'
}

/**
 * 金额格式化
 */
export function formatMoney(money: number) {
  if (!money)
    return '0'
  if (money > 1000 && money < 10000) {
    return `${(money / 1000).toFixed(2)}k`
  }
  else if (money > 10000) {
    return `${(money / 10000).toFixed(2)}w`
  }
  else {
    return money
  }
}

export function hasMourningWords(bookName: string) {
  if (!bookName)
    return 'red'
  const words = [
    '悼',
    '哀',
    '丧',
    '殇',
    '奠',
    '祭',
    '死',
    '葬',
    '追悼',
    '白事',
    '节哀',
    '哀悼',
    '追思',
    '缅怀',
    '悼念',
    '吊唁',
    '逝世',
    '辞世',
    '归西',
    '仙逝',
    '别世',
    '过世',
    '去世',
    '寿终',
    '长眠',
  ]
  return words.some((word) => {
    return bookName.includes(word)
  })
}
