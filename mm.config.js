/**
 * @see: https://www.hongqiye.com/doc/mockm/config/option.html
 * @type {import('mockm/@types/config').Config}
 */
module.exports = util => {
  return  {
    port: 9000,
    testPort: 9005,
    replayPort: 9001,

    // 代理后端的接口, 如果没有可以不填
    proxy: {
      // 根结点
      '/': `https://api.next.bspapp.com/`,
      // 使用函数修改响应头
      '/client': {
        onProxyReq (proxyReq, req, res) {
          console.log(req.body.method)
          console.log(JSON.parse(req.body.params))
        },
        onProxyRes (proxyRes, req, res) {
          proxyRes.headers[`content-type`] = `application/json; charset=UTF-8;` // 修改 headers
        },
      },
    },

    // 自己编写的接口
    api: {
      "use /todo/"(req, res) {
        res.status(404).json({})
      },
      async 'use /books' (req, res, next) {
        if(req.query.page) {
          res.mm.resHandleJsonApi = (arg) => {
            // 统计单个账本的人数和金额
            arg.data.results.map((i) => {
              // 多少人
              i.giftCount = 10
              // 多少钱
              i.giftTotal = 1000
              return i;
            });
            return arg.resHandleJsonApi(arg)
          }
        }
        next()
      },
      // 收入
      async 'get /computedTotalGiftReceive' (req, res, next) {
        const db = global.config._db 
        res.json(123)
      },
      // 送出
      async 'get /computedTotalGiftOut' (req, res, next) {
        const db = global.config._db 
        res.json(1353)
      },
    },
    
    // 使用 mockjs 生成数据以及 Restful API
    dbCover: true,
    db: util.libObj.mockjs.mock({
      'books': [
        // {
        //   "_id": `1`,
        //   "userId": "1",
        //   "date": {
        //     "year": 2023,
        //     "month": 11,
        //     "day": 16,
        //     "value": "2023-11-16",
        //     "lunar_day": "初四",
        //     "lunar_month": "十月",
        //     "lunar_year": "癸卯兔年",
        //     "lunar_term": null
        //   },
        //   "title": "@ctitle",
        //   "remarks": "@ctitle",
        // },
      ],
      'family_members': [],
      'users': [
        {
          "id": "todoid",
          "nickName": "微信用户",
          "avatarUrl": "https://mp-ca131de3-6a07-4205-8ee0-970a5c092c09.cdn.bspapp.com/cloudstorage/0114d087-7245-4fe5-9de4-ea88fdc14066.jpg",
          "isVip": false,
          "oAuthUserId": "todoid",
          "createdAt": "2023-11-19T17:47:26+08:00",
          "lastSeenAt": "2023-11-25T17:14:35+08:00",
          "skipAD": true
        },
      ],
    }),
    
    // 实现一个静态文件服务
    static: [
      {
        fileDir: `./public/`,
        path: `/fs/`,
        list: true,
      },
    ],
  }
}