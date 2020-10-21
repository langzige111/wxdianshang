import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: '综合',
      isActive: true
    },
    {
      id: 1,
      value: '销量',
      isActive: false
    },
    {
      id: 2,
      value: '价格',
      isActive: false
    }],
    goodList: []
  },

  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || ''
    this.QueryParams.query = options.query || ''
    this.getGoodList()
  },
  async getGoodList() {
    const res = await request({ url: '/goods/search', data: this.QueryParams })
    console.log(res);
    const total = res.data.message.total
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      goodList: [...this.data.goodList, ...res.data.message.goods]
    })
    wx.stopPullDownRefresh()
  },
  handleTapsItemChange(e) {
    const index = e.detail
    let tabs = this.data.tabs
    tabs.forEach((v, i) => index === i ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  // 页面上滑，滚动触发页面触底事件
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据啦',

      });

    } else {

      this.QueryParams.pagenum++
      this.getGoodList()
    }
  },
  // 页面下拉刷新
  onPullDownRefresh() {
    this.setData({
      goodList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodList()
  }

})