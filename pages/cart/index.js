import { getSetting, openSetting, chooseAddress, showModal, showToast } from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async handleChooseAddress() {
    try {
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting["scope.address"]
      if (!scopeAddress) {
        await openSetting()
      }
      const address = await chooseAddress()
      wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error);
    }
  },
  onShow() {
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || [];
    // let allChecked = cart.length !== 0 ? cart.every(v => v.checked) : false
    this.setCart(cart)
    this.setData({
      address
    })
  },
  handleItemChange(e) {
    let cart = wx.getStorageSync('cart');
    const goods_id = e.currentTarget.dataset.id
    const index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  handleItamChangeAll() {
    let cart = this.data.cart;
    let allChecked = !this.data.allChecked
    cart.forEach(v => {
      v.checked = allChecked
    })
    this.setCart(cart)
  },
  async handleItemTap(e) {
    let cart = this.data.cart;
    const goods_id = e.currentTarget.dataset.id
    const current = e.currentTarget.dataset.current
    const index = cart.findIndex(v => v.goods_id === goods_id)
    if (cart[index].num === 1 && current === '-1') {
      const result = await showModal('您是否要删除？')
      if (result) {
        cart.splice(index, 1)
      }
    } else {
      cart[index].num = parseInt(current) + parseInt(cart[index].num)
    }
    this.setCart(cart)
  },
  setCart(cart) {
    let totalPrice = 0
    let totalNum = 0
    let allChecked = true
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length !== 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart);
  },
  async handlePay() {
    let { address, totalNum } = this.data
    if (!address.userName) {
      await showToast({ title: '请您先获取收获地址' })
      return;
    }
    if (!totalNum) {
      await showToast({ title: '您还未选购商品哦' })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });

  }
})