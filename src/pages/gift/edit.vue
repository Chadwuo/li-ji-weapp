<script setup lang="ts">
import type { FormInstance, FormSchema } from '@wot-ui/ui/components/wd-form/types'
import dayjs from 'dayjs'
import { giftCategory } from '@/constants/app'

definePage({
  style: {
    navigationBarTitleText: '人情往来',
  },
})

// '结婚': 'i-bi-postcard-heart',
// '宝宝': 'i-hugeicons-baby-01',
// '周岁': 'i-icon-park-outline-baby-feet',
// '乔迁': 'i-tabler-home-move',
// '生日': 'i-mingcute-cake-line',
// '升学': 'i-hugeicons-student',
// '福寿': 'i-mingcute-blessing-line',
// '探望': 'i-healthicons-fruits-outline',
// '白事': 'i-tabler-candle',
// '其他': 'i-mingcute-wallet-2-line',

const money = ref({
  amount: 0,
  type: '送礼',
  preset: [100, 200, 500, 800, 1000, 2000],
})

const columns = Object.entries(giftCategory)
  .map(([name, icon]) => ({ name, icon }))
const dataSource = ref<Api.Gift>({
  moneyType: 0,
  date: dayjs().format('YYYY-MM-DD'),
})

const loading = ref(false)
const formRef = ref<FormInstance>()

onLoad(async (option) => {
  if (option?.id) {
    uni.setNavigationBarTitle({
      title: '编辑',
    })
    dataSource.value = await apiGiftGet({ id: option.id })
    money.value.type = (dataSource.value.money ?? 0) > 0 ? '收礼' : '送礼'
    money.value.amount = Math.abs(dataSource.value.money || 0)
  }

  if (option?.friendId) {
    dataSource.value.friendId = option.friendId
    dataSource.value.friendName = option.friendName
  }
})

function onSelectIcont(i: any) {
  dataSource.value.icon = i.icon
  if (i.name === '其他')
    dataSource.value.title = ''
  else dataSource.value.title = i.name
}

const selectedIconStyle = computed(() => {
  return dataSource.value.icon !== 'i-tabler-candle'
    ? 'text-white bg-red'
    : 'text-white bg-gray'
})

const onSubmit = async () => {
  formRef.value?.validate().then(async ({ valid }: { valid: boolean }) => {
    if (valid) {
      loading.value = true
      if (money.value.type === '送礼')
        dataSource.value.money = -Math.abs(money.value.amount || 0)
      else
        dataSource.value.money = Math.abs(money.value.amount || 0)

      const api = dataSource.value.id ? apiGiftPut : apiGiftPost
      await api(dataSource.value)
      uni.navigateBack()
      uni.showToast({
        title: '保存成功',
        icon: 'none',
      })
      loading.value = false
    }
  })
}

const onSelectFriend = () => {
  uni.navigateTo({
    url: '/pages/friend/select',
    events: {
      acceptDataFromOpenedPage(e: Api.Friend) {
        dataSource.value.friendId = e.id
        dataSource.value.friendName = e.name
      },
    },
  })
}

const rules: FormSchema = {
  validate(formModel) {
    const issues = []
    if (!formModel.date) {
      issues.push({ path: ['date'], message: '请选择日期时间' })
    }
    if (!money.value.amount) {
      issues.push({ path: ['money.amount'], message: '请输入金额' })
    }
    if (!formModel.friendName) {
      issues.push({ path: ['friendName'], message: '请输入亲友姓名' })
    }
    if (!formModel.title) {
      issues.push({ path: ['title'], message: '请填写事由' })
    }
    return issues
  },
  isRequired(path: string) {
    return new Set(['date', 'friendName', 'title']).has(path)
  },
}
</script>

<template>
  <div class="mx-3 space-y-3">
    <div class="grid grid-cols-5 mt-3 justify-items-center gap-2 rounded-2xl bg-white p-2">
      <div v-for="i in columns" :key="i.name" @click="onSelectIcont(i)">
        <div class="h-12 w-12 flex rounded-full" :class="[
          i.icon === dataSource.icon
            ? selectedIconStyle
            : 'bg-gray-100  text-gray',
        ]"
        >
          <div class="m-auto h-8 w-8" :class="i.icon" />
        </div>
        <div class="mt-1 text-center text-sm">
          {{ i.name }}
        </div>
      </div>
    </div>

    <div class="rounded-2xl bg-white p-2">
      <wd-form ref="formRef" layout="vertical" :model="dataSource" center :schema="rules">
        <wd-form-item title="往来方向">
          <wd-segmented v-model:value="money.type" :options="['送礼', '收礼']" />
        </wd-form-item>
        <wd-form-item title="日期时间" prop="date" required>
          <div class="w-full">
            <DatePicker v-model:date="dataSource.date" />
          </div>
        </wd-form-item>
        <wd-form-item title="礼金类型">
          <wd-radio-group v-model="dataSource.moneyType" type="button">
            <div class="flex justify-between">
              <wd-radio :value="0" class="w-full">
                现金
              </wd-radio>
              <wd-radio :value="1" class="w-full">
                实物
              </wd-radio>
            </div>
          </wd-radio-group>
        </wd-form-item>
        <wd-form-item v-if="dataSource.moneyType === 0" title="支付方式">
          <wd-radio-group v-model="dataSource.payway" type="button">
            <div class="flex justify-between">
              <wd-radio value="支付宝">
                支付宝
              </wd-radio>
              <wd-radio value="微信">
                微信
              </wd-radio>
              <wd-radio value="现金">
                现金
              </wd-radio>
              <wd-radio value="其他">
                其他
              </wd-radio>
            </div>
          </wd-radio-group>
        </wd-form-item>
        <wd-form-item v-if="dataSource.moneyType === 1" title="实物内容">
          <wd-input v-model="dataSource.entityName" placeholder="例如：香奈儿邂逅淡香水" :compact="false" />
        </wd-form-item>
        <wd-form-item title="金额" prop="money.amount">
          <wd-input v-model="money.amount" placeholder="礼金或实物金额" type="number" :compact="false" />
          <div class="mt-2 flex justify-between">
            <div v-for="i in money.preset" :key="i">
              <wd-button size="small" type="info" @click="money.amount = i">
                {{ i }}
              </wd-button>
            </div>
          </div>
        </wd-form-item>

        <wd-form-item title="亲友" prop="friendName" required>
          <wd-input v-model="dataSource.friendName" :disabled="!!dataSource.id" placeholder="输入姓名，或点击右侧选择" :compact="false">
            <template #suffix>
              <div class="i-hugeicons-contact-01 text-base text-gray" @click="onSelectFriend" />
            </template>
          </wd-input>
        </wd-form-item>
        <wd-form-item title="事由" prop="title" required>
          <wd-input v-model="dataSource.title" placeholder="例如：结婚" :compact="false" />
        </wd-form-item>
        <wd-form-item title="备注" prop="remarks">
          <wd-input v-model="dataSource.remarks" placeholder="添加细节，让回忆更完整" :compact="false" />
        </wd-form-item>
      </wd-form>
    </div>
    <wd-button :loading="loading" round block @click="onSubmit">
      保存
    </wd-button>
    <div class="text-xs text-gray">
      点亮人情往来的记忆微光，让每一次记账都成为温情的诗行。
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.wd-radio.is-button){
  margin: 0;
}
</style>
