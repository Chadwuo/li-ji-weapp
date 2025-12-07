import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    backgroundColor: '@bgColor',
    backgroundColorBottom: '@bgColorBottom',
    backgroundColorTop: '@bgColorTop',
    backgroundTextStyle: '@bgTxtStyle',
    navigationBarBackgroundColor: '@navBgColor',
    navigationBarTextStyle: '@navTxtStyle',
    navigationBarTitleText: '礼记',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^uv-(.*)': '@climblee/uv-ui/components/uv-$1/uv-$1.vue',
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
        iconPath: 'static/tabbar/book-home.png',
        selectedIconPath: 'static/tabbar/book-home-fill.png',
        pagePath: 'pages/index/index',
        text: '礼记',
      },
      {
        iconPath: 'static/tabbar/pie-chart.png',
        selectedIconPath: 'static/tabbar/pie-chart-fill.png',
        pagePath: 'pages/stats/index',
        text: '统计',
      },
      {
        iconPath: 'static/tabbar/contact-book.png',
        selectedIconPath: 'static/tabbar/contact-book-fill.png',
        pagePath: 'pages/friend/list',
        text: '亲友',
      },
      {
        iconPath: 'static/tabbar/user.png',
        selectedIconPath: 'static/tabbar/user-fill.png',
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
})
