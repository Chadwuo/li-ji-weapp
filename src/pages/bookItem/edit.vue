<script setup lang="ts">
import type { FormInstance, FormSchema } from '@wot-ui/ui/components/wd-form/types'
import FriendSelectorPopup from '@/components/FriendSelectorPopup.vue'

definePage({
  style: {
    navigationBarTitleText: '收礼记录',
  },
})

const loading = ref(false)
const dataSource = ref<Api.BookItem>({
  moneyType: 0,
})
const formRef = ref<FormInstance>()

// 模式：单条录入，批量录入
const mode = ref<'单条录入' | '批量录入'>('单条录入')
const isEdit = ref(false)
const bookId = ref<string>()

// 批量录入相关
const batchList = ref<Api.BookItem[]>([])
const defaultMoney = ref<number>()
const currentItem = ref<Api.BookItem>({ bookId: bookId.value, money: defaultMoney.value, attendance: 0 })
const addFormRef = ref<any>()
const friendSelectorVisible = ref(false)
const friendSelectorTarget = ref<'single' | 'batch'>('single')

onLoad(async (option) => {
  if (option?.id) {
    isEdit.value = true
    uni.setNavigationBarTitle({
      title: '编辑',
    })
    dataSource.value = await apiBookItemGet({ id: option.id })
  }
  else {
    bookId.value = option?.bookId
    dataSource.value.bookId = option?.bookId
    // 更新currentItem的bookId
    currentItem.value.bookId = option?.bookId
  }
})

