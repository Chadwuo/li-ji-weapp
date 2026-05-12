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
    items?: Array<T>
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
     * @type {number}
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
    updateTime?: string
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
    nickName?: string
    /**
     * 头像
     * @type {string}
     */
    avatar?: string
    /**
     * 用户在该家庭组中的角色（如管理员、成员）
     * @type {string}
     */
    role?: string
    /**
     * 家庭GUID
     * @type {string}
     */
    familyId?: string
    /**
     * 账号类型
     */
    accountType?: number
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
    updateTime?: string
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
    transactionId?: string
    /**
     * 交易状态
     * @type {string}
     * @memberof UserSubscription
     */
    tradeState?: string
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
    payerTotal?: number
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
    title?: string
    /**
     * 成本
     * @type {number}
     */
    cost?: number
    /**
     * 备注
     * @type {string}
     */
    remarks?: string
    /**
     * 日期
     * @type {string}
     */
    date?: string
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
    /**
     * 是否举办宴会
     * @type {boolean}
     */
    isBanquet?: boolean
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
    updateTime?: string
    /**
     * 姓名
     * @type {string}
     * @memberof Friend
     */
    name?: string
    /**
     * 首字母
     * @type {string}
     * @memberof Friend
     */
    firstLetter?: string
    /**
     * 标签
     * @type {Array<string>}
     * @memberof Friend
     */
    tagList?: Array<string>
    /**
     * 备注
     * @type {string}
     * @memberof Friend
     */
    remarks?: string
    /**
     * 关系
     * @type {string}
     * @memberof Friend
     */
    relation?: string
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
    name?: string
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
    updateTime?: string
    /**
     * 金额
     * @type {number}
     * @memberof BookItem
     */
    money?: number
    /**
     * 类型
     * @type {number}
     * @memberof BookItem
     */
    moneyType?: number
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
    remarks?: string
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
    title?: string
    /**
     * 日期
     * @type {string}
     * @memberof BookItem
     */
    date?: string
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
    friendName?: string
    friendRelation?: string
    friendTagList?: Array<string>
    entityName?: string
    payWay?: string
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
    updateTime?: string
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
     * 类型
     * @type {number}
     * @memberof Gift
     */
    moneyType?: number
    /**
     * Icon
     * @type {string}
     * @memberof Gift
     */
    icon?: string
    /**
     * 备注
     * @type {string}
     * @memberof Gift
     */
    remarks?: string
    /**
     * 日期
     * @type {string}
     * @memberof Gift
     */
    date?: string
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
    friendName?: string
    friendRelation?: string
    friendTagList?: Array<string>
    entityName?: string
    payWay?: string
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

  interface XPayGoodsTransactionOutput {
    outTradeNumber?: string
    mode: 'short_series_goods' | 'short_series_coin'
    signData: string
    paySig: string
    signature: string
  }

  interface SubscriptionPlan {
    /**
     * 雪花Id
     * @type {string}
     * @memberof SubscriptionPlan
     */
    id?: string
    /**
     * 商品id
     * @type {string}
     * @memberof SubscriptionPlan
     */
    productId: string
    /**
     * 标题
     * @type {string}
     * @memberof SubscriptionPlan
     */
    title?: string
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
    desc?: string
  }

  interface SearchOutput {
    books: Book[]
    bookItems: BookItem[]
    gifts: Gift[]
    friends: Friend[]
  }
}
