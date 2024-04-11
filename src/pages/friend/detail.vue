<template>
    <div class="h-full flex flex-col">
        <div class="px-5 pt-3 pb-5 space-y-3 bg-white rounded-b-2xl">
            <div class="flex justify-between items-center">
                <div>
                    <div class="font-bold text-lg">
                        {{ dataSource.name }}
                    </div>
                    <div class="text-sm text-gray mt-1">
                        <span>{{ dataSource.relation }}</span>
                    </div>
                </div>
                <div class="flex text-xl font-bold text-red">
                    <div class="py-2 pl-2" @click="handleEditClick(dataSource)">
                        <div class="i-carbon-edit"></div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <span class="text-lg font-bold"
                    :class="statisticsData.happyTotal >= statisticsData.sadTotal ? 'text-red' : 'text-green'">
                    {{ statisticsData.happyTotal - statisticsData.sadTotal }}
                </span>
                <span class="text-sm">(收支差)</span>
            </div>
            <div class="grid gap-5 grid-cols-2 divide-x">
                <div class="text-center">
                    <div class="text-lg font-bold text-red">
                        {{ statisticsData.happyTotal }}
                    </div>
                    <div class="text-sm text-gray flex justify-center items-center space-x-1">
                        <div class="i-icon-park-outline-income"></div>
                        <div>收礼({{ statisticsData.happyCount }})</div>
                    </div>
                </div>
                <div class="text-center">
                    <div class="text-lg font-bold text-green">
                        {{ statisticsData.sadTotal }}
                    </div>
                    <div class="text-sm text-gray flex justify-center items-center space-x-1">
                        <div class="i-icon-park-outline:expenses"></div>
                        <div>送礼({{ statisticsData.sadCount }})</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="my-auto" v-if="giftList.length == 0">
            <uv-empty></uv-empty>
        </div>
        <div class="my-5 space-y-3">
            <!-- <div v-for="gift in giftList" :key="gift._id" @click="handleGiftClick(gift)">
                <div class="flex justify-around items-center h-18">
                    <div>
                        <div class="text-lg">{{ gift.friendInfo.name }}</div>
                        <div class="text-gray text-sm">出席：{{ gift.attendance }} 人</div>
                    </div>
                    <div class="text-right">
                        <div class="font-bold text-lg"
                            :class="[hasMourningWords(book.title) ? 'text-gray' : 'text-red']"><span
                                class="text-sm">￥</span>{{ gift.money }}</div>
                        <div class="text-gray text-sm">礼金</div>
                    </div>
                </div>
            </div> -->

            <view class="cu-timeline" v-for="(gift, index) in giftList" :key="index" @click="handleGiftClick(gift)">
                <view class="cu-time">{{ gift.year }}</view>
                <view class="cu-item " v-for="(item, index) in gift.list" :key="index">
                    <view class="bg-white rounded-2xl p-4" :class="item.self ? 'text-green' : 'text-red'"
                        @click="onGiftClick(item)">
                        <view class="flex justify-between items-center">
                            <view class="flex flex-col space-y-1">
                                <text class="text-lg text-bold"> {{ item.title }}</text>
                                <text class="text-sm text-gray"> {{ item.remarks }}</text>
                                <view class="text-sm text-gray">{{ item.date.value }} {{ item.date.lunar_month }}{{
                            item.date.lunar_day }}</view>
                            </view>
                            <view class="mr-4 text-center">
                                <view><text class="text-sm">￥</text><text class="text-lg font-bold">{{ item.money }}</text></view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </div>
    </div>
</template>

<script setup>
import { getFriendGifts } from '~/alicloud/services/friend'
import { hasMourningWords } from '~/utils/index'

const dataSource = ref({
    date: {}
})
const statisticsData = ref({
    happyTotal: 0,
    sadTotal: 0
})
const giftList = ref([])
onLoad((option) => {
    dataSource.value = { ...router.getQueryParse(option) }
    loadData()
    uni.$on('friend_edit_page_update', () => {
        loadData()
    })
})
onUnload(() => {
    uni.$off('friend_edit_page_update')
    console.log('friend detail page unload');
})

