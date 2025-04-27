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

export function hasMourningWords(bookName: string | undefined | null) {
  if (!bookName)
    return false
  const words = [
    '哀',
    '丧',
    '殇',
    '奠',
    '祭',
    '死',
    '葬',
    '节哀',
    '追思',
    '缅怀',
    '悼念',
    '归西',
    '别世',
    '寿终',
    '长眠',
    '过世',
    '去世',
    '逝世',
    '辞世',
    '白事',
    '葬礼',
    '丧事',
    '亡故',
    '离世',
    '仙逝',
    '安息',
    '故去',
    '丧礼',
    '殡葬',
    '送终',
    '追悼',
    '忌日',
    '吊唁',
    '治丧',
    '离去',
    '丧亲',
    '哀悼',
    '早逝',
    '驾鹤西去',
    '永别',
    '丧葬',
    '丧仪',
    '丧祭',
    '丧期',
  ]
  return words.some((word) => {
    return bookName.includes(word)
  })
}
