// pages/exam/exam.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        value: '',
        examdate: '',
        questionList: [],
        // questionList: [
        //     {"id": 1, "question": "1+1=?", "answer": "2"},
        //     {"id": 2, "question": "1+2=?", "answer": "3"},
        //     {"id": 3, "question": "1+3=?", "answer": "4"}, 
        //     {"id": 4, "question": "1+4=?", "answer": "5"},
        //     {"id": 5, "question": "1+5=?", "answer": "6"},
        //     {"id": 6, "question": "1+6=?", "answer": "7"},
        //     {"id": 7, "question": "1+7=?", "answer": "8"},
        //     {"id": 8, "question": "1+8=?", "answer": "9"}, 
        //     {"id": 9, "question": "1+9=?", "answer": "10"},
        //     {"id": 10, "question": "1+10=?", "answer": "11"}
        // ],
        answerList: ['','','','','','','','','',''],
        rightNum: 0,
        wrongNum: 0,
        wrongAnsIdxList: [],
        count:10 //显示多少道题目
    },

    
    //获得最新的题目
    getExamPaperByExamDate() {
        var app = getApp()

        this.setData({
            examdate: app.globalData.examdateGlobal
        })
        wx.request({
          url: 'http://localhost:8080/getExamPaperByExamDate',
          method: 'GET',
          data: {
              examdate: this.data.examdate
          },
          success: res => {
              console.log(res.data)
              this.setData({
                  questionList: res.data.data
              })
          }
        })
    },
    //计算结果分数
    calculateGrades() {
        var tempWrongNum = 0
        var tempWrongAnsIdxList = []
        for(var i = 0; i < this.data.questionList.length; i++) {
            console.log("questionList：" + this.data.questionList[i].answer)
            console.log("answerList:" + this.data.answerList[i])
            if(this.data.questionList[i].answer != this.data.answerList[i]) {
                console.log("正确答案：" + this.data.questionList[i].answer + "我的答案：" + this.data.answerList[i])
                tempWrongNum++
                tempWrongAnsIdxList.push(i+1)
            }
        }
        this.setData({
            wrongNum: tempWrongNum,
            wrongAnsIdxList: tempWrongAnsIdxList,
            rightNum: 10 - tempWrongNum
        })

        console.log("rightNum: " + this.data.rightNum)
        var app = getApp()

        app.globalData.wrongNumGlobal = this.data.wrongNum
        app.globalData.rightNumGlobal = 10 - this.data.wrongNum
        app.globalData.totalGrades = this.data.rightNum * 10

        console.log("全局错误：" + app.globalData.wrongNumGlobal)
        console.log("全局正确：" + app.globalData.rightNumGlobal)
        console.log("全局总分：" + app.globalData.totalGrades)

        //登记分数
        wx.request({
          url: 'http://localhost:8080/recordGrades',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          data: {
            employeeNum: app.globalData.usernumGlobal,
            employeeName: app.globalData.usernameGlobal,
            examdate: app.globalData.examdateGlobal,
            grades: app.globalData.totalGrades
          },
          success: res => {
              console.log(res)
          }


        })
    },

    

    //输入答案
    answerInput(event) {
        
        // console.log(event.detail)
    },

    

    //给答案数组添加答案
    onBlur(event) {
        var quesnum = event.target.dataset.questionnum
        var quesIdx = quesnum + 1
        var answer = event.detail.value
        // console.log("题号：" + quesIdx + ",答案：" + answer)
        // console.log("答案：" + answer)
        this.setData({
            ['answerList['+ quesnum +']']: answer
        })
    },

    //跳转到结果页面
    tapToExamResult() {
        this.calculateGrades()
        wx.navigateTo({
          url: '../examresult/examresult'
        })
    },

    onChange(event) {
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getExamPaperByExamDate()
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