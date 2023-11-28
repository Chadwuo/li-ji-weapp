const friendService = require("@/services/friend");

Component({
  options: {
    styleIsolation: 'shared',
  },
  properties: {
    queryData: {
      type: Object,
      value: () => ({}),
    }
  },
  data: {
    indexList: [],
    friendsList: [],
  },
  methods: {
    onFriendClick(e) {
      this.triggerEvent('clickItem', e.currentTarget.dataset.friend)
    },
    async loadData(parameter = {}) {
      parameter.name_like = parameter.searchValue || ``
      delete parameter.searchValue
      parameter.userId = wx.$userId
      const [err, res] = await friendService.getFriendList(parameter);
      if (!err) {
        const list = wx.$utils.groupByList(res)
        console.log(`list`, list)
        this.setData({
          friendsList: list,
          indexList: list.map(item => item.alpha).sort(),
        });
      }
    },
  }
})
