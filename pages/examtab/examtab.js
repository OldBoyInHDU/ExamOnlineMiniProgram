// pages/examtab/examtab.js

//调用util里的请求api
const utilApi = require("../../utils/util.js")


Page({

    /**
     * 页面的初始数据
     */
    data: {
        examdate: "",
        value: '',
        show: false,
        num: '',
        name: '',
        employeeNum: '',
        employeeName: '',
        isInfoRight: false,
        examStatus: false
    },

    numInput(event) {
        
        this.setData({
            num: event.detail
        })
        // console.log("工号：" + event.detail)
    },
    
    nameInput(event) {
        
        this.setData({
            name: event.detail
        })
        // console.log("姓名：" + event.detail)
    },

    onBlurNum(event) {
        var tempNum = event.detail.value
        
        this.setData({
            num: tempNum
        })
      },

    onBlurName(event) {
        var tempName = event.detail.value
        
        this.setData({
            name: tempName
        })
        
    },
    /**
     * 参与考试
     */
    btnTapJoinExam() {
        //判断姓名工号是否一致
        // this.judgeInfoIsRight()
        if(this.data.num != '' && this.data.num != '') {
            wx.request({
                url: 'http://localhost:8080/getEmployeeByNum',
                method: 'get',
                data: {
                    num: this.data.num
                },
                success: (res) => {
                    console.log(res)
                    this.setData({
                        //responseResult里面有data
                        employeeNum: res.data.data.employeeNum,
                        employeeName: res.data.data.employeeName
                    })
                    //判断输入框的姓名和请求返回的姓名是否一致
                    if(this.data.name == this.data.employeeName) {
                        this.setData({
                            isInfoRight: true
                        })
                    } else {
                        this.setData({
                            isInfoRight: false
                        })
                        // this.showPopup()
                    }
                    //发起第二个请求，获取考试状态
                    wx.request({
                        url: 'http://localhost:8080/examstatus',//请求的接口地址，必须基于https协议
                        method: 'get', //请求的方式
                        data:{ //发送到服务器的数据
                            num: this.data.employeeNum,
                            examdate: this.data.examdate
                        },
                        success: (res) => {//请求成功之后的回调函数
                            console.log(res.data)//查看真实数据 console.log(res.data)
                            if(res.data.data != null) {
                                this.setData({
                                    examStatus: true
                                })
                            } else {
                                this.setData({
                                    examStatus: false
                                })
                                // this.showPopup()
                            }
                            //将工号和姓名存在全局变量里
                            var app = getApp()
                            app.globalData.usernumGlobal = this.data.employeeNum
                            app.globalData.usernameGlobal = this.data.employeeName
    
                            console.log("isInfoRight:" + this.data.isInfoRight)
                            console.log("examStatus:" + this.data.examStatus)
                            //已参与，跳出框提示
                            if(this.data.isInfoRight == true && this.data.examStatus == false) {
                                wx.navigateTo({
                                    url: '../exam/exam',
                                })
                            } else {
                                this.showPopup()
                            }
                             
    
                        }
                    })
    
                }
                
            })
        } else {
            this.setData({
                isInfoRight: false
            })
            this.showPopup()
        }
        


        //判断之前是否参与考试
        // this.judgeExamStatus()
        
           
    },

    /**
     * 获取试题期数，考过true，未考false
     */
    getExamDate() {
        var app = getApp()
        wx.request({
            url: 'http://localhost:8080/examdate',//请求的接口地址，必须基于https协议
            method: 'get', //请求的方式
            
            success: (res) => {//请求成功之后的回调函数
               //查看真实数据 
            //    console.log(res.data)
               
               this.setData({
                examdate: res.data.data
            })
            app.globalData.examdateGlobal = this.data.examdate
            console.log('考试期数：' + this.data.examdate)
            },
            fail: (res) => {
                wx.showToast({
                  title: '后台服务故障',
                  icon: "error",
                  duration: 3000
                })
            }
        })
        
    },

    /**
     * 判断工号姓名是否匹配
     * num已经输入在data里，无需传参
     */
    judgeInfoIsRight() {
        console.log("num:" + this.data.num + ",name: " + this.data.name)
        utilApi.requestGetPromise({
            url: 'http://localhost:8080/getEmployeeByNum',
            data: {
                num: this.data.num
            }
        
        }).then(res => {
            console.log("promise请求："+res.data.id)

            this.setData({
                employeeNum: res.data.employeeNum,
                employeeName: res.data.employeeName
            })
            if(this.data.name == this.data.employeeName) {
                this.setData({
                    isInfoRight: true
                })
            } else {
                this.setData({
                    isInfoRight: false
                })
                // this.showPopup()
            }
    
            console.log('信息是否一致: ' + this.data.isInfoRight)
            
        })
        /**
         * wx.request({
          url: 'http://localhost:8080/getEmployeeByNum',
          method: 'get',
          data: {
              num: this.data.num
          },
          success: (res) => {
            //   console.log(res)
              this.setData({
                  employeeNum: res.data.employeeNum,
                  employeeName: res.data.employeeName
              })
          }
          
        })
        */
        
    },

    /**
     * 判断是否考过试，考过true，未考false
     */
    judgeExamStatus(){
        // console.log('是否考过考试：'+this.data.examStatus)
        utilApi.requestGetPromise({
            url: 'http://localhost:8080/examstatus',
            data: {
                num: this.data.employeeNum,
                examdate: this.data.examdate
            }
        }).then(res => {
            console.log(res)
            if(res.data != "") {
                this.setData({
                    examStatus: true
                })
            } else {
                this.setData({
                    examStatus: false
                })
                // this.showPopup()
            }
        })
        // wx.request({
        //     url: 'http://localhost:8080/examstatus',//请求的接口地址，必须基于https协议
        //     method: 'get', //请求的方式
        //     data:{ //发送到服务器的数据
        //         num: this.data.employeeNum,
        //         examdate: this.data.examdate
        //     },
        //     success: (res) => {//请求成功之后的回调函数
        //         console.log(res)//查看真实数据 console.log(res.data)
        //         judgeExamStatus(res)
        //     }
        // })
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.clearStorageSync()
        this.getExamDate()
        // this.getExamStatus()
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