const pagination = ref({
    pageNo: 1,
    pageSize: 20,
    loading: false,
})
const loadData = () => {
    const { pageSize, pageNo } = pagination.value
    getFriendGifts({
        _id: dataSource.value._id,
    }).then(res => {
        if (res.success) {
            const { giftOutList, giftReceiveList } = res.result;
            statisticsData.value.sadCount = giftOutList.length // 送礼次数
            statisticsData.value.happyCount = giftReceiveList.length // 收礼次数
            let inList = giftReceiveList.map((i) => {
                // 收礼金额总计
                statisticsData.value.happyTotal += i.money;
                return {
                    _id: i._id,
                    title: i.bookInfo.title,
                    money: i.money,
                    date: i.bookInfo.date,
                    year: i.bookInfo.date.year,
                    self: false,
                };
            });
            let outList = giftOutList.map((i) => {
                // 送礼金额总计
                statisticsData.value.sadTotal += i.money;
                return {
                    _id: i._id,
                    title: i.title,
                    money: i.money,
                    date: i.date,
                    year: i.date.year,
                    icon: i.icon,
                    self: true,
                    remarks: i.remarks,
                };
            });

            let allGifts = [...inList, ...outList];
            const sortedGifts = allGifts.sort(
                (a, b) => dayjs(b.date.value).unix() - dayjs(a.date.value).unix()
            );

            const groupedGifts = sortedGifts.reduce((acc, curr) => {
                acc[curr.year] = acc[curr.year] ? [...acc[curr.year], curr] : [curr];
                return acc;
            }, {});

            const sortedGroupedGifts = Object.entries(groupedGifts).map(([year, list]) => ({
                year,
                list,
            })).sort((a, b) => b.year - a.year);
            console.log('object :>> ', sortedGroupedGifts);

            giftList.value = sortedGroupedGifts
        }
    })
}

const handleEditClick = (e) => {
    const { _id, name, relation, remarks } = e
    router.push({
        path: '/pages/friend/edit',
        query: { _id, name, relation, remarks }
    })
}
</script>

<style lang="scss" scoped>
/* ==================
         时间轴
 ==================== */

.cu-timeline {
    display: block;
    background-color: var(--white);
}

.cu-timeline .cu-time {
    width: 120rpx;
    text-align: center;
    padding: 20rpx 0;
    font-size: 26rpx;
    color: #888;
    display: block;
}

.cu-timeline>.cu-item {
    padding: 30rpx 30rpx 30rpx 120rpx;
    position: relative;
    display: block;
    z-index: 0;
}

.cu-timeline>.cu-item:not([class*="text-"]) {
    color: #ccc;
}

.cu-timeline>.cu-item::after {
    content: "";
    display: block;
    position: absolute;
    width: 1rpx;
    background-color: #ddd;
    left: 60rpx;
    height: 100%;
    top: 0;
    z-index: 8;
}

.cu-timeline>.cu-item::before {
    font-family: "cuIcon";
    display: block;
    position: absolute;
    top: 36rpx;
    z-index: 9;
    background-color: var(--white);
    width: 50rpx;
    height: 50rpx;
    text-align: center;
    border: none;
    line-height: 50rpx;
    left: 36rpx;
}

.cu-timeline>.cu-item:not([class*="cicon-"])::before {
    //content: "\e763";
}

.cu-timeline>.cu-item[class*="cicon-"]::before {
    background-color: var(--white);
    width: 50rpx;
    height: 50rpx;
    text-align: center;
    border: none;
    line-height: 50rpx;
    left: 36rpx;
}

.cu-timeline>.cu-item>.content {
    padding: 30rpx;
    border-radius: 6rpx;
    display: block;
    line-height: 1.6;
}

.cu-timeline>.cu-item>.content:not([class*="bg-"]) {
    background-color: var(--ghostWhite);
    color: var(--black);
}

.cu-timeline>.cu-item>.content+.content {
    margin-top: 20rpx;
}
</style>

<route lang="json">{
    "layout": "blank",
    "style": {
        "navigationBarTitleText": "详情"
    }
}</route>