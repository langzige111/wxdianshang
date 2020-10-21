import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, openSetting, chooseAddress, showModal, showToast } from "../../utils/asyncWx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false,
  },
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    const { goods_id } = pages[pages.length - 1].options
    this.getGoodsDetail(goods_id)
  },
  // 获取详情页数据
  async getGoodsDetail(goods_id) {
    const res = await request({ url: '/goods/detail', data: { goods_id } })


    this.setData({
      goodsObj: {
        goods_name: res.data.message.goods_name,
        goods_introduce: res.data.message.goods_introduce.replace(/\.webb/g, '.jpg'),
        pics: res.data.message.pics,
        goods_price: res.data.message.goods_price,
        goods_id: res.data.message.goods_id,
        goods_small_logo: res.data.message.goods_small_logo
      }
    })
    this.GoodsInfo = this.data.goodsObj
    let collect = wx.getStorageSync('collect') || [];
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)
    this.setData({ isCollect })
  },
  handlePrevewImage(e) {
    const urls = this.data.goodsObj.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.current
    wx.previewImage({
      current: urls[current],
      urls: urls
    });

  },
  handleCarAdd() {
    let cart = wx.getStorageSync('cart') || [];
    const index = cart.findIndex(v => v.goods_id === this.data.goodsObj.goods_id)
    if (index === -1) {
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });

  },

  handleCollect() {
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index != -1) {
      collect.splice(index, 1)
      showToast({ title: '取消收藏' })
    } else {
      collect.push(this.GoodsInfo)
      showToast({ title: '收藏成功' })
    }
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect: !this.data.isCollect
    })
  }
})