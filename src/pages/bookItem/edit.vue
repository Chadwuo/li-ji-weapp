<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '收礼记录',
  },
})

const loading = ref(false)
const dataSource = ref<Api.BookItem>({})
const formRef = ref()

// 模式：single 单条录入，batch 批量录入
const mode = ref<'single' | 'batch'>('single')
const isEdit = ref(false)
const bookId = ref<string>()

// 批量录入相关
const batchList = ref<Api.BookItem[]>([])
const defaultMoney = ref<number>()
const showAddPopup = ref(false)
const currentItem = ref<Api.BookItem>({})
const addFormRef = ref()

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
  }
})

// 切换模式
const onModeChange = (newMode: 'single' | 'batch') => {
  if (isEdit.value)
    return
  mode.value = newMode
  if (newMode === 'batch') {
    uni.setNavigationBarTitle({ title: '批量录入' })
  }
  else {
    uni.setNavigationBarTitle({ title: '收礼记录' })
  }
}

// 单条提交
const onSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid)
    return
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

// 选择亲友（单条模式）
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

// 批量模式 - 打开添加弹窗
const onOpenAddPopup = () => {
  currentItem.value = {
    bookId: bookId.value,
    money: defaultMoney.value,
    attendance: 1,
  }
  showAddPopup.value = true
}

// 批量模式 - 选择亲友
const onSelectFriendForBatch = () => {
  uni.navigateTo({
    url: '/pages/friend/select',
    events: {
      acceptDataFromOpenedPage(e: Api.Friend) {
        currentItem.value.friendId = e.id
        currentItem.value.friendName = e.name
      },
    },
  })
}

// 批量模式 - 确认添加一条记录
const onConfirmAdd = async () => {
  const { valid } = await addFormRef.value.validate()
  if (!valid)
    return

  // 检查是否已存在相同亲友
  const exists = batchList.value.some(item => item.friendId === currentItem.value.friendId)
  if (exists) {
    uni.showToast({ title: '该亲友已添加', icon: 'none' })
    return
  }

  batchList.value.push({ ...currentItem.value })
  showAddPopup.value = false
  uni.showToast({ title: '已添加', icon: 'none' })
}

// 批量模式 - 删除一条记录
const onRemoveItem = (index: number) => {
  batchList.value.splice(index, 1)
}

