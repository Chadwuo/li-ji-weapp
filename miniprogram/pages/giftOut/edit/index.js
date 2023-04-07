// pages/giftOut/edit/index.js
const giftOutService = require('../../../alicloud/services/giftOut')
const app = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		_id: '',
		friendId: '',
		friendName: '',
		title: '',
		icon: '',
		date: {},
		money: '',
		remarks: '',
		columns: [{
			name: '结婚',
			icon: 'iconfont icon-jiehun'
		}, {
			name: '宝宝',
			icon: 'iconfont icon-qinzi'
		}, {
			name: '周岁',
			icon: 'iconfont icon-zhousui'
		}, {
			name: '乔迁',
			icon: 'iconfont icon-qiaoqian'
		}, {
			name: '生日',
			icon: 'iconfont icon-shengri'
		}, {
			name: '升学',
			icon: 'iconfont icon-jiaoyu'
		}, {
			name: '大寿',
			icon: 'iconfont icon-laoren'
		}, {
			name: '探望',
			icon: 'iconfont icon-yiyuan'
		}, {
			name: '白事',
			icon: 'iconfont icon-sangzang'
		}, {
			name: '其他',
			icon: 'cicon-moneybag-o'
		}, ],
	},
	iconChange(e) {
		let {
			selected
		} = e.currentTarget.dataset

		this.setData({
			title: selected.name,
			icon: selected.icon
		})

	},
	async onSave() {
		const eventChannel = this.getOpenerEventChannel()
		if (this.data._id) {
			const res = await giftOutService.updateGiftOut(this.data)
			if (res.success) {
				wx.showToast({
					title: '修改成功',
				})
				eventChannel.emit('refresh');
				app.needRefreshTotal = true
				setTimeout(() => {
					wx.navigateBack()
				}, 1000);
			}
		} else {
			const res = await giftOutService.addGiftOut(this.data)
			if (res.success) {
				wx.showToast({
					title: '添加成功',
				})
				eventChannel.emit('refresh');
				app.needRefreshTotal = true
				setTimeout(() => {
					wx.navigateBack()
				}, 1000);
			}
		}
	},
	async onDelete() {
		let delData = this.data
		const eventChannel = this.getOpenerEventChannel()
		wx.showModal({
			title: '删除来往记录？',
			content: '此操作无法恢复，确定删除？',
			async success(res) {
				if (res.confirm) {
					const result = await giftOutService.deleteGiftOut(delData)
					if (result.success) {
						wx.showToast({
							title: '删除成功',
						})
						eventChannel.emit('refresh');
						app.needRefreshTotal = true
						setTimeout(() => {
							wx.navigateBack()
						}, 1000);
					}
				}
			}
		})
	},
	showCalendar() {
		let that = this
		wx.navigateTo({
			url: `/pages/calendar/index?date=${this.data.date.value}`,
			events: {
				// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
				handleCalendarDateChange: function (data) {
					that.setData({
						date: data
					})
				},
			}
		});
	},
	showFriendSelect() {
		let that = this
		wx.navigateTo({
			url: '/pages/friend/select/index',
			events: {
				// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
				dialogResult: function (data) {
					that.setData({
						friendId: data._id,
						friendName: data.name,
					})
				},
			}
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		const eventChannel = this.getOpenerEventChannel()
		eventChannel.on('acceptDataFromOpenerPage', (data) => {
			this.setData({
				...data
			})
			wx.setNavigationBarTitle({
				title: '编辑记录'
			})
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},
})