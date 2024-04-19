<script setup>

</script>

<template>
  <div class="bg-white p-5 space-y-3">
    <div class="font-bold">
      这个软件免费吗？
    </div>
    <div class="text-sm text-gray-500 leading-relaxed">
      免费，未来推出的所有功能也都会是免费。
    </div>
    <div class="my-5">
      <uv-line />
    </div>
    <div class="font-bold">
      谁在维护 礼记？
    </div>
    <div class="text-sm text-gray-500 leading-relaxed">
      礼记 是一个独立的开源社区驱动的项目，所有人都能参与项目讨论、开发、审查代码。
    </div>
    <div class="my-5">
      <uv-line />
    </div>
    <div class="font-bold">
      礼记 可靠吗？
    </div>
    <div class="text-sm text-gray-500 leading-relaxed">
      礼记从21年11月份写下第一行代码至今，经历了500+ 次代码提交、来自全球开发者参与的50+ 个拉取请求、20+
      个版本迭代、累计为5000+
      用户提供稳定服务。礼记运营需要一定的服务器费用，费用并不高，目前依靠程序内部广告收益（你如果非常不喜欢广告，甚至可以关闭），可以收支平衡，是可维续的。
    </div>
    <div class="my-5">
      <uv-line />
    </div>
    <div class="font-bold">
      有很多其他同类的产品，为什么选择 礼记？
    </div>
    <div class="text-sm text-gray-500 leading-relaxed">
      礼记是一个开源项目，优势在于可以吸引更多开发者和用户的参与，从而不断地进行改进和优化。此外，开源软件也有较高的安全性，因为更多的人参与开发和审查代码，可以及早发现和解决潜在的漏洞和风险。这是其他任何同类产品不具备的。
    </div>
    <div class="my-5">
      <uv-line />
    </div>
    <div class="font-bold">
      遇到了显示不正确或者有bug？
    </div>
    <div class="text-sm text-gray-500 leading-relaxed">
      建议遇到bug先更新微信版本，如果问题还存在可以在意见反馈中填写你遇到的问题。
    </div>
    <div class="my-5">
      <uv-line />
    </div>
    <div class="font-bold">
      未来开发计划？
    </div>
    <div class="text-sm text-gray-500 leading-relaxed">
      礼记3.0版本，代号
      "Initial D"，已经正式发布了。她重写了全部代码，全新的页面UI，并且添加了更多功能，更加安全稳定。对于发布后的短期，我们将专注于开发数据导出功能，数据统计报表功能。
    </div>
    <div class="my-5">
      <uv-line />
    </div>
    <div class="font-bold">
      我可以参与 礼记 项目吗？
    </div>
    <div class="flex items-center text-sm text-gray-500 leading-relaxed">
      非常欢迎！请访问我们的<uv-link
        font-size="0.875rem"
        color="#f87171" href="https://github.com/Chadwuo/li-ji-weapp" text="开源社区" :under-line="true"
      />
    </div>
    <uv-safe-bottom />
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
    "layout": "blank",
    "style": {
        "navigationBarTitleText": "常见问题"
    }
}
</route>