// 批量模式 - 编辑一条记录
const onEditItem = (index: number) => {
  currentItem.value = { ...batchList.value[index] }
  batchList.value.splice(index, 1)
  showAddPopup.value = true
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

// 快捷设置默认金额
const onSetDefaultMoney = (money: number) => {
  defaultMoney.value = money
}

// 计算批量录入统计
const batchStats = computed(() => {
  const count = batchList.value.length
  const total = batchList.value.reduce((sum, item) => sum + (item.money || 0), 0)
  return { count, total }
})

const presetMoney = [200, 500, 1000, 2000]
</script>

<template>
  <div class="mx-3 space-y-3">
    <!-- 模式切换 Tab（仅新增时显示） -->
    <div v-if="!isEdit" class="flex rounded-xl bg-white p-1">
      <div
        class="flex-1 rounded-lg py-2 text-center transition-all"
        :class="mode === 'single' ? 'bg-red-500 text-white' : 'text-gray-600'"
        @click="onModeChange('single')"
      >
        单条录入
      </div>
      <div
        class="flex-1 rounded-lg py-2 text-center transition-all"
        :class="mode === 'batch' ? 'bg-red-500 text-white' : 'text-gray-600'"
        @click="onModeChange('batch')"
      >
        批量录入
      </div>
    </div>

    <!-- 单条录入模式 -->
    <template v-if="mode === 'single'">
      <div class="rounded-2xl bg-white p-2 py-5">
        <wd-form ref="formRef" :model="dataSource">
          <wd-input
            v-if="!dataSource.id" v-model="dataSource.friendName" label="亲友" prop="friendName" placeholder="点击右侧图标选择亲友"
            :rules="[{ required: true, message: '请输入亲友姓名' }]"
          >
            <template #suffix>
              <div class="i-hugeicons-contact-01 text-base text-gray" @click="onSelectFriend" />
            </template>
          </wd-input>
          <wd-input
            v-model="dataSource.money" label="礼金" prop="money" placeholder="随礼金额" type="number"
            :rules="[{ required: true, message: '请填写随礼金额' }]"
          />
          <div class="flex justify-end space-x-2">
            <div v-for="i in presetMoney" :key="i">
              <wd-button plain size="small" @click="dataSource.money = i">
                {{ i }}
              </wd-button>
            </div>
          </div>
          <wd-input v-model="dataSource.attendance" label="出席" prop="attendance" type="number" placeholder="参加宴席人数" />
          <wd-input v-model="dataSource.remarks" label="备注" placeholder="请输入内容" />
        </wd-form>
      </div>

      <wd-button block :loading="loading" @click="onSubmit">
        保存
      </wd-button>
    </template>

    <!-- 批量录入模式 -->
    <template v-else>
      <!-- 默认金额设置 -->
      <div class="rounded-2xl bg-white p-4">
        <div class="mb-2 text-sm text-gray-500">
          默认礼金（新增记录自动填充）
        </div>
        <div class="flex items-center space-x-2">
          <input
            v-model="defaultMoney"
            type="number"
            placeholder="自定义金额"
            class="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
          <div v-for="i in presetMoney" :key="i">
            <wd-button
              :plain="defaultMoney !== i"
              :type="defaultMoney === i ? 'primary' : 'default'"
              size="small"
              @click="onSetDefaultMoney(i)"
            >
              {{ i }}
            </wd-button>
          </div>
        </div>
      </div>

      <!-- 已添加的记录列表 -->
      <div v-if="batchList.length > 0" class="space-y-2">
        <div
          v-for="(item, index) in batchList"
          :key="index"
          class="flex items-center justify-between rounded-2xl bg-white p-4"
        >
          <div class="flex-1" @click="onEditItem(index)">
            <div class="font-medium">
              {{ item.friendName }}
            </div>
            <div class="text-sm text-gray-500">
              ¥{{ item.money }} · {{ item.attendance || 1 }}人
              <span v-if="item.remarks" class="ml-1">· {{ item.remarks }}</span>
            </div>
          </div>
          <div
            class="i-hugeicons-delete-02 text-xl text-gray-400"
            @click="onRemoveItem(index)"
          />
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="rounded-2xl bg-white p-8 text-center text-gray-400">
        <div class="i-hugeicons-note-add mx-auto mb-2 text-4xl" />
        <div>暂无记录，点击下方按钮添加</div>
      </div>

      <!-- 添加按钮 -->
      <div
        class="flex items-center justify-center border-2 border-gray-200 rounded-2xl border-dashed bg-white p-4 text-gray-500"
        @click="onOpenAddPopup"
      >
        <div class="i-hugeicons-add-circle mr-2 text-xl" />
        添加记录
      </div>

      <!-- 统计信息 -->
      <div v-if="batchList.length > 0" class="text-center text-sm text-gray-500">
        已添加 {{ batchStats.count }} 条，共 ¥{{ batchStats.total }}
      </div>

      <!-- 批量保存按钮 -->
      <wd-button block :loading="loading" :disabled="batchList.length === 0" @click="onBatchSubmit">
        批量保存（{{ batchList.length }}条）
      </wd-button>
    </template>

    <!-- 添加记录弹窗 -->
    <wd-popup v-model="showAddPopup" position="bottom" custom-style="border-radius: 16px 16px 0 0;">
      <div class="p-4">
        <div class="mb-4 flex items-center justify-between">
          <div class="text-lg font-medium">
            添加记录
          </div>
          <div class="i-hugeicons-cancel-01 text-xl text-gray-400" @click="showAddPopup = false" />
        </div>

        <wd-form ref="addFormRef" :model="currentItem">
          <wd-input
            v-model="currentItem.friendName"
            label="亲友"
            prop="friendName"
            placeholder="点击右侧图标选择亲友"
            :rules="[{ required: true, message: '请选择亲友' }]"
          >
            <template #suffix>
              <div class="i-hugeicons-contact-01 text-base text-gray" @click="onSelectFriendForBatch" />
            </template>
          </wd-input>
          <wd-input
            v-model="currentItem.money"
            label="礼金"
            prop="money"
            placeholder="随礼金额"
            type="number"
            :rules="[{ required: true, message: '请填写礼金' }]"
          />
          <div class="mb-2 flex justify-end space-x-2">
            <div v-for="i in presetMoney" :key="i">
              <wd-button plain size="small" @click="currentItem.money = i">
                {{ i }}
              </wd-button>
            </div>
          </div>
          <wd-input v-model="currentItem.attendance" label="出席" type="number" placeholder="参加宴席人数" />
          <wd-input v-model="currentItem.remarks" label="备注" placeholder="请输入内容" />
        </wd-form>

        <div class="mt-4">
          <wd-button block @click="onConfirmAdd">
            确认添加
          </wd-button>
        </div>
      </div>
    </wd-popup>
  </div>
</template>

<style lang="scss" scoped></style>
