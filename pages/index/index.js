import { request } from "../../request/index.js"
//Page Object
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result);
    //     const swiperList = result.data.message
    //     this.setData({
    //       swiperList
    //     })
    //   }
    // });
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  getFloorList() {
    request({
      url: "/home/floordata"
    }).then(result => {
      const floorList = result.data.message
      this.setData({
        floorList
      })
    })
  },
  getCateList() {
    request({
      url: "/home/catitems"
    }).then(result => {
      const cateList = result.data.message
      this.setData({
        cateList
      })
    })
  },
  getSwiperList() {
    request({
      url: "/home/swiperdata"
    }).then(result => {
      const swiperList = result.data.message
      this.setData({
        swiperList
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
