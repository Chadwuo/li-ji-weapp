declare namespace Api {
  interface Response<T = any> {
    /**
     *
     * @type {number}
     * @memberof ResTfulResultObject
     */
    statusCode?: number | null
    /**
     *
     * @type {object}
     * @memberof ResTfulResultObject
     */
    data?: T
    /**
     *
     * @type {boolean}
     * @memberof ResTfulResultObject
     */
    succeeded?: boolean
    /**
     *
     * @type {object}
     * @memberof ResTfulResultObject
     */
    errors?: string | object
    /**
     *
     * @type {object}
     * @memberof ResTfulResultObject
     */
    extras?: object
    /**
     *
     * @type {number}
     * @memberof ResTfulResultObject
     */
    timestamp?: number
  }

  interface PaginationCommon {
    /**
     * 页码
     * @type {number}
     * @memberof SqlSugarPagedListGiftIn
     */
    page?: number
    /**
     * 页容量
     * @type {number}
     * @memberof SqlSugarPagedListGiftIn
     */
    pageSize?: number
    /**
     * 总条数
     * @type {number}
     * @memberof SqlSugarPagedListGiftIn
     */
    total?: number
    /**
     * 总页数
     * @type {number}
     * @memberof SqlSugarPagedListGiftIn
     */
    totalPages?: number
    /**
     * 是否有上一页
     * @type {boolean}
     * @memberof SqlSugarPagedListGiftIn
     */
    hasPrevPage?: boolean
    /**
     * 是否有下一页
     * @type {boolean}
     * @memberof SqlSugarPagedListGiftIn
     */
    hasNextPage?: boolean
  }

  interface PaginationResult<T = any> extends PaginationCommon {
    /**
     * 当前页集合
     * @type {Array<T>}
     * @memberof SqlSugarPagedListGiftIn
     */
    items?: Array<T> | null
  }

  interface PaginationQuery extends PaginationCommon {
    field: string
    order: 'asc' | 'desc'
  }

  interface LoginToken {
    /**
     * 令牌Token
     * @type {string}
     * @memberof LoginOutput
     */
    accessToken?: string | null
    /**
     * 刷新Token
     * @type {string}
     * @memberof LoginOutput
     */
    refreshToken?: string | null
  }
  interface LoginUser {
    /**
     *
     * @type {User}
     * @memberof LoginUserOutput
     */
    userInfo?: User
    /**
     * 用户家庭信息
     * @type {Array<UserFamily>}
     * @memberof LoginUser
     */
    userFamilys?: Array<UserFamily> | null
    /**
     *
     * @type {UserSubscription}
     * @memberof LoginUserOutput
     */
    userSubscription?: UserSubscription
  }
  interface User {
    /**
     * 雪花Id
     * @type {number}
     * @memberof User
     */
    id: number
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
    /**
     * OpenId
     * @type {string}
     * @memberof User
     */
    openId: string
    /**
     * UnionId
     * @type {string}
     * @memberof User
     */
    unionId?: string | null
    /**
     * 昵称
     * @type {string}
     * @memberof User
     */
    nickName?: string | null
    /**
     * 头像
     * @type {string}
     * @memberof User
     */
    avatar?: string | null
    /**
     * 手机号码
     * @type {string}
     * @memberof User
     */
    phone?: string | null
  }
  interface UserFamily {
    /**
     * 用户Id
     * @type {number}
     * @memberof UserFamilyOutput
     */
    userId?: number
    /**
     * 昵称
     * @type {string}
     * @memberof UserFamilyOutput
     */
    nickName?: string | null
    /**
     * 头像
     * @type {string}
     * @memberof UserFamilyOutput
     */
    avatar?: string | null
    /**
     * 用户在该家庭组中的角色（如管理员、成员）
     * @type {string}
     * @memberof UserFamilyOutput
     */
    role?: string | null
    /**
     * 家庭GUID
     * @type {string}
     * @memberof UserFamilyOutput
     */
    familyId?: string | null
  }
  interface UserSubscription {
    /**
     * 雪花Id
     * @type {number}
     * @memberof UserSubscription
     */
    id: number
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
     * 用户Id
     * @type {number}
     * @memberof UserSubscription
     */
    userId?: number
    /**
     *
     * @type {User}
     * @memberof UserSubscription
     */
    user?: User
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
    transactionId: string
    /**
     * 交易状态
     * @type {string}
     * @memberof UserSubscription
     */
    tradeState?: string | null
    /**
     * 用户支付金额
     * @type {number}
     * @memberof UserSubscription
     */
    payerTotal?: number | null
    /**
     * 订阅到期时间
     * @type {string}
     * @memberof UserSubscription
     */
    expireTime?: string | null
    /**
     * 优惠标记
     * @type {string}
     * @memberof UserSubscription
     */
    goodsTag?: string | null
  }

  interface GiftBook {
    /**
     * ID
     * @type {number}
     * @memberof GiftBookOutput
     */
    id: number
    /**
     * 标题
     * @type {string}
     * @memberof GiftBookOutput
     */
    title?: string | null
    /**
     * 成本
     * @type {number}
     * @memberof GiftBookOutput
     */
    cost?: number
    /**
     * 备注
     * @type {string}
     * @memberof GiftBookOutput
     */
    remarks?: string | null
    /**
     * 日期
     * @type {string}
     * @memberof GiftBookOutput
     */
    date?: string
    /**
     * 农历
     * @type {string}
     * @memberof GiftBookOutput
     */
    lunarDate?: string | null
    /**
     * 出席人数
     * @type {number}
     * @memberof GiftBookOutput
     */
    attendanceTotal?: number
    /**
     * 人情份数
     * @type {number}
     * @memberof GiftBookOutput
     */
    giftCount?: number
    /**
     * 总计
     * @type {number}
     * @memberof GiftBookOutput
     */
    moneyTotal?: number
  }

  interface Friend {
    /**
     * 雪花Id
     * @type {number}
     * @memberof Friend
     */
    id: number
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
     * 用户Id
     * @type {number}
     * @memberof Friend
     */
    userId?: number
    /**
     *
     * @type {User}
     * @memberof Friend
     */
    user?: User
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
     * 关系
     * @type {string}
     * @memberof Friend
     */
    relation?: string | null
    /**
     * 备注
     * @type {string}
     * @memberof Friend
     */
    remarks?: string | null
  }

  interface GiftIn {
    /**
     * 雪花Id
     * @type {number}
     * @memberof GiftIn
     */
    id: number
    /**
     * 创建时间
     * @type {string}
     * @memberof GiftIn
     */
    createTime?: string
    /**
     * 更新时间
     * @type {string}
     * @memberof GiftIn
     */
    updateTime?: string | null
    /**
     * 用户Id
     * @type {number}
     * @memberof GiftIn
     */
    userId?: number
    /**
     *
     * @type {User}
     * @memberof GiftIn
     */
    user?: User
    /**
     * 金额
     * @type {number}
     * @memberof GiftIn
     */
    money?: number
    /**
     * 出席人数
     * @type {number}
     * @memberof GiftIn
     */
    attendance?: number
    /**
     * 备注
     * @type {string}
     * @memberof GiftIn
     */
    remarks?: string | null
    /**
     * 礼簿Id
     * @type {number}
     * @memberof GiftIn
     */
    giftBookId?: number
    /**
     *
     * @type {GiftBook}
     * @memberof GiftIn
     */
    giftBook?: GiftBook
    /**
     * 亲友Id
     * @type {number}
     * @memberof GiftIn
     */
    friendId?: number
    /**
     *
     * @type {Friend}
     * @memberof GiftIn
     */
    friend?: Friend
  }

  interface GiftOut {
    /**
     * 雪花Id
     * @type {number}
     * @memberof GiftOut
     */
    id: number
    /**
     * 创建时间
     * @type {string}
     * @memberof GiftOut
     */
    createTime?: string
    /**
     * 更新时间
     * @type {string}
     * @memberof GiftOut
     */
    updateTime?: string | null
    /**
     * 用户Id
     * @type {number}
     * @memberof GiftOut
     */
    userId?: number
    /**
     *
     * @type {User}
     * @memberof GiftOut
     */
    user?: User
    /**
     * 主题
     * @type {number}
     * @memberof GiftOut
     */
    title?: number
    /**
     * 金额
     * @type {number}
     * @memberof GiftOut
     */
    money?: number
    /**
     * Icon
     * @type {number}
     * @memberof GiftOut
     */
    icon?: number | null
    /**
     * 备注
     * @type {string}
     * @memberof GiftOut
     */
    remarks?: string | null
    /**
     * 日期
     * @type {string}
     * @memberof GiftOut
     */
    date?: string
    /**
     * 农历
     * @type {string}
     * @memberof GiftOut
     */
    lunarDate?: string | null
    /**
     * 亲友Id
     * @type {number}
     * @memberof GiftOut
     */
    friendId?: number
    /**
     *
     * @type {Friend}
     * @memberof GiftOut
     */
    friend?: Friend
  }
}
