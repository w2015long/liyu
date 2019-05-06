// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles:[
      {
        avatar:'../../images/blog.jpg',
        date:'2019-05-06',
        title:'华为meit30发布会',
        photo:'../../images/carousel3.jpg',
        desc:'我是文章，使用警告：此Api非官方版本，请各位尽量将分享功能迁移至腾讯官方版，会更稳定些',
        star: '9999',
        view: '86520'
      },
      {
        avatar: '../../images/blog.jpg',
        date: '2019-05-09',
        title: '华为meit56发布会',
        photo: '../../images/bg4.jpg',
        desc: '分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试',
        star: '89',
        view: '56'
      },      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ articles: articles})
    //console.log('article:onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //console.log('article:onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log('article:onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //console.log('article:onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //console.log('article:onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //console.log('article:onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //console.log('article:onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    //console.log('article:onShareAppMessage')
  }
})