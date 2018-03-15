// component/wx-index-list/wx-index-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      inputShowed: false,
      inputVal: ""
    }
  },

  data: {
    list: [],
    rightArr: [],// 右侧字母展示
    jumpNum: '' //跳转到那个字母

  },
  ready() {
    let data = this.data.data;
    this.resetRight(data);
  },
  methods: {
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      let data = this.data.data;
      this.resetRight(data);
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping: function (e) {
      this.value = e.detail.value;
      this.searchMt()
    },
    // 数据重新渲染
    resetRight(data) {
      let rightArr = []
      for (let i in data) {
        rightArr.push(data[i].title.substr(0, 1));
      }
      this.setData({
        list: data,
        rightArr
      })
    },
    // 右侧字母点击事件
    jumpMt(e) {
      console.log(e);
      let jumpNum = e.currentTarget.dataset.id;
      this.setData({ jumpNum });
      wx.showToast({
        title: e.currentTarget.dataset.value,
      })
    },
    // 列表点击事件
    detailMt(e) {
      let detail = e.currentTarget.dataset.detail;
      let myEventOption = {
        bubbles: false,//事件是否冒泡
        composed: false,//事件是否可以穿越组件边界
        capturePhase: false //事件是否拥有捕获阶段
      } // 触发事件的选项
      this.triggerEvent('detail', detail, myEventOption)

    },
    // 获取搜索输入内容
    input(e) {
      this.value = e.detail.value;
    },
    // 基础搜索功能
    searchMt() {
      let data = this.data.data;
      if (!this.value) {
        this.resetRight(data);
        return;
      }
      
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        let itemArr = [];
        for (let j = 0; j < data[i].item.length; j++) {
          if (data[i].item[j].name.indexOf(this.value) > -1) {
            let itemJson = {};
            for (let k in data[i].item[j]) {
              itemJson[k] = data[i].item[j][k];
            }
            itemArr.push(itemJson);
          }
        }
        if (itemArr.length === 0) {
          continue;
        }
        newData.push({
          title: data[i].title,
          type: data[i].type ? data[i].type:"",
          item: itemArr
        })
      }
      this.resetRight(newData);

    },
    onPullDownRefresh: function() {
      this.triggerEvent('DownRefresh')
    }

  }
})
