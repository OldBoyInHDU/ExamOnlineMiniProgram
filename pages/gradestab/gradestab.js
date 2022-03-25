// pages/gradestab/gradestab.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      username: '',//管理员用户名
      password: '',//管理员密码 zscj2022
      examdate: '',//生成试卷的考试日期参数
      isGenerated: false,//是否生成试卷
      isLogged: false,//是否登陆
      show: false,//pop弹出
      active: 0,//tab标签
      examDate: '',//成绩查询的考试日期参数
      name: '',//成绩查询的姓名参数

      //表格数据
        stripe: true,
        border: true,
        outBorder: true,
        tableHeader: [
            {
              prop: 'employeeNum',
              width: 150,
              label: '工号',
              color: '#55C355'
            },
            {
              prop: 'employeeName',
              width: 150,
              label: '姓名'
            },
            {
              prop: 'examDate',
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
          
          row: [],
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
     * 成绩查询tab
     *
     */

    onBlurSearchExamDate(event) {
      var tempExamDate = event.detail.value
      this.setData({
        examDate: tempExamDate
      })
    },
    onBlurSearchName(event) {
      var tempName = event.detail.value
      this.setData({
        name: tempName
      })
    },

    /**
     * 成绩查询
     * 所有员工
     */
    getAllGrades() {
        wx.request({
          url: 'http://localhost:8080/getAllGrades',
          method: "GET",
          success: res => {
            console.log(res.data)
            this.setData({
              row: res.data.data
            })
            
          }
        })
    },

    /**
     * 成绩查询
     * 条件：考试日期or姓名
     * 动态查询
     * 
     */
    getGradesByNameOrExamDate() {
      wx.request({
        url: 'http://localhost:8080/getGradesByNameOrExamDate',
        method: "GET",
        data: {
          examDate: this.data.examDate,
          name: this.data.name
        },
        success: res => {
          console.log(res.data)
          this.setData({
            row: res.data.data
          })
        }
      })
    },

    btnSearchGradesByNameOrExamDate() {
      this.getGradesByNameOrExamDate()
    },

    onChange(event) {
      // wx.showToast({
      //   title: `切换到标签 ${event.detail.name}`,
      //   icon: 'none',
      // });
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // this.getAllGrades()
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