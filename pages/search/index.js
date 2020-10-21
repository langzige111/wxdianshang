import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    timer: null,
    isFocus: false,
    inpValue: ''
  },
  handleInput(e) {
    let { value } = e.detail
    if (!value.trim()) {
      this.handleBtn()
      return;
    }
    this.setData({ isFocus: true })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.qsearch(value)
    }, 500)
  },
  async qsearch(query) {
    const res = await request({ url: '/goods/qsearch', data: { query } })
    this.setData({
      goods: res.data.message
    })
  },
  handleBtn() {
    this.setData({
      goods: [],
      isFocus: false,
      inpValue: ''
    })
  }
})