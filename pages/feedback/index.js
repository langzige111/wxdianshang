// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: '体验问题',
      isActive: true
    },
    {
      id: 1,
      value: '商品、商家投诉',
      isActive: false
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleTapsItemChange(e) {
    const index = e.detail
    let tabs = this.data.tabs
    tabs.forEach((v, i) => index === i ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  }

})