Component({
	data: {
		active: 0,
		list: [
			{
				icon: 'home-o',
				text: '首页',
				url: '/pages/index/index'
			},
			{
				icon: 'balance-list-o',
				text: '礼簿',
				url: '/pages/books/books'
			},
			{
				icon: 'friends-o',
				text: '联系人',
				url: '/pages/friends/friends'
			},
			{
				icon: 'contact',
				text: '我的',
				url: '/pages/profile/profile'
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
