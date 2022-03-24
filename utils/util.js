const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * requestPromise用于将wx.request改写成Promise方式
 * @param：{string} myUrl 接口地址
 * @return: Promise实例对象
 */
const requestGetPromise = (params) => {
  // 返回一个Promise实例对象
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: params.url,
      method: "GET",
      success: res => resolve(res)
    })
  })
}



module.exports = {
  formatTime,
  requestGetPromise
}
