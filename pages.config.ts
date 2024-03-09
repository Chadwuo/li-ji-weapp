import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  globalStyle: {
    'navigationBarTitleText': '礼记',
    'navigationBarBackgroundColor': '@navBgColor',
    'navigationBarTextStyle': '@navTxtStyle',
    'backgroundColor': '@bgColor',
    'backgroundTextStyle': '@bgTxtStyle',
    'backgroundColorTop': '@bgColorTop',
    'backgroundColorBottom': '@bgColorBottom',
    'app-plus': {
      titleNView: false, // 移除 H5、APP 顶部导航
    },
  },
  easycom: {
    autoscan: true,
    custom: {
      "^uv-(.*)": "@climblee/uv-ui/components/uv-$1/uv-$1.vue"
    },
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#F87171',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/book.png',
        selectedIconPath: 'static/tabbar/book_cur.png',
        pagePath: 'pages/book/index',
        text: '礼记',
      },
      {
        iconPath: 'static/tabbar/icon_post.png',
        selectedIconPath: 'static/tabbar/icon_post_cur.png',
        pagePath: 'pages/giftOut/index',
        text: '送礼',
      },
      {
        iconPath: 'static/tabbar/contact.png',
        selectedIconPath: 'static/tabbar/contact_cur.png',
        pagePath: 'pages/friend/index',
        text: '亲友',
      },
      {
        iconPath: 'static/tabbar/mine.png',
        selectedIconPath: 'static/tabbar/mine_cur.png',
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
})
