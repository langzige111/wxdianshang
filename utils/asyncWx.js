/**
 * promise 形式  getSetting
 */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
/**
 * promise 形式  chooseAddress
 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

/**
 * promise 形式  openSetting
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

export const showModal = (aaa) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: aaa,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        resolve(result.confirm)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}

export const showToast = ({ title }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title,
      icon: 'none',
      mask: true,
      success: (result) => {
        resolve()
      },
      fail: (err) => {
        reject(err)
      },

    });
  })
}

export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },

    });

  })
}



