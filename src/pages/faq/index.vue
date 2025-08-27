<script setup lang="ts"></script>

<template>
  <div class="mx-3 py-2">
    <uv-collapse accordion>
      <uv-collapse-item title="礼记 是什么？">
        <div class="px-1 leading-relaxed">
          礼记 专注于记录和管理人情往来中的随礼、收礼、份子钱、礼金、心意、礼物、红包等，多维度查询和统计亲友间的往来记录，家人共享记账，你贴心的人情往来数字记账伙伴。
        </div>
      </uv-collapse-item>
      <uv-collapse-item title="礼记 免费吗？">
        <div class="px-1 leading-relaxed">
          完全免费，并承诺永远免费！
        </div>
      </uv-collapse-item>
      <uv-collapse-item title="谁在维护 礼记？">
        <div class="px-1 leading-relaxed">
          礼记 是一个独立的开源社区驱动的项目，全球开发者共同参与项目讨论、开发、审查代码。
        </div>
      </uv-collapse-item>
      <uv-collapse-item title="礼记 可靠吗？">
        <div class="px-1 leading-relaxed">
          礼记从21年11月份写下第一行代码至今，经历了600+ 次代码提交、来自全球开发者参与的60+ 个拉取请求、40+ 个版本迭代、累计为2w+ 用户提供稳定服务。
        </div>
      </uv-collapse-item>
      <uv-collapse-item title="有很多其他同类的产品，为什么选择 礼记？">
        <div class="px-1 leading-relaxed">
          礼记是一个开源项目，优势在于可以吸引更多开发者和用户的参与，从而不断地进行改进和优化。此外，开源软件也有较高的安全性，因为更多的人参与开发和审查代码，可以及早发现和解决潜在的漏洞和风险。这是其他任何同类产品不具备的。
        </div>
      </uv-collapse-item>
      <uv-collapse-item title="我可以参与 礼记 项目吗？">
        <div class="px-1 leading-relaxed">
          非常欢迎！请访问我们的 <div class="inline-block">
            <uv-link color="#f87171" href="https://github.com/Chadwuo/li-ji-weapp" text="开源社区" :under-line="true" />
          </div> 页面，并参与项目的开发、讨论、设计。
        </div>
      </uv-collapse-item>
    </uv-collapse>

    <div class="fixed bottom-8 right-0 w-full">
      <div class="mx-6">
        <wd-button block open-type="contact" icon="service">
          在线客服
        </wd-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "layout": false,
  "style": {
    "navigationBarTitleText": "常见问题"
  }
}
</route>
