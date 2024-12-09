declare namespace Api {
  namespace Common {
    interface Response<T = any> {
      code: string
      message: string
      result: T
      type: string
      time: string
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
      token: string
      refreshToken: string
    }
    interface LoginUser {
      userInfo: UserInfo
      userFamilys: UserFamily[]
      userSubscription: UserSubscription
    }
    interface UserInfo {
      id: number
      nickName: string
      avatar: string
    }
    interface UserFamily {
      userId: number
      nickName: string
      avatar: string
      role: string
      familyId: string
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

  namespace Book {
    interface GiftBook {
      id: string
      name: string
    }
  }
}
