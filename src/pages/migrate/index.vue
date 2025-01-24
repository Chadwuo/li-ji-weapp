<script setup>
import dayjs from 'dayjs'
import MPServerless from '@alicloud/mpserverless-sdk'
import options from './config.json'
const mpserverless = new MPServerless(wx, options)

const msg = ref('')
const userDataScope = ['631b3268e1a35c188109245b', '631c5acbe1a35c1881094aa4']
onLoad(async () => {
    await mpserverless.init()

    wx.getLaunchOptionsSync()
})

const star = async () => {
    const friends = await getCollection('friend')
    const books = await getCollection('book')
    const gift_receives = await getCollection('gift_receive')
    const gift_outs = await getCollection('gift_out')
    // ------------------开始迁移亲友数据-----------------
    msg.value = `迁移【亲友】数据(共 ${friends.length} 条数据)`
    let friendMap = new Map()
    const promises = friends.map(async (element) => {
        try {
            const { name, relation, remarks } = element;
            const response = await apiFriendPost({ name, relation, remarks });
            const { data: friendId } = response;
            // 设置旧ID到新ID的映射
            friendMap.set(element._id, friendId);
        } catch (error) {
            console.error(`迁移朋友 ${element.name} 数据时出错:`, error);
            // 你可以选择在这里继续处理或者抛出异常停止整个过程
        }
    });
    await Promise.all(promises);
    console.log('亲友数据迁移完成');
    // --------------------------------------------------

    // ------------------开始迁移礼簿数据-----------------
    msg.value = `迁移【礼簿】数据(共 ${books.length} 条数据)`
    let bookMap = new Map()
    const promises2 = books.map(async (element) => {
        try {
            const { title, date, remarks, cost, } = element
            const { data: giftBookId } = await apiGiftBookPost({ title, remarks, cost, date: dayjs(date.value).format('YYYY-MM-DD'), lunarDate: `${date.lunar_year} ${date.lunar_month} ${date.lunar_day}` })
            // 设置旧ID到新ID的映射
            bookMap.set(element._id, giftBookId);
        } catch (error) {
            console.error(`迁移送礼 ${element._id} 数据时出错:`, error);
            // 你可以选择在这里继续处理或者抛出异常停止整个过程
        }
    });
    await Promise.all(promises2);
    console.log('礼簿数据迁移完成');
    // --------------------------------------------------

    // ------------------开始迁移送礼数据-----------------
    msg.value = `迁移【送礼】数据(共 ${gift_outs.length} 条数据)`
    const promises3 = gift_outs.map(async (element) => {
        try {
            const { title, icon, date, money, remarks, friendId } = element
            await apiGiftOutPost({ title, icon, money, remarks, friendName: 'liji', friendId: friendMap.get(friendId), date: dayjs(date.value).format('YYYY-MM-DD'), lunarDate: `${date.lunar_year} ${date.lunar_month} ${date.lunar_day}` })
        } catch (error) {
            console.error(`迁移送礼 ${element._id} 数据时出错:`, error);
            // 你可以选择在这里继续处理或者抛出异常停止整个过程
        }
    });
    await Promise.all(promises3);
    console.log('送礼数据迁移完成');
    // --------------------------------------------------

    msg.value = `迁移【收礼】数据(共 ${gift_receives.length} 条数据)`
    const promises4 = gift_receives.map(async (element) => {
        try {
            const { attendance, money, friendId, bookId } = element
            await apiGiftInPost({ attendance: attendance || 0, money, giftBookId: bookMap.get(bookId), friendId: friendMap.get(friendId), friendName: 'liji' })
        } catch (error) {
            console.error(`迁移收礼 ${element._id} 数据时出错:`, error);
            // 你可以选择在这里继续处理或者抛出异常停止整个过程
        }
    });
    await Promise.all(promises4);
    console.log('收礼数据迁移完成');
    // --------------------------------------------------

    // const promises5 = userDataScope.map(async (element) => {
    //     try {
    //         await db.collection('user').updateOne({
    //             _id: element,
    //         }, {
    //             $set: { migrate: true },
    //         })
    //     } catch (error) {
    //         console.error(`用户 ${element._id} 状态更新时出错:`, error);
    //     }
    // });
    // await Promise.all(promises5);
    console.log('用户状态更新完成');

    msg.value = 'ok'
}

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
            return acc.concat(cur.result);
        }
    }, [])
}

</script>

<template>
    <div class="h-full flex flex-col items-center justify-center text-gray">
        <div class="i-tabler-error-404 text-12" />
        <div class="mt-8 text-sm">
            {{ msg }}
        </div>
        <div class="mt-8 min-w-24">
            <wd-button @click="star">
                开始
            </wd-button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">{
    "style": {
        "navigationStyle": "custom"
    }
}</route>