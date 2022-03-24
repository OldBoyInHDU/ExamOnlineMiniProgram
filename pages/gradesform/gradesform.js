// pages/gradesform/gradesform.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tableHeader: [
            {
              prop: 'datetime',
              width: 150,
              label: '日期',
              color: '#55C355'
            },
            {
              prop: 'sign_in',
              width: 152,
              label: '上班时间'
            },
            {
              prop: 'sign_out',
              width: 152,
              label: '下班时间'
            },
            {
              prop: 'work_hour',
              width: 110,
              label: '工时'
            },
            {
              prop: 'statusText',
              width: 110,
              label: '状态'
            }
          ],
          stripe: true,
          border: true,
          outBorder: true,
          row: [
            {
                "id": 1,
                "status": '正常',
                "datetime": "04-01",
                "sign_in_time": '09:30:00',
                "sign_out_time": '18:30:00',
                "work_hour": 8,
            }, {
                "id": 2,
                "status": '迟到',
                "datetime": "04-02",
                "sign_in_time": '10:30:00',
                "sign_out_time": '18:30:00',
                "work_hour": 7,
            }, {
                "id": 29,
                "status": '正常',
                "datetime": "04-03",
                "sign_in_time": '09:30:00',
                "sign_out_time": '18:30:00',
                "work_hour": 8,
            }, {
                "id": 318,
                "status": '休息日',
                "datetime": "04-04",
                "sign_in_time": '',
                "sign_out_time": '',
                "work_hour": '',
            }, {
                "id": 319,
                "status": '正常',
                "datetime": "04-05",
                "sign_in_time": '09:30:00',
                "sign_out_time": '18:30:00',
                "work_hour": 8,
            }
          ],
          msg: '暂无数据'
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