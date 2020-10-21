// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo');
    const collectNum = wx.getStorageSync('collect') || [];
    this.setData({
      userInfo,
      collectNum: collectNum.length
    })
  }
})
