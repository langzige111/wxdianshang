// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: '商品收藏',
      isActive: true
    },
    {
      id: 1,
      value: '品牌收藏',
      isActive: false
    },
    {
      id: 2,
      value: '店铺收藏',
      isActive: false
    }, {
      id: 0,
      value: '浏览器足迹',
      isActive: false
    }],
    collect: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    const collect = wx.getStorageSync('collect') || [];
    this.setData({ collect })

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