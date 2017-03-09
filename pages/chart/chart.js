// pages/chart/chart.js
Page({
  data: {
    list: [159, 221, 166, 253, 99, 147, 61,184]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.initChart()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  initChart: function () {

    const ctx = wx.createCanvasContext('firstCanvas')

    ctx.beginPath()
    ctx.setStrokeStyle('#999999')
    ctx.setFillStyle('blue')
    ctx.setLineWidth(1)
    const leftTopX = this.getEleWidth(77)
    const leftTopY = this.getEleWidth(124)
    const leftBottomX = this.getEleWidth(77)
    const leftBottomY = this.getEleWidth(590)
    const rightBottomX = this.getEleWidth(635 + 10)
    const rightBottomY = this.getEleWidth(590)
    const yHeight = this.getEleWidth(444)
    const xWidth = this.getEleWidth(588)
    ctx.moveTo(leftTopX, leftTopY)
    //y轴
    ctx.lineTo(leftBottomX, leftBottomY)
    //x轴
    ctx.lineTo(rightBottomX, rightBottomY)
    ctx.setFontSize(this.getEleWidth(30))

    ctx.fillText("折线图", this.getEleWidth(536), this.getEleWidth(70))
    this.drawYScale(ctx);
    this.drawXScale(ctx);
   
    //画折线
    this.drawCharts(ctx);
    ctx.stroke()
    ctx.draw(true)
  },
  drawYScale: function (ctx) {
    var that = this;

    var scaleStartX = this.getEleWidth(77)
    var scaleEndX = this.getEleWidth(77 + 15)
    var littleScaleEndX = this.getEleWidth(77 + 7)
    const scaleStartY = this.getEleWidth(590)
    const yHeight = this.getEleWidth(444)
    var oneScaleX = yHeight / 5
    ctx.setFontSize(this.getEleWidth(20))
    var textX = this.getEleWidth(35)
    for (var i = 1; i < 6; i++) {
      var scaleEndY = scaleStartY - oneScaleX * i
      ctx.moveTo(scaleStartX, scaleEndY)
      ctx.lineTo(scaleEndX, scaleEndY)
      var littleScaleStartY = scaleStartY - (yHeight / 5) * (i - 1)
      ctx.fillText(50 * i, textX, scaleEndY + this.getEleWidth(10))

      for (var j = 1; j < 5; j++) {

        var littleScaleEndY = littleScaleStartY - (yHeight / 5 / 5) * j
        ctx.moveTo(scaleStartX, littleScaleEndY)
        ctx.lineTo(littleScaleEndX, littleScaleEndY)
        ctx.stroke();
      }
    }
    const lowlimitLineY = scaleStartY - (yHeight / 250 * 90)
    const highlimitLineY = scaleStartY - (yHeight / 250 * 140)
    const rightBottomX = this.getEleWidth(635 + 10)
    const space = this.getEleWidth(10)
    //两条限制线
    that.drawDashLine(ctx, scaleStartX, lowlimitLineY, rightBottomX, lowlimitLineY, space)
    that.drawDashLine(ctx, scaleStartX, highlimitLineY, rightBottomX, highlimitLineY, space)

  },
  drawXScale: function (ctx) {
    var that = this;
    var scaleStartY = this.getEleWidth(590)
    var scaleEndY = this.getEleWidth(124)
    const xWidth = this.getEleWidth(558)
    const xMaginLeft = this.getEleWidth(77)
    const oneScaleX = xWidth / 7
    const space = this.getEleWidth(10)
    for (var i = 1; i < 8; i++) {
      var toEndX = xMaginLeft + oneScaleX * i;
      that.drawDashLine(ctx, toEndX, scaleStartY, toEndX, scaleEndY, space)

    }
    for (var i = 0; i < 8; i++) {
      var toEndX = xMaginLeft + oneScaleX * i;
      ctx.fillText(i, toEndX - this.getEleWidth(5), scaleStartY + this.getEleWidth(30))
    }
  },
  //画虚线
  drawDashLine: function (ctx, x1, y1, x2, y2, dashLength) {  //传context对象，始点x和y坐标，终点x和y坐标，虚线长度
    ctx.beginPath()
    ctx.setLineWidth(0.5)
    var dashLen = dashLength === undefined ? 3 : dashLength,
      xpos = x2 - x1, //得到横向的宽度;
      ypos = y2 - y1, //得到纵向的高度;
      numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
    //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
    for (var i = 0; i < numDashes; i++) {
      if (i % 2 === 0) {
        ctx.moveTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
        //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
      } else {
        ctx.lineTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
      }
    }
    ctx.stroke();
  },
  drawCharts: function (ctx) {
    console.log("------------------")
    ctx.beginPath()
    ctx.setStrokeStyle('red')
    var that = this;
    var list = that.data.list;
    const leftTopX = this.getEleWidth(77)
    const leftBottomY = this.getEleWidth(590)
    const yHeight = this.getEleWidth(444)
    const xWidth = this.getEleWidth(588)
    for (var i = 0; i < list.length; i++) {
      var height = list[i];
      console.log(height)
      var x = leftTopX + (xWidth / list.length) * i
      var y = leftBottomY - (yHeight / 250) * height
      if (i == 0) {
        ctx.moveTo(x, y)
      } else {
       ctx.lineTo(x, y)
       
      }

    }

     ctx.stroke()
    ctx.draw(true)
  },
  //为了获取按钮的宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
    }
  },



})