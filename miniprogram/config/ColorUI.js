//框架核心配置
import ColorUI from '../mp-cu/main'
export const colorUI = new ColorUI({
    config: {
        theme: 'auto',
        main: 'red',
        text: 1,
        footer: true,
        share: false,
        shareTitle: '可能是东半球最好用的人情记账工具',
        homePath: '/pages/index/index',
        tabBar: [{
            title: '礼记',
            icon: '/static/tab_icon/book.png',
            curIcon: '/static/tab_icon/book_cur.png',
            url: '/pages/index/index',
            type: 'tab'
        },
        {
            title: '送礼',
            icon: '/static/tab_icon/icon_post.png',
            curIcon: '/static/tab_icon/icon_post_cur.png',
            url: '/pages/giftOut/index',
            type: 'tab'
        },
        {
            title: '亲友',
            icon: '/static/tab_icon/contact.png',
            curIcon: '/static/tab_icon/contact_cur.png',
            url: '/pages/friend/index',
            type: 'tab'
        },
        {
            title: '我的',
            icon: '/static/tab_icon/mine.png',
            curIcon: '/static/tab_icon/mine_cur.png',
            url: '/pages/mine/index',
            type: 'tab'
        }],
    }
})