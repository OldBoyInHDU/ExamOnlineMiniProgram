// pages/gradestab/gradestab.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      username: '',
      password: '',
      examdate: '',
      isGenerated: false,
      isLogged: true,//是否登陆
      show: false,//pop弹出
      active: 0,//tab标签

      //表格数据
        stripe: true,
        border: true,
        outBorder: true,
        tableHeader: [
            {
              prop: 'num',
              width: 150,
              label: '工号',
              color: '#55C355'
            },
            {
              prop: 'name',
              width: 150,
              label: '姓名'
            },
            {
              prop: 'examdate',
              width: 150,
              label: '考试日期'
            },
            {
              prop: 'grades',
              width: 150,
              label: '成绩'
            },
            {
              prop: 'statistics',
              width: 150,
              label: '统计'
            }
          ],
          
          row: [
            {
                "id": 1,
                
                "num": "61655",
                "name": '黄桁',
                "examdate": '220314',
                "grades": 90,
            }
          ],
          msg: '暂无数据'
    },


    onBlurExamDate(event) {
      var tempExamDate = event.detail.value
      this.setData({
        examdate: tempExamDate
      })
      // console.log(this.data.examdate)
    },
    /**
     * 生成试卷
     */
    btnGenerateExamPaper() {
        wx.request({
          url: 'http://localhost:8080/generateExamPaper',
          header: {
            //post传参，后端收不到参数，解决办法
            //https://blog.csdn.net/li_xue_zhao/article/details/84553265
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'post',
          data: {
              examdate: this.data.examdate
          },
          success: res => {
              console.log(res.data)
              var app = getApp()
              app.globalData.examdateGlobal = this.data.examdate
              
              this.setData({
                isGenerated: true
              })
          }
        })
    },

    /**
     * 
     * 成绩查询
     */
    getEmployeesGrades() {

    },
    onChange(event) {
      // wx.showToast({
      //   title: `切换到标签 ${event.detail.name}`,
      //   icon: 'none',
      // });
    },

    inputUsername(event) {
      // console.log(event.detail)

    },
    onBlurUsername(event) {
      var tempUsername = event.detail.value
      console.log("onblur-username:" + tempUsername )
      this.setData({
        username: tempUsername
      })
    },

    inputPassword(event) {
      // console.log(event.detail)
    },

    onBlurPassword(event) {
      var tempPassword = event.detail.value
      console.log("onblur-password:" + tempPassword )
      this.setData({
        password: tempPassword
      })
    },

    btnLogin() {
      if('admin' == this.data.username && 'zscj2022' == this.data.password) {
        this.setData({
          isLogged: true
        })
      } else {
        this.showPopup()
      }
    },
    
    /**
     * 弹出框
     */
    showPopup() {
      this.setData({ show: true });
    },
  
  onClose() {
      this.setData({ show: false });
   },

   /**
     * 弹出框2
     */
    showPopup2() {
      this.setData({ isGenerated: true });
    },
  
    onClose2() {
      this.setData({ isGenerated: false });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})