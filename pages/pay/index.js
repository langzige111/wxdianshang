import { getSetting, openSetting, chooseAddress, showModal, showToast } from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow() {
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];
    // let allChecked = cart.length !== 0 ? cart.every(v => v.checked) : false
    let totalPrice = 0
    let totalNum = 0
    cart = cart.filter(v => v.checked)
    cart.forEach(v => {
      totalPrice += v.goods_price * v.num
      totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })

  },
  async handleOrderPay() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return
    }
    // 能拿到订单号但是发送ajax请求获取不到支付参数
    // const header = { Authorization: token }
    // const order_price = this.data.totalPrice
    // const consignee_addr = this.data.address.provinceName + this.data.address.cityName + this.data.address.countyName + this.data.address.detailInfo
    // let goods = this.data.cart
    // goods = goods.map(v => {
    //   return {
    //     goods_id: v.goods_id,
    //     goods_number: v.num,
    //     goods_price: v.goods_price
    //   }
    // })
    // const OrderParams = { order_price, consignee_addr, goods }
    // const res = await request({
    //   url: '/my/orders/create',
    //   method: "POST",
    //   data: OrderParams,
    //   header
    // })
    // const order_number = res.data.message.order_number
    // console.log(order_number);
    // const resPay = await request({ url: '/my/orders/req_unifiedorder', data: { order_number }, header })
    // console.log(resPay);
    await showToast({ title: '支付成功' })
    let newCart = wx.getStorageSync('cart')
    newCart = newCart.filter(v => !v.checked)
    wx.setStorageSync('cart', newCart);
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index',

      });


    }, 1000)

  }

})