// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleGetUserInfo(e) {
    const userInfo = e.detail.userInfo
    wx.setStorageSync('userInfo', userInfo);
    wx.navigateBack({
      delta: 1
    });

  }
})