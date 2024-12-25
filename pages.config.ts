import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages';

export default defineUniPages({
	pages: [],
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
				iconPath: 'static/tabbar/book.png',
				selectedIconPath: 'static/tabbar/book_cur.png',
				pagePath: 'pages/book/page',
				text: '礼记',
			},
			{
				iconPath: 'static/tabbar/icon_post.png',
				selectedIconPath: 'static/tabbar/icon_post_cur.png',
				pagePath: 'pages/giftOut/page',
				text: '送礼',
			},
			{
				iconPath: 'static/tabbar/contact.png',
				selectedIconPath: 'static/tabbar/contact_cur.png',
				pagePath: 'pages/friend/list',
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
});
