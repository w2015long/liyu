//index.js
//获取应用实例
const app = getApp()

Page({
  skipToArticle:function(){
    wx.redirectTo({
      url: '/pages/article/article'
    })
  }
})
