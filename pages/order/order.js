const app = getApp()

Page({
  data: {
    categories: [
      { id: 'all', name: '全部' },
      { id: 'burger', name: '汉堡' },
      { id: 'drink', name: '饮品' },
      { id: 'snack', name: '小吃' },
      { id: 'set', name: '套餐' }
    ],
    currentCategory: 'all',
    menuItems: [
      { id: 1, name: '经典牛肉汉堡', description: '100%纯牛肉饼，新鲜蔬菜', price: 28.00, category: 'burger', image: 'delicious beef burger with lettuce and tomato' },
      { id: 2, name: '芝士汉堡', description: '香浓芝士，回味无穷', price: 32.00, category: 'burger', image: 'cheese burger with melted cheese' },
      { id: 3, name: '鸡腿汉堡', description: '酥脆鸡腿肉，外酥里嫩', price: 25.00, category: 'burger', image: 'crispy chicken leg burger' },
      { id: 4, name: '可乐(中杯)', description: '冰爽可口，畅饮无限', price: 8.00, category: 'drink', image: 'cold cola drink in cup' },
      { id: 5, name: '雪碧(中杯)', description: '清爽柠檬味，透心凉', price: 8.00, category: 'drink', image: 'sprite lemon lime soda drink' },
      { id: 6, name: '奶茶(大杯)', description: '香浓奶茶，丝滑口感', price: 15.00, category: 'drink', image: 'milk tea with pearls' },
      { id: 7, name: '薯条(大份)', description: '金黄酥脆，经典美味', price: 12.00, category: 'snack', image: 'golden crispy french fries' },
      { id: 8, name: '炸鸡块', description: '外酥里嫩，鲜香可口', price: 18.00, category: 'snack', image: 'crispy chicken nuggets' },
      { id: 9, name: '蛋挞', description: '香甜酥脆，葡式风味', price: 6.00, category: 'snack', image: 'portuguese egg tart' },
      { id: 10, name: '超值套餐A', description: '汉堡+薯条+可乐', price: 45.00, category: 'set', image: 'fast food combo meal with burger fries and drink' },
      { id: 11, name: '家庭套餐', description: '2汉堡+2薯条+2可乐', price: 88.00, category: 'set', image: 'family meal set with burgers and drinks' },
      { id: 12, name: '儿童套餐', description: '小汉堡+小薯条+果汁', price: 35.00, category: 'set', image: 'kids meal with happy meal box' }
    ],
    cart: []
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
  },

  switchCategory: function (e) {
    const categoryId = e.currentTarget.dataset.id
    this.setData({ currentCategory: categoryId })
  },

  getFilteredItems: function () {
    if (this.data.currentCategory === 'all') {
      return this.data.menuItems
    }
    return this.data.menuItems.filter(item => item.category === this.data.currentCategory)
  },

  getCartCount: function (itemId) {
    const item = this.data.cart.find(cartItem => cartItem.id === itemId)
    return item ? item.quantity : 0
  },

  addToCart: function (e) {
    const itemId = parseInt(e.currentTarget.dataset.id)
    const menuItem = this.data.menuItems.find(item => item.id === itemId)
    
    if (!menuItem) return

    let cart = [...this.data.cart]
    const existingItem = cart.find(item => item.id === itemId)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.push({
        ...menuItem,
        quantity: 1
      })
    }

    this.setData({ cart })
    wx.setStorageSync('cart', cart)
    wx.vibrateShort({})
    wx.showToast({ title: '已添加', icon: 'success', duration: 1000 })
  },

  decreaseItem: function (e) {
    const itemId = parseInt(e.currentTarget.dataset.id)
    let cart = [...this.data.cart]
    const existingItem = cart.find(item => item.id === itemId)

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--
      } else {
        cart = cart.filter(item => item.id !== itemId)
      }
    }

    this.setData({ cart })
    wx.setStorageSync('cart', cart)
  },

  get menuItems() {
    return this.getFilteredItems()
  },

  onShareAppMessage: function () {
    return {
      title: '快来点单吧',
      desc: '美味等你来选',
      path: '/pages/order/order'
    }
  }
})