// 单条提交
const onSubmit = async () => {
  formRef.value?.validate().then(async ({ valid }: { valid: boolean }) => {
    if (valid) {
      loading.value = true
      const api = dataSource.value.id ? apiBookItemPut : apiBookItemPost
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

const rules: FormSchema = {
  validate(formModel) {
    const issues = []
    if (!formModel.friendName) {
      issues.push({ path: ['friendName'], message: '请输入亲友姓名' })
    }
    return issues
  },
  isRequired(path: string) {
    return new Set(['friendName']).has(path)
  },
}

// 选择亲友（单条模式）
const onSelectFriend = () => {
  if (dataSource.value.id)
    return

  friendSelectorTarget.value = 'single'
  friendSelectorVisible.value = true
}

// 批量模式 - 选择亲友
const onSelectFriendForBatch = () => {
  friendSelectorTarget.value = 'batch'
  friendSelectorVisible.value = true
}

const onFriendSelected = (friend: Api.Friend) => {
  if (friendSelectorTarget.value === 'single') {
    dataSource.value.friendId = friend.id
    dataSource.value.friendName = friend.name
    return
  }

  currentItem.value.friendId = friend.id
  currentItem.value.friendName = friend.name
}

// 批量模式 - 确认添加一条记录
const onConfirmAdd = async () => {
  const { valid } = await addFormRef.value.validate()
  if (!valid)
    return

  // 检查是否已存在相同亲友
  const exists = batchList.value.some(item => item.friendName === currentItem.value.friendName)
  if (exists) {
    uni.showToast({ title: '该亲友已添加', icon: 'none' })
    return
  }

  // 将新数据添加到数组开头，实现倒序显示
  batchList.value.unshift({ ...currentItem.value })
  // 重置表单
  currentItem.value = { bookId: bookId.value, money: defaultMoney.value, attendance: 0 }
  uni.showToast({ title: '已添加', icon: 'none' })
}

// 批量模式 - 删除一条记录
const onRemoveItem = (index: number) => {
  batchList.value.splice(index, 1)
}

// 批量模式 - 批量提交
const onBatchSubmit = async () => {
  if (batchList.value.length === 0) {
    uni.showToast({ title: '请先添加记录', icon: 'none' })
    return
  }

  loading.value = true
  await apiBookItemBatchPost(batchList.value)
  uni.navigateBack()
  uni.showToast({
    title: `成功保存 ${batchList.value.length} 条记录`,
    icon: 'none',
  })
  loading.value = false
}

// 计算批量录入统计
const batchStats = computed(() => {
  const count = batchList.value.length
  const total = batchList.value.reduce((sum, item) => {
    // 确保item.money是数字类型后再累加
    const money = typeof item.money === 'string' ? Number.parseFloat(item.money) : item.money
    return sum + (money || 0)
  }, 0)
  return { count, total }
})

const presetMoney = [100, 200, 500, 800, 1000, 2000]
</script>

<template>
  <div class="mx-3 space-y-3">
    <!-- 模式切换 Tab（仅新增时显示） -->
    <div v-if="!isEdit" class="flex rounded-2xl bg-white p-1">
      <wd-segmented v-if="!isEdit" v-model:value="mode" custom-class="!bg-white" :options="['单条录入', '批量录入']" />
    </div>

    <!-- 单条录入模式 -->
    <template v-if="mode === '单条录入'">
      <div class="rounded-2xl bg-white p-2">
        <wd-form ref="formRef" layout="vertical" :model="dataSource" center :schema="rules">
          <wd-form-item title="礼金类型">
            <wd-radio-group v-model="dataSource.moneyType" type="button" class="flex justify-between">
              <wd-radio :value="0" class="w-full">
                现金
              </wd-radio>
              <wd-radio :value="1" class="w-full">
                实物
              </wd-radio>
            </wd-radio-group>
          </wd-form-item>
          <wd-form-item v-if="dataSource.moneyType === 0" title="支付方式">
            <wd-radio-group v-model="dataSource.payWay" type="button">
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
          <wd-form-item title="金额" prop="money">
            <wd-input v-model="dataSource.money" placeholder="礼金或实物金额" type="number" :compact="false" />
            <div class="mt-2 flex justify-between">
              <div v-for="i in presetMoney" :key="i">
                <wd-button size="small" type="info" @click="dataSource.money = i">
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
          <wd-form-item title="出席" prop="attendance">
            <wd-input v-model="dataSource.attendance" placeholder="参加宴席人数" type="number" :compact="false" />
          </wd-form-item>
          <wd-form-item title="备注" prop="remarks">
            <wd-input v-model="dataSource.remarks" placeholder="添加细节，让回忆更完整" :compact="false" />
          </wd-form-item>
        </wd-form>
      </div>

      <wd-button round block :loading="loading" @click="onSubmit">
        保存
      </wd-button>
    </template>

    <!-- 批量录入模式 -->
    <template v-else>
      <!-- 可编辑列表 -->
      <div class="rounded-2xl bg-white">
        <!-- 列表内容 -->
        <wd-form ref="addFormRef">
          <!-- 添加新记录行 -->
          <div class="border-b p-4">
            <div class="mb-2 flex items-center justify-between">
              <div class="text-sm text-gray-500 font-medium">
                添加新记录
              </div>
              <wd-button size="small" class="w-20" :disabled="!currentItem.friendName" @click="onConfirmAdd">
                添加
              </wd-button>
            </div>
            <div class="space-y-3">
              <wd-input
                v-model="currentItem.friendName"
                placeholder="点击右侧图标选择亲友"
                type="text"
              >
                <template #prefix>
                  <div class="text-gray-500">
                    亲友
                  </div>
                </template>
                <template #suffix>
                  <div class="i-hugeicons-contact-01 p-1 text-base text-gray" @click="onSelectFriendForBatch" />
                </template>
              </wd-input>
              <div class="flex space-x-3">
                <wd-input
                  v-model="currentItem.money"
                  placeholder="随礼金额"
                  type="number"
                  class="flex-1"
                >
                  <template #prefix>
                    <div class="text-gray-500">
                      礼金
                    </div>
                  </template>
                </wd-input>
                <wd-input
                  v-model="currentItem.attendance"
                  placeholder="人数"
                  type="number"
                  class="flex-1"
                >
                  <template #prefix>
                    <div class="text-gray-500">
                      出席
                    </div>
                  </template>
                </wd-input>
              </div>
              <wd-input
                v-model="currentItem.remarks"
                placeholder="备注"
                type="text"
              >
                <template #prefix>
                  <div class="text-gray-500">
                    备注
                  </div>
                </template>
              </wd-input>
            </div>
          </div>

          <!-- 分隔线 -->
          <div class="mx-4">
            <wd-divider>已添加 {{ batchStats.count }} 条，共 ¥ {{ batchStats.total }}</wd-divider>
          </div>

          <!-- 已添加记录列表 -->
          <div v-if="batchList.length > 0">
            <transition-group name="list-item" tag="div">
              <div
                v-for="(item, index) in batchList"
                :key="index"
                class="border-b p-4 last:border-b-0"
              >
                <div class="flex items-center justify-between">
                  <div class="font-medium">
                    {{ item.friendName }}
                  </div>
                  <div class="i-hugeicons-delete-02 text-xl text-gray-400" @click="onRemoveItem(index)" />
                </div>
                <div class="mt-2 space-y-3">
                  <div class="flex space-x-3">
                    <wd-input
                      v-model="batchList[index].money"
                      placeholder="随礼金额"
                      type="number"
                      class="flex-1"
                    >
                      <template #prefix>
                        <div class="text-gray-500">
                          礼金
                        </div>
                      </template>
                    </wd-input>
                    <wd-input
                      v-model="batchList[index].attendance"
                      placeholder="人数"
                      type="number"
                      class="flex-1"
                    >
                      <template #prefix>
                        <div class="text-gray-500">
                          出席
                        </div>
                      </template>
                    </wd-input>
                  </div>
                  <wd-input
                    v-model="batchList[index].remarks"
                    placeholder="备注"
                    type="text"
                  >
                    <template #prefix>
                      <div class="text-gray-500">
                        备注
                      </div>
                    </template>
                  </wd-input>
                </div>
              </div>
            </transition-group>
          </div>

          <!-- 空状态 -->
          <div v-else class="p-8 text-center text-gray-400">
            <div class="i-hugeicons-note-add mx-auto mb-2 text-4xl" />
            <div>暂无记录</div>
            <div class="mt-2 text-sm">
              使用上方表单添加第一条记录
            </div>
          </div>
        </wd-form>
      </div>

      <!-- 底部间距，避免内容被固定按钮遮挡 -->
      <div class="h-12" />
    </template>
  </div>

  <!-- 固定在底部的批量保存按钮 -->
  <div v-if="mode === '批量录入'" class="fixed bottom-12 left-0 right-0 p-3">
    <wd-button round block :loading="loading" :disabled="batchList.length === 0" @click="onBatchSubmit">
      批量保存
    </wd-button>
    <uv-safe-bottom />
  </div>
  <FriendSelectorPopup v-model:visible="friendSelectorVisible" @select="onFriendSelected" />
</template>

<style lang="scss" scoped>
:deep(.wd-segmented__item.is-active) {
    background: #f87171;
    color: #fff;
    border-radius: 12px;
}

/* 列表项动画 */
.list-item-enter-active,
.list-item-leave-active {
  transition: all 0.3s ease;
}

.list-item-enter-from,
.list-item-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.list-item-move {
  transition: transform 0.3s ease;
}
</style>
