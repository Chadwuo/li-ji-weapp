declare namespace Api {
	interface Response<T = any> {
		/**
		 *
		 * @type {number}
		 */
		statusCode: number;
		/**
		 *
		 * @type {object}
		 */
		data?: T;
		/**
		 *
		 * @type {boolean}
		 */
		succeeded: boolean;
		/**
		 *
		 * @type {object}
		 */
		errors: string;
		/**
		 *
		 * @type {object}
		 */
		extras: object;
		/**
		 *
		 * @type {number}
		 */
		timestamp: number;
	}

	interface PaginationResult<T = any> {
		/**
		 * 页码
		 * @type {number}
		 */
		page?: number;
		/**
		 * 页容量
		 * @type {number}
		 */
		pageSize?: number;
		/**
		 * 总条数
		 * @type {number}
		 */
		total?: number;
		/**
		 * 总页数
		 * @type {number}
		 */
		totalPages?: number;
		/**
		 * 是否有上一页
		 * @type {boolean}
		 */
		hasPrevPage?: boolean;
		/**
		 * 是否有下一页
		 * @type {boolean}
		 */
		hasNextPage?: boolean;
		/**
		 * 当前页集合
		 * @type {Array<T>}
		 */
		items?: Array<T> | null;
	}

	interface PaginationQuery {
		/**
		 * 页码
		 * @type {number}
		 */
		page?: number;
		/**
		 * 页容量
		 * @type {number}
		 */
		pageSize?: number;
		field?: string;
		order?: 'asc' | 'desc';
	}

	type LoadMoreDataType<T = any> = Omit<PaginationResult<T>, 'items'> & {
		list: Array<T>;
	};

	interface LoginToken {
		/**
		 * 令牌Token
		 * @type {string}
		 */
		accessToken: string;
		/**
		 * 刷新Token
		 * @type {string}
		 */
		refreshToken: string;
	}
	interface LoginUser {
		/**
		 *
		 * @type {User}
		 */
		userInfo: User;
		/**
		 * 用户家庭信息
		 * @type {Array<UserFamily>}
		 */
		userFamilys?: Array<UserFamily>;
		/**
		 *
		 * @type {UserSubscription}
		 */
		userSubscription?: UserSubscription;
	}
	interface User {
		/**
		 * 雪花Id
		 * @type {number}
		 * @memberof User
		 */
		id: number;
		/**
		 * 创建时间
		 * @type {string}
		 * @memberof User
		 */
		createTime?: string;
		/**
		 * 更新时间
		 * @type {string}
		 * @memberof User
		 */
		updateTime?: string | null;
		/**
		 * OpenId
		 * @type {string}
		 * @memberof User
		 */
		openId: string;
		/**
		 * UnionId
		 * @type {string}
		 * @memberof User
		 */
		unionId?: string | null;
		/**
		 * 昵称
		 * @type {string}
		 * @memberof User
		 */
		nickName?: string | null;
		/**
		 * 头像
		 * @type {string}
		 * @memberof User
		 */
		avatar?: string | null;
		/**
		 * 手机号码
		 * @type {string}
		 * @memberof User
		 */
		phone?: string | null;
	}
	interface UserFamily {
		/**
		 * 用户Id
		 * @type {number}
		 */
		userId?: number;
		/**
		 * 昵称
		 * @type {string}
		 */
		nickName?: string | null;
		/**
		 * 头像
		 * @type {string}
		 */
		avatar?: string | null;
		/**
		 * 用户在该家庭组中的角色（如管理员、成员）
		 * @type {string}
		 */
		role?: string | null;
		/**
		 * 家庭GUID
		 * @type {string}
		 */
		familyId?: string | null;
	}
	interface UserSubscription {
		/**
		 * 雪花Id
		 * @type {number}
		 * @memberof UserSubscription
		 */
		id: number;
		/**
		 * 创建时间
		 * @type {string}
		 * @memberof UserSubscription
		 */
		createTime?: string;
		/**
		 * 更新时间
		 * @type {string}
		 * @memberof UserSubscription
		 */
		updateTime?: string | null;
		/**
		 * 用户Id
		 * @type {number}
		 * @memberof UserSubscription
		 */
		userId?: number;
		/**
		 *
		 * @type {User}
		 * @memberof UserSubscription
		 */
		user?: User;
		/**
		 * 商户订单号
		 * @type {string}
		 * @memberof UserSubscription
		 */
		outTradeNumber: string;
		/**
		 * 支付订单号
		 * @type {string}
		 * @memberof UserSubscription
		 */
		transactionId: string;
		/**
		 * 交易状态
		 * @type {string}
		 * @memberof UserSubscription
		 */
		tradeState?: string | null;
		/**
		 * 用户支付金额
		 * @type {number}
		 * @memberof UserSubscription
		 */
		payerTotal?: number | null;
		/**
		 * 订阅到期时间
		 * @type {string}
		 * @memberof UserSubscription
		 */
		expireTime?: string | null;
		/**
		 * 优惠标记
		 * @type {string}
		 * @memberof UserSubscription
		 */
		goodsTag?: string | null;
	}

	interface GiftBook {
		/**
		 * ID
		 * @type {number}
		 */
		id?: number;
		/**
		 * 标题
		 * @type {string}
		 */
		title?: string | null;
		/**
		 * 成本
		 * @type {number}
		 */
		cost?: number;
		/**
		 * 备注
		 * @type {string}
		 */
		remarks?: string | null;
		/**
		 * 日期
		 * @type {string}
		 */
		date?: string;
		/**
		 * 农历
		 * @type {string}
		 */
		lunarDate?: string | null;
		/**
		 * 出席人数
		 * @type {number}
		 */
		attendanceTotal?: number;
		/**
		 * 人情份数
		 * @type {number}
		 */
		giftCount?: number;
		/**
		 * 总计
		 * @type {number}
		 */
		moneyTotal?: number;
	}

	interface Friend {
		/**
		 * 雪花Id
		 * @type {number}
		 * @memberof Friend
		 */
		id: number;
		/**
		 * 创建时间
		 * @type {string}
		 * @memberof Friend
		 */
		createTime?: string;
		/**
		 * 更新时间
		 * @type {string}
		 * @memberof Friend
		 */
		updateTime?: string | null;
		/**
		 * 用户Id
		 * @type {number}
		 * @memberof Friend
		 */
		userId?: number;
		/**
		 *
		 * @type {User}
		 * @memberof Friend
		 */
		user?: User;
		/**
		 * 姓名
		 * @type {string}
		 * @memberof Friend
		 */
		name?: string | null;
		/**
		 * 首字母
		 * @type {string}
		 * @memberof Friend
		 */
		firstLetter?: string | null;
		/**
		 * 关系
		 * @type {string}
		 * @memberof Friend
		 */
		relation?: string | null;
		/**
		 * 备注
		 * @type {string}
		 * @memberof Friend
		 */
		remarks?: string | null;
	}

	interface GiftIn {
		/**
		 * 雪花Id
		 * @type {number}
		 * @memberof GiftIn
		 */
		id?: number;
		/**
		 * 创建时间
		 * @type {string}
		 * @memberof GiftIn
		 */
		createTime?: string;
		/**
		 * 更新时间
		 * @type {string}
		 * @memberof GiftIn
		 */
		updateTime?: string | null;
		/**
		 * 用户Id
		 * @type {number}
		 * @memberof GiftIn
		 */
		userId?: number;
		/**
		 *
		 * @type {User}
		 * @memberof GiftIn
		 */
		user?: User;
		/**
		 * 金额
		 * @type {number}
		 * @memberof GiftIn
		 */
		money?: number;
		/**
		 * 出席人数
		 * @type {number}
		 * @memberof GiftIn
		 */
		attendance?: number;
		/**
		 * 备注
		 * @type {string}
		 * @memberof GiftIn
		 */
		remarks?: string | null;
		/**
		 * 礼簿Id
		 * @type {number}
		 * @memberof GiftIn
		 */
		giftBookId?: number;
		/**
		 *
		 * @type {GiftBook}
		 * @memberof GiftIn
		 */
		giftBook?: GiftBook;
		/**
		 * 亲友Id
		 * @type {number}
		 * @memberof GiftIn
		 */
		friendId?: number;
		/**
		 *
		 * @type {Friend}
		 * @memberof GiftIn
		 */
		friend?: Friend;
	}

	interface GiftOut {
		/**
		 * 雪花Id
		 * @type {number}
		 * @memberof GiftOut
		 */
		id: number;
		/**
		 * 创建时间
		 * @type {string}
		 * @memberof GiftOut
		 */
		createTime?: string;
		/**
		 * 更新时间
		 * @type {string}
		 * @memberof GiftOut
		 */
		updateTime?: string | null;
		/**
		 * 用户Id
		 * @type {number}
		 * @memberof GiftOut
		 */
		userId?: number;
		/**
		 *
		 * @type {User}
		 * @memberof GiftOut
		 */
		user?: User;
		/**
		 * 主题
		 * @type {number}
		 * @memberof GiftOut
		 */
		title?: number;
		/**
		 * 金额
		 * @type {number}
		 * @memberof GiftOut
		 */
		money?: number;
		/**
		 * Icon
		 * @type {number}
		 * @memberof GiftOut
		 */
		icon?: number | null;
		/**
		 * 备注
		 * @type {string}
		 * @memberof GiftOut
		 */
		remarks?: string | null;
		/**
		 * 日期
		 * @type {string}
		 * @memberof GiftOut
		 */
		date?: string;
		/**
		 * 农历
		 * @type {string}
		 * @memberof GiftOut
		 */
		lunarDate?: string | null;
		/**
		 * 亲友Id
		 * @type {number}
		 * @memberof GiftOut
		 */
		friendId?: number;
		/**
		 *
		 * @type {Friend}
		 * @memberof GiftOut
		 */
		friend?: Friend;
	}
}
