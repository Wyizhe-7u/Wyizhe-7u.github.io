const app = getApp()

Page({
  data: {
    count: 0,
    history: [],
    maxValue: 0,
    minValue: 0
  },

  onLoad: function () {
    console.log('计数器页面加载')
  },

  increase: function () {
    const newCount = this.data.count + 1
    this.updateCount(newCount, '+', 1)
    wx.vibrateShort({})
  },

  decrease: function () {
    const newCount = Math.max(0, this.data.count - 1)
    this.updateCount(newCount, '-', 1)
    wx.vibrateShort({})
  },

  reset: function () {
    this.updateCount(0, '重置', this.data.count)
    wx.vibrateShort({})
  },

  updateCount: function (newCount, type, value) {
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    
    const newHistory = [{
      time: time,
      type: type,
      value: value
    }, ...this.data.history].slice(0, 10)

    this.setData({
      count: newCount,
      history: newHistory,
      maxValue: Math.max(this.data.maxValue, newCount),
      minValue: this.data.history.length === 0 ? 0 : Math.min(this.data.minValue, newCount)
    })
  },

  onShareAppMessage: function () {
    return {
      title: `计数器: ${this.data.count}`,
      desc: '一起使用计数器吧',
      path: '/pages/counter/counter'
    }
  },

  onShareTimeline: function () {
    return {
      title: `计数器显示: ${this.data.count}`
    }
  }
})