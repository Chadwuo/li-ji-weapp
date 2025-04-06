<script setup>
import MPServerless from '@alicloud/mpserverless-sdk'
import dayjs from 'dayjs'
import options from './config.json'

const authStore = useAuthStore()
const mpserverless = new MPServerless(wx, options)

const step = ref('init')
const msg = ref('')
const percentage = ref(0)
let userDataScope = ''

const getCollection = async (table) => {
  const db = mpserverless.db
  const MAX_LIMIT = 500

  const { result: total } = await db.collection(table).count({
    userId: {
      $in: userDataScope,
    },
  })

  // 计算需分几次取
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection(table).aggregate([
      {
        $match: {
          userId: {
            $in: userDataScope,
          },
        },
      },
      {
        $skip: i * MAX_LIMIT,
      },
      {
        $limit: MAX_LIMIT,
      },
    ])
    tasks.push(promise)
  }

  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    if (Array.isArray(cur?.result)) {
      return acc.concat(cur.result)
    }
    return acc
  }, [])
}

const welcome = () => {
  uni.switchTab({
    url: '/pages/index/index',
  })
}

const star = async () => {
  const friends = await getCollection('friend')
  const books = await getCollection('book')
  const gift_receives = await getCollection('gift_receive')
  const gift_outs = await getCollection('gift_out')

  // ------------------开始迁移亲友数据-----------------
  msg.value = `同步【亲友】数据(共 ${friends.length} 条数据)`
  percentage.value = 10
  const friendMap = new Map()
  const promises = friends.map(async (element) => {
    try {
      const { name, relation, remarks } = element
      const response = await apiFriendPost({ name, tag: relation, remarks })
      const { data: friendId } = response
      // 设置旧ID到新ID的映射
      friendMap.set(element._id, friendId)
    }
    catch (error) {
      console.error(`迁移朋友 ${element.name} 数据时出错:`, error)
      // 你可以选择在这里继续处理或者抛出异常停止整个过程
    }
  })
  await Promise.all(promises)

  // --------------------------------------------------

  // ------------------开始迁移礼簿数据-----------------
  msg.value = `同步【礼簿】数据(共 ${books.length} 条数据)`
  percentage.value = 40
  const bookMap = new Map()
  const promises2 = books.map(async (element) => {
    try {
      const { title, date, remarks, cost } = element
      const { data: giftBookId } = await apiGiftBookPost({ title, remarks, cost, date: dayjs(date.value).format('YYYY-MM-DD'), lunarDate: `${date.lunar_year} ${date.lunar_month} ${date.lunar_day}` })
      // 设置旧ID到新ID的映射
      bookMap.set(element._id, giftBookId)
    }
    catch (error) {
      console.error(`迁移送礼 ${element._id} 数据时出错:`, error)
      // 你可以选择在这里继续处理或者抛出异常停止整个过程
    }
  })
  await Promise.all(promises2)
  // --------------------------------------------------

  // ------------------开始迁移送礼数据-----------------
  msg.value = `同步【送礼】数据(共 ${gift_outs.length} 条数据)`
  percentage.value = 60
  const promises3 = gift_outs.map(async (element) => {
    try {
      const { title, icon, date, money, remarks, friendId } = element
      await apiGiftOutPost({ title, icon, money, remarks, friendName: 'liji', friendId: friendMap.get(friendId), date: dayjs(date.value).format('YYYY-MM-DD'), lunarDate: `${date.lunar_year} ${date.lunar_month} ${date.lunar_day}` })
    }
    catch (error) {
      console.error(`迁移送礼 ${element._id} 数据时出错:`, error)
      // 你可以选择在这里继续处理或者抛出异常停止整个过程
    }
  })
  await Promise.all(promises3)
  // --------------------------------------------------

  msg.value = `同步【收礼】数据(共 ${gift_receives.length} 条数据)`
  percentage.value = 80
  const promises4 = gift_receives.map(async (element) => {
    try {
      const { attendance, money, friendId, bookId, remarks } = element
      await apiGiftInPost({ attendance: attendance || 0, money, remarks, giftBookId: bookMap.get(bookId), friendId: friendMap.get(friendId), friendName: 'liji' })
    }
    catch (error) {
      console.error(`迁移收礼 ${element._id} 数据时出错:`, error)
      // 你可以选择在这里继续处理或者抛出异常停止整个过程
    }
  })
  await Promise.all(promises4)
  // --------------------------------------------------

  const promises5 = userDataScope.map(async (element) => {
    try {
      const db = mpserverless.db
      await db.collection('user').updateOne({
        _id: element,
      }, {
        $set: { migrate: true },
      })
    }
    catch (error) {
      console.error(`用户 ${element._id} 状态更新时出错:`, error)
    }
  })
  await Promise.all(promises5)
  percentage.value = 100
  step.value = 'end'
}

onShow(async () => {
  msg.value = '正在准备您的数据，请稍等...'
  if (!authStore.isLogin)
    return
  const { query: { uids } } = wx.getLaunchOptionsSync()
  userDataScope = JSON.parse(uids)
  userDataScope.forEach((element) => {
    msg.value += `\n${element}`
  })

  if (Array.isArray(userDataScope) && userDataScope.length > 0) {
    await mpserverless.init({
      authorType: 'anonymous',
    })
    step.value = 'ing'
    star()
  }
})
</script>

<template>
  <div v-if="step === 'init'" class="h-full flex flex-col items-center justify-center text-gray">
    <div v-if="step === 'init'" class="mt-8 text-sm">
      {{ msg }}
    </div>
  </div>
  <div v-else-if="step === 'end'" class="h-full flex flex-col items-center justify-center text-gray">
    <div class="i-hugeicons-checkmark-circle-01 text-12" />
    <div class="mt-8 text-sm">
      数据同步完成
    </div>
    <div class="mt-8 min-w-24">
      <wd-button @click="welcome">
        欢迎使用
      </wd-button>
    </div>
  </div>
  <div v-else-if="step === 'ing'" class="h-full flex flex-col items-center justify-center">
    <div class="i-dashicons-update text-12" />
    <div class="mt-8 text-center">
      <div class="text-xl">
        正在同步
      </div>
      <div class="mt-2 text-gray">
        为保证数据同步顺利进行，请不要操作手机
      </div>
    </div>
    <div class="mt-8 w-2/3">
      <wd-progress :percentage="percentage" hide-text />
      <div class="text-center text-xs text-gray">
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationStyle": "custom"
  }
}
</route>
