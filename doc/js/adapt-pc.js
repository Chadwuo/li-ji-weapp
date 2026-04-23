(function () {
  // 小于768像素则不执行
  if (window.innerWidth < 768) {
    return
  }

  // 添加CSS样式
  const style = document.createElement('style')
  style.textContent = `
    body[adapt='pc']>* {
      display: none !important;
    }
    body[adapt='pc']>uni-adapt-pc {
      display: block !important;
    }
    body[adapt='pc'] {
      margin: 0;
      background-color: #fff;
      background-image: url(https://liji.poetic.ltd/img/home-bg.webp);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      width: 100vw;
      height: 100vh;
    }
    body[adapt='pc'] .container {
      position: fixed;
      width: 100%;
      height: 690px;
      z-index: 1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      min-width: 800px;
      max-width: 900px;
    }
    body[adapt='pc'] .container .iframe {
      width: 340px;
      height: 690px;
      background-image: url(https://liji.poetic.ltd/img/pc-iPhoneX.png);
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: center;
      float: left;
    }
    body[adapt='pc'] .container .iframe > iframe {
      width: 316px;
      height: 604px;
      background-color: #fff;
      box-sizing: content-box;
      border: none;
      margin: 43px 0 0 12px;
    }
    body[adapt='pc'] .container .content {
      float: right;
      color: #f87171;
      margin-left: 60px;
      width: 400px;
    }
    body[adapt='pc'] .container .content > h1 {
      font-size: 36px;
      font-weight: bold;
      margin: 0;
      padding: 100px 0 36px 0;
      text-align: center;
    }
    body[adapt='pc'] .container .content > h3 {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
      padding: 0 0 50px 0;
      text-align: center;
    }
    body[adapt='pc'] .container .content .qrcode {
     text-align: center;
    }
    body[adapt='pc'] .container .content > p {
      font-size: 14px;
      margin: 0;
      padding: 12px 0 0 0;
      text-align: center;
      color: #333;
    }
  `
  document.head.appendChild(style)

  // 创建模板容器
  const container = document.createElement('uni-adapt-pc')
  document.body.appendChild(container)

  // 设置模板内容
  const tpl = `
    <div class="container">
      <div class="iframe">
        <iframe src="${window.location.href}"></iframe>
      </div>
      <div class="content">
        <h1>人情礼记</h1>
        <h3>你贴心的人情往来数字记账伙伴。</h3>
        <div class="qrcode">
          <img src="https://liji.poetic.ltd/img/code.jpg" style="width: 280px; height: 280px;border-radius: 24px;">
        </div>
        <p>使用微信扫描二维码获得更佳体验</p>
      </div>
    </div>
  `
  container.innerHTML = tpl

  // 添加PC标识
  document.body.setAttribute('adapt', 'pc')
})()
