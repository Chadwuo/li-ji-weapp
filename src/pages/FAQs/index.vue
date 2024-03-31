<template>
    <div class="bg-white rounded-xl p-1 mt-3">
        <uv-collapse :border="false">
            <uv-collapse-item title="Q：这个软件收费吗？" >
                <text class="px-1 leading-relaxed">A：永远不会收取任何费用。</text>
            </uv-collapse-item>
            <uv-collapse-item title="Q：有开发团队吗？">
                <text class="px-1 leading-relaxed">A：礼记所有的开发工作都会放在GitHub上，任何开发者都可以参与开发，贡献代码。在此感谢所有已经为 礼记 做出贡献的人！</text>
            </uv-collapse-item>
            <uv-collapse-item title="Q：数据安全吗？">
                <text class="px-1 leading-relaxed">A：基于阿里云EMAS Serverless 平台服务，数据保存在云端，可以确保安全。</text>
            </uv-collapse-item>
            <uv-collapse-item title="Q：用户隐私如何保护？">
                <text class="px-1 leading-relaxed">A：礼记不会主动收集用户的任何信息。微信官方对上架的小程序有严格的隐私保护审核机制，可以确保安全。</text>
            </uv-collapse-item>
            <uv-collapse-item title="Q：软件停止服务后，数据怎么办？">
                <text class="px-1 leading-relaxed">A：得益于阿里云EMAS服务，运营成本几乎可以忽略不记，可以做到一直用爱发电，运营下去。当然如果真的有停服那一天，礼记一定会通知到所有人做好数据导出备份后，然后挥一挥衣袖，也算功德圆满。</text>
            </uv-collapse-item>
            <uv-collapse-item title="Q：有很多其他同类的产品，为什么选择我？">
                <text class="px-1 leading-relaxed">A：礼记是一个开源项目，优势在于可以吸引更多开发者和用户的参与，从而不断地进行改进和优化。此外，开源软件也有较高的安全性，因为更多的人参与开发和审查代码，可以及早发现和解决潜在的漏洞和风险。这是其他任何同类产品不具备的。</text>
            </uv-collapse-item>
            <uv-collapse-item title="Q：我手机上界面显示不正确或者有bug？">
                <text class="px-1 leading-relaxed">A：建议遇到bug先更新微信版本，如果问题还存在可以在意见反馈中填写你遇到的问题，感谢。</text>
            </uv-collapse-item>
            <uv-collapse-item title="Q：软件后续开发计划？是否会变的商业化广告乱飞，功能臃肿？">
                <text class="px-1 leading-relaxed">A：先说结论，不会。最多后期会增加一个开屏广告，关于以后功能演变，你可以在意见反馈中提出你的想法，或参与GitHub中issues讨论。</text>
            </uv-collapse-item>
        </uv-collapse>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>

<route lang="json">{
    "layout": "blank",
    "style": {
      "navigationBarTitleText": "常见问题"
    }
  }</route>