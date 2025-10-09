declare namespace Api {
  interface Response<T = any> {
    /**
     *
     * @type {number}
     */
    statusCode: number
    /**
     *
     * @type {object}
     */
    data?: T
    /**
     *
     * @type {boolean}
     */
    succeeded: boolean
    /**
     *
     * @type {object}
     */
    errors: object
    /**
     *
     * @type {object}
     */
    extras: object
    /**
     *
     * @type {number}
     */
    timestamp: number
  }

  interface PaginationResult<T = any> {
    /**
     * 页码
     * @type {number}
     */
    page?: number
    /**
     * 页容量
     * @type {number}
     */
    pageSize?: number
    /**
     * 总条数
     * @type {number}
     */
    total?: number
    /**
     * 总页数
     * @type {number}
     */
    totalPages?: number
    /**
     * 是否有上一页
     * @type {boolean}
     */
    hasPrevPage?: boolean
    /**
     * 是否有下一页
     * @type {boolean}
     */
    hasNextPage?: boolean
    /**
     * 当前页集合
     * @type {Array<T>}
     */
    items?: Array<T> | null
  }

  interface PaginationQuery {
    /**
     * 页码
     * @type {number}
     */
    page?: number
    /**
     * 页容量
     * @type {number}
     */
    pageSize?: number
    field?: string
    order?: 'asc' | 'desc'
  }

  interface LoginToken {
    /**
     * 令牌Token
     * @type {string}
     */
    accessToken: string
    /**
     * 刷新Token
     * @type {string}
     */
    refreshToken: string
  }

  interface User {
    /**
     * 雪花Id
     * @type {string}
     * @memberof User
     */
    id: string
    /**
     * OpenId
     * @type {string}
     * @memberof User
     */
    openId?: string
    /**
     * UnionId
     * @type {string}
     * @memberof User
     */
    unionId?: string
    /**
     * 昵称
     * @type {string}
     * @memberof User
     */
    nickName?: string
    /**
     * 头像
     * @type {string}
     * @memberof User
     */
    avatar?: string
    /**
     * 手机号码
     * @type {string}
     * @memberof User
     */
    phone?: string
    /**
     * email
     * @type {string}
     * @memberof User
     */
    email?: string
    /**
     * password
     * @type {string}
     * @memberof User
     */
    password?: string
    /**
     * 账号类型
     * @type {boolean}
     * @memberof User
     */
    accountType?: number
    /**
     * 创建时间
     * @type {string}
     * @memberof User
     */
    createTime?: string
    /**
     * 更新时间
     * @type {string}
     * @memberof User
     */
    updateTime?: string | null
  }

  interface UserFamily {
    /**
     * 用户Id
     * @type {string}
     */
    userId?: string
    /**
     * 昵称
     * @type {string}
     */
    nickName?: string | null
    /**
     * 头像
     * @type {string}
     */
    avatar?: string | null
    /**
     * 用户在该家庭组中的角色（如管理员、成员）
     * @type {string}
     */
    role?: string | null
    /**
     * 家庭GUID
     * @type {string}
     */
    familyId?: string | null
  }

  interface UserSubscription {
    /**
     * 雪花Id
     * @type {string}
     * @memberof UserSubscription
     */
    id?: string
    /**
     * 创建时间
     * @type {string}
     * @memberof UserSubscription
     */
    createTime?: string
    /**
     * 更新时间
     * @type {string}
     * @memberof UserSubscription
     */
    updateTime?: string | null
    /**
     * 商户订单号
     * @type {string}
     * @memberof UserSubscription
     */
    outTradeNumber: string
    /**
     * 支付订单号
     * @type {string}
     * @memberof UserSubscription
     */
    transactionId?: string | null
    /**
     * 交易状态
     * @type {string}
     * @memberof UserSubscription
     */
    tradeState?: string | null
    /**
     * 金额
     * @type {number}
     * @memberof UserSubscription
     */
    amountTotal?: number
    /**
     * 用户支付金额
     * @type {number}
     * @memberof UserSubscription
     */
    payerTotal?: number | null
    /**
     * 用户Id
     * @type {string}
     * @memberof UserSubscription
     */
    userId?: string
  }

  interface Book {
    /**
     * ID
     * @type {string}
     */
    id?: string
    /**
     * 标题
     * @type {string}
     */
    title?: string | null
    /**
     * 成本
     * @type {number}
     */
    cost?: number
    /**
     * 备注
     * @type {string}
     */
    remarks?: string | null
    /**
     * 日期
     * @type {string}
     */
    date?: string
    /**
     * 农历
     * @type {string}
     */
    lunarDate?: string | null
    /**
     * 出席人数
     * @type {number}
     */
    attendanceTotal?: number
    /**
     * 人情份数
     * @type {number}
     */
    count?: number
    /**
     * 总计
     * @type {number}
     */
    moneyTotal?: number
  }

  interface Friend {
    /**
     * 雪花Id
     * @type {string}
     * @memberof Friend
     */
    id?: string
    /**
     * 创建时间
     * @type {string}
     * @memberof Friend
     */
    createTime?: string
    /**
     * 更新时间
     * @type {string}
     * @memberof Friend
     */
    updateTime?: string | null
    /**
     * 姓名
     * @type {string}
     * @memberof Friend
     */
    name?: string | null
    /**
     * 首字母
     * @type {string}
     * @memberof Friend
     */
    firstLetter?: string | null
    /**
     * 标签
     * @type {Array<string>}
     * @memberof Friend
     */
    tagList?: Array<string> | null
    /**
     * 备注
     * @type {string}
     * @memberof Friend
     */
    remarks?: string | null
  }

  interface FriendTag {
    /**
     *
     * @type {string}
     * @memberof FriendTag
     */
    id?: string
    /**
     *
     * @type {string}
     * @memberof FriendTag
     */
    name?: string | null
  }

  interface BookItem {
    /**
     * 雪花Id
     * @type {string}
     * @memberof BookItem
     */
    id?: string
    /**
     * 创建时间
     * @type {string}
     * @memberof BookItem
     */
    createTime?: string
    /**
     * 更新时间
     * @type {string}
     * @memberof BookItem
     */
    updateTime?: string | null
    /**
     * 金额
     * @type {number}
     * @memberof BookItem
     */
    money?: number
    /**
     * 出席人数
     * @type {number}
     * @memberof BookItem
     */
    attendance?: number
    /**
     * 备注
     * @type {string}
     * @memberof BookItem
     */
    remarks?: string | null
    /**
     * 礼簿Id
     * @type {string}
     * @memberof BookItem
     */
    bookId?: string
    /**
     *
     * @type {string}
     * @memberof BookItem
     */
    title?: string | null
    /**
     * 日期
     * @type {string}
     * @memberof BookItem
     */
    date?: string
    /**
     * 农历
     * @type {string}
     * @memberof BookItem
     */
    lunarDate?: string | null
    /**
     * 亲友Id
     * @type {string}
     * @memberof BookItem
     */
    friendId?: string
    /**
     *
     * @type {string}
     * @memberof BookItem
     */
    friendName?: string | null
  }

  interface Gift {
    /**
     * 雪花Id
     * @type {string}
     * @memberof Gift
     */
    id?: string
    /**
     * 创建时间
     * @type {string}
     * @memberof Gift
     */
    createTime?: string
    /**
     * 更新时间
     * @type {string}
     * @memberof Gift
     */
    updateTime?: string | null
    /**
     * 类型
     * @type {boolean}
     * @memberof Gift
     */
    type?: number
    /**
     * 主题
     * @type {string}
     * @memberof Gift
     */
    title?: string
    /**
     * 金额
     * @type {number}
     * @memberof Gift
     */
    money?: number
    /**
     * Icon
     * @type {string}
     * @memberof Gift
     */
    icon?: string | null
    /**
     * 备注
     * @type {string}
     * @memberof Gift
     */
    remarks?: string | null
    /**
     * 日期
     * @type {string}
     * @memberof Gift
     */
    date?: string
    /**
     * 农历
     * @type {string}
     * @memberof Gift
     */
    lunarDate?: string | null
    /**
     * 亲友Id
     * @type {string}
     * @memberof Gift
     */
    friendId?: string
    /**
     *
     * @type {string}
     * @memberof Gift
     */
    friendName?: string | null
  }

  interface FriendGifts {
    bookItems: BookItem[]
    gifts: Gift[]
  }

  interface StatsDashboard {
    bookItems: BookItem[]
    gifts: Gift[]
  }

  interface WechatPayTransactionOutput<T = any> {
    /**
     *
     * @type {string}
     * @memberof WechatPayTransactionOutput
     */
    outTradeNumber: string
    /**
     *
     * @type {object}
     * @memberof WechatPayTransactionOutput
     */
    singInfo: T
  }

  interface WechatPayTransactionJsapiSingInfo {
    /**
     *
     * @type {string}
     * @memberof WechatPayTransactionJsapiSingInfo
     */
    appId: string
    /**
     *
     * @type {string}
     * @memberof WechatPayTransactionJsapiSingInfo
     */
    timeStamp: string
    /**
     *
     * @type {string}
     * @memberof WechatPayTransactionJsapiSingInfo
     */
    nonceStr: string
    /**
     *
     * @type {string}
     * @memberof WechatPayTransactionJsapiSingInfo
     */
    package: string
    /**
     *
     * @type {string}
     * @memberof WechatPayTransactionJsapiSingInfo
     */
    signType: 'MD5' | 'HMAC-SHA256' | 'RSA' | undefined
    /**
     *
     * @type {string}
     * @memberof WechatPayTransactionJsapiSingInfo
     */
    paySign: string
  }

  interface WechartPayTransactionH5SingInfo {
    h5Url: string
  }

  interface SubscriptionPlan {
    /**
     * 雪花Id
     * @type {string}
     * @memberof SubscriptionPlan
     */
    id?: string
    /**
     * 标题
     * @type {string}
     * @memberof SubscriptionPlan
     */
    title?: string | null
    /**
     * 价格
     * @type {number}
     * @memberof SubscriptionPlan
     */
    price?: number
    /**
     * 描述
     * @type {string}
     * @memberof SubscriptionPlan
     */
    desc?: string | null
  }

  interface SearchOutput {
    books: Book[]
    bookItems: BookItem[]
    gifts: Gift[]
    friends: Friend[]
  }
}
