/**
 * 问个好
 *
 * @author chadwuo
 */
export function welcome() {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

// 联系人分组
export function groupByList(res) {
  const list = Object.entries(res.reduce((acc, cur) => {
    cur.firstLetter = cur.firstLetter || `#` // 把空字符串分组到 #
    acc[cur.firstLetter] = acc[cur.firstLetter] || []
    acc[cur.firstLetter].push(cur)
    return acc
  }, {})).reduce((acc, [key, val]) => {
    acc.push({
      alpha: key,
      subItems: val,
    })
    return acc
  }, [])
  return list
}

// 消息提示后返回页面
export function msgBack(title = ``, delta = 1) {
  wx.showToast({
    title,
  });
  setTimeout(() => {
    wx.navigateBack({
      delta,
    });
  }, 1000);
}

