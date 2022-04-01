<template>
  <div class="bg-fa of">
    <section id="index" class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">商品列表</span>
        </h2>
      </header>
      <ul>
        <li v-for="product in productList" :key="product.id">
          <a :class="['orderBtn', {current:payOrder.productId === product.id}]" 
            @click="selectItem(product.id)" 
            href="javascript:void(0);" >
            {{product.title}} 
            ¥{{product.price / 100}}
          </a>
        </li>
      </ul>

      
      <div class="PaymentChannel_payment-channel-panel">
        <h3 class="PaymentChannel_title"> 
          选择支付方式 
        </h3>
        <div class="PaymentChannel_channel-options" >

          <!-- 选择微信 -->
          <div :class="['ChannelOption_payment-channel-option', {current:payOrder.payType === 'wxpay'}]"
          @click="selectPayType('wxpay')">
            <div class="ChannelOption_channel-icon">
              <img src="../assets/img/wxpay.png" class="ChannelOption_icon">
            </div>
            <div class="ChannelOption_channel-info">
              <div class="ChannelOption_channel-label">
                <div class="ChannelOption_label">微信支付</div>
                <div class="ChannelOption_sub-label"></div>
                <div class="ChannelOption_check-option"></div>
              </div>
            </div>
          </div>

          <!-- 选择支付宝 -->
          <div :class="['ChannelOption_payment-channel-option', {current:payOrder.payType === 'alipay'}]"
          @click="selectPayType('alipay')">
            <div class="ChannelOption_channel-icon">
              <img src="../assets/img/alipay.png" class="ChannelOption_icon">
            </div>
            <div class="ChannelOption_channel-info">
              <div class="ChannelOption_channel-label">
                <div class="ChannelOption_label">支付宝</div>
                <div class="ChannelOption_sub-label"></div>
                <div class="ChannelOption_check-option"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="payButtom">
        <el-button 
        :disabled="payBtnDisabled"
        type="warning" 
        round 
        style="width: 180px;height: 44px;font-size: 18px;"
        @click="toPay()">
          确认支付V3
        </el-button>
        <el-button 
        :disabled="payBtnDisabled"
        type="warning" 
        round 
        style="width: 180px;height: 44px;font-size: 18px;"
        @click="toPayV2()">
          确认支付V2
        </el-button>
      </div>
    </section>

    <!-- 微信支付二维码 -->
    <el-dialog
      :visible.sync="codeDialogVisible"
      :show-close="false"
      @close="closeDialog"
      width="350px"
      center>
     <qriously :value="codeUrl" :size="300"/>
        <!-- <img src="../assets/img/code.png" alt="" style="width:100%"><br> -->
        使用微信扫码支付
    </el-dialog>
  </div>
</template>

<script>
import productApi from '../api/product'
import wxPayApi from '../api/wxPay'
import orderInfoApi from '../api/orderInfo'

export default {

  data () {
    return {
      payBtnDisabled: false, //确认支付按钮是否禁用
      codeDialogVisible: false, //微信支付二维码弹窗
      productList: [], //商品列表
      payOrder: { //订单信息
        productId: '', //商品id
        payType: 'wxpay' //支付方式
      },
      codeUrl: '', // 二维码
      orderNo: '', //订单号
      timer: null // 定时器
    }
  },

  //页面加载时执行
  created () {
    //获取商品列表
    productApi.list().then(response => {
      this.productList = response.data.productList
      this.payOrder.productId = this.productList[0].id
    })
  },
  
  methods: {
    //选择商品
    selectItem(productId) {
      console.log('商品id:' + productId)
      this.payOrder.productId = productId
      console.log(this.payOrder)
      //this.$router.push({ path: '/order' })
    },

    //选择支付方式
    selectPayType(type) {
      console.log('支付方式:' + type)
      this.payOrder.payType = type
      //this.$router.push({ path: '/order' })
    },

    //确认支付
    toPay(){
      //禁用按钮，防止重复提交
      this.payBtnDisabled = true

      //微信支付
      if(this.payOrder.payType === 'wxpay'){
          //调用统一下单接口
        wxPayApi.nativePay(this.payOrder.productId).then(response => {
          this.codeUrl = response.data.codeUrl
          this.orderNo = response.data.orderNo
          
          //打开二维码弹窗
          this.codeDialogVisible = true

          //启动定时器
          this.timer = setInterval(() => {
            //查询订单是否支付成功
            this.queryOrderStatus()
          }, 3000)

        })
      }
    },

    //确认支付
    toPayV2(){
      //禁用按钮，防止重复提交
      this.payBtnDisabled = true

      //微信支付
      if(this.payOrder.payType === 'wxpay'){
          //调用统一下单接口
        wxPayApi.nativePayV2(this.payOrder.productId).then(response => {
          this.codeUrl = response.data.codeUrl
          this.orderNo = response.data.orderNo
          
          //打开二维码弹窗
          this.codeDialogVisible = true

          //启动定时器
          this.timer = setInterval(() => {
            //查询订单是否支付成功
            this.queryOrderStatus()
          }, 3000)

        })
      }
    },

    //关闭微信支付二维码对话框时让“确认支付”按钮可用
    closeDialog(){
      console.log('close.................')
      this.payBtnDisabled = false
      console.log('清除定时器')
      clearInterval(this.timer)
    },


    // 查询订单状态
    queryOrderStatus() {
      orderInfoApi.queryOrderStatus(this.orderNo).then(response => {
        console.log('查询订单状态：' + response.code)
        
        // 支付成功后的页面跳转
        if (response.code === 0) {
          console.log('清除定时器')
          clearInterval(this.timer)
          // 三秒后跳转到订单列表
          setTimeout(() => {
            this.$router.push({ path: '/success' })
          }, 3000)
        }
      })
    }
  }
}
</script>