const app = getApp()

Page({
  data: {
    cart: [],
    totalPrice: 0,
    totalCount: 0
  },

  onLoad: function () {
    this.loadCart()
  },

  onShow: function () {
    this.loadCart()
  },

  loadCart: function () {
    const cart = wx.getStorageSync('cart') || []
    this.setData({ cart })
    this.calculateTotal()
  },

  calculateTotal: function () {
    let totalPrice = 0
    let totalCount = 0
    this.data.cart.forEach(item => {
      totalPrice += item.price * item.quantity
      totalCount += item.quantity
    })
    this.setData({ totalPrice, totalCount })
  },

  increaseQty: function (e) {
    const itemId = parseInt(e.currentTarget.dataset.id)
    let cart = [...this.data.cart]
    const item = cart.find(item => item.id === itemId)
    if (item) {
      item.quantity++
      this.setData({ cart })
      wx.setStorageSync('cart', cart)
      this.calculateTotal()
      wx.vibrateShort({})
    }
  },

  decreaseQty: function (e) {
    const itemId = parseInt(e.currentTarget.dataset.id)
    let cart = [...this.data.cart]
    const item = cart.find(item => item.id === itemId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        cart = cart.filter(item => item.id !== itemId)
      }
      this.setData({ cart })
      wx.setStorageSync('cart', cart)
      this.calculateTotal()
    }
  },

  deleteItem: function (e) {
    const itemId = parseInt(e.currentTarget.dataset.id)
    const that = this
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这件商品吗？',
      success: function (res) {
        if (res.confirm) {
          let cart = that.data.cart.filter(item => item.id !== itemId)
          that.setData({ cart })
          wx.setStorageSync('cart', cart)
          that.calculateTotal()
          wx.showToast({ title: '已删除', icon: 'success' })
        }
      }
    })
  },

  goToOrder: function () {
    wx.switchTab({
      url: '/pages/order/order'
    })
  },

  checkout: function () {
    if (this.data.cart.length === 0) {
      wx.showToast({ title: '购物车是空的', icon: 'none' })
      return
    }

    const orderItems = this.data.cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity
    }))

    const orderData = {
      items: orderItems,
      totalPrice: this.data.totalPrice,
      totalCount: this.data.totalCount,
      createTime: new Date().toLocaleString()
    }

    wx.showModal({
      title: '确认订单',
      content: `共${this.data.totalCount}件商品，合计¥${this.data.totalPrice.toFixed(2)}`,
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('order', orderData)
          wx.setStorageSync('cart', [])
          
          wx.showToast({ 
            title: '下单成功', 
            icon: 'success',
            duration: 2000 
          })

          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 2000)
        }
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '购物车',
      desc: '快来看看我的购物车',
      path: '/pages/cart/cart'
    }
  }
})