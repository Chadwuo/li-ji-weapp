declare namespace Api {
  namespace Common {
    interface Response<T = any> {
      statusCode: string
      succeeded: boolean
      data: T
      errors: string
      extras: string
    }

    interface PaginationCommon {
      total: number
      page: number
      pageSize: number
    }

    interface PaginationResult<T = any> extends PaginationCommon {
      items: T[]
    }

    interface PaginationQuery extends PaginationCommon {
      field: string
      order: 'asc' | 'desc'
    }
  }

  namespace User {
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
       * 用户id
       * @type {number}
       * @memberof UserOutput
       */
      id?: number
      /**
       * 昵称
       * @type {string}
       * @memberof UserOutput
       */
      nickName?: string | null
      /**
       * 头像
       * @type {string}
       * @memberof UserOutput
       */
      avatar?: string | null
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
      userId: number
      outTradeNumber: string
      transactionId: string
      tradeState: string
      payerTotal: string
      expireTime: string
      goodsTag: string
    }
  }

  interface GiftBook {
    /**
     * ID
     * @type {number}
     * @memberof GiftBookOutput
     */
    id?: number | null
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
    id: string
    name: string
  }

  interface GiftIn {
    id: string
    name: string
  }

  interface GiftOut {
    id: string
    name: string
  }
}
