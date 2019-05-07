var { articles } = require('../../../data/db.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var articleId = options.articleId;
    var article = articles[articleId];
    //处理收藏状态
    var collect_articel = wx.getStorageSync('collect_articel');

    var isCollected = false; 
    if (!collect_articel){
      var data = null;
      data[articleId] = false;
      wx.setStorageSync('collect_articel', data)
    }else{
      isCollected = !!collect_articel[articleId]
    }

  
    this.setData({ ...article,isCollected:isCollected});
  },
  //收藏
  tapCollect:function(){
    // wx.setStorageSync('key',123)
    var collect_articel = wx.getStorageSync('collect_articel');
    var isCollected = collect_articel[this.data[articleId]];
    //改变storage里面的数据
    collect_articel[this.data[articleId]] = !isCollected;
    wx.setStorageSync('collect_articel', collect_articel);
    ////改变视图页面
    this.setData({
      isCollected:isCollected
    },function(){

    }.bind(this))
  },

  /**
   * 处理分享
   */
  tapShare:function(){
    var list = ['分享到朋友圈','分享到微博','分享到QQ']
    wx.showActionSheet({
      itemList: list ,
      success(res){
        wx.showToast({
          title:list[res.tapIndex]+'成功'
        })
      }
    })
  }

})