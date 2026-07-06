const app = getApp()

Page({
  data: {
    cartCount: 0,
    hotItems: [
      { id: 1, name: '经典牛肉汉堡', price: 28.00, image: 'delicious beef burger' },
      { id: 2, name: '芝士汉堡', price: 32.00, image: 'cheese burger' },
      { id: 3, name: '超值套餐A', price: 45.00, image: 'fast food combo meal' },
      { id: 4, name: '炸鸡块', price: 18.00, image: 'crispy chicken nuggets' },
      { id: 5, name: '奶茶', price: 15.00, image: 'milk tea with pearls' }
    ]
  },

  onLoad: function () {
    this.loadCartCount()
  },

  onShow: function () {
    this.loadCartCount()
  },

  loadCartCount: function () {
    const cart = wx.getStorageSync('cart') || []
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    this.setData({ cartCount: count })
  },

  goToOrder: function () {
    wx.switchTab({
      url: '/pages/order/order'
    })
  },

  goToCart: function () {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  onShareAppMessage: function () {
    return {
      title: '美味餐厅 - 在线点单',
      desc: '快来品尝美味',
      path: '/pages/index/index'
    }
  },

  onShareTimeline: function () {
    return {
      title: '美味餐厅 - 在线点单'
    }
  }
})