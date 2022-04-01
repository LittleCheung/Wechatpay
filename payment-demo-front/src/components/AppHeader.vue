<template>
  <!-- 公共头 -->
  <header id="header">
    <section class="container">
      <h1 id="logo">
        <a href="#/" title="支付案例">
          <img src="../assets/img/logo.png" width="100%" alt="这是一个logo">
        </a>
      </h1>
      <div>
        <ul class="nav">
          <router-link to="/" tag="li" active-class="current" exact>
            <a>课程列表</a>
          </router-link>
          <router-link to="/orders" tag="li" active-class="current">
            <a>我的订单</a>
          </router-link>
          <router-link to="/download" tag="li" active-class="current">
            <a>下载账单</a>
          </router-link>
        </ul>
      </div>
      <div class="clear"></div>
    </section>
  </header>
</template>