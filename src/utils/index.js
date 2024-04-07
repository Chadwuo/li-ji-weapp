/**
 * 问个好
 * 
 * @author Chadwuo
 */
export function welcome() {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}


export function hasMourningWords(bookName) {
    if (!bookName) return 'red'
    const words = ["悼", "哀", "丧", "殇", '奠', "祭", "死", '葬', "追悼", "白事", "节哀", "哀悼", "追思", "缅怀", "悼念", "吊唁", "逝世", "辞世", "归西", "仙逝", "别世", "过世", "去世", "寿终", "长眠"]
    return words.some(function (word) {
        return bookName.indexOf(word) !== -1
    })
}