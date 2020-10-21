import { login } from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js"
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

  async handleGetUserInfo(e) {
    try {
      const { rawData, signature, encryptedData, iv } = e.detail
      const { code } = await login()
      // 由于没有企业appid所以用ajax发送请求不能拿到token值
      // const authParams = { rawData, signature, encryptedData, iv, code }
      // const token = await request({ url: /users/wxlogin, data: authParams, method: "POST" })
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }

  }

})