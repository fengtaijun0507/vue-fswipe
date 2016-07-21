<template>
<div class='swipecontainer'>
  <div class="wrap" @touchstart.prevent='start' @touchmove.prevent='move' @touchend.prevent='stop' @transitionEnd='positionTrick'>
    <swipe-item  :items='imgMessage.imgArray' :cur-index.sync='curIndex'></swipe-item>
  </div>
  <div class="wrapPaniagation">
    <swipe-panigation :index='imgMessage.count' :cur-index='curIndex'></swipe-panigation>
  </div>
</div>
</template>
<script>
import swipeItem from './swipe-item.vue'
import swipePanigation from './swipe-panigation.vue'
export default {
  props: {
    imgMessage: {
      type: Object,
      default: function () {
        return {
          count: 3,
          imgArray: []
        }
      }
    }
  },
  data () {
    return {
      curIndex: 1,
      nextIndex: 1,
      iStart: 0,
      iWith: 0,
      bfirsrtTag: 0,
      startTime: 0,
      endTime: 0,
      iInterval: 0,
      bStop: false
    }
  },
  components: {
    swipeItem,
    swipePanigation
  },
  methods: {
    next: function () {},
    prev: function () {},
    autoMove: function () {},
    start: function (event) {
      // 记录当前手指的横坐标
      this.bfirsrtTag++
      var ev = event.changedTouches[0]
      this.secondTime = new Date().getTime()
      this.iInterval = this.secondTime - this.endTime
      if ((this.bfirsrtTag > 1 && this.iInterval > 500) || this.bfirsrtTag < 2) {
        this.iStart = ev.pageX
        return
      }
      this.iStart = ev.pageX
    },
    move: function (event) {
      let eWrap = document.querySelector('.wrap')
      let ev = event.changedTouches[0]
      if ((this.bfirsrtTag > 1 && this.iInterval > 400) || this.bfirsrtTag < 2) {
        let iRealDistance = -(this.iStart - ev.pageX + this.curIndex * this.iWidth)
        eWrap.style.WebkitTransform = eWrap.style.transform = 'translate3d(' + iRealDistance + 'px, 0, 0)'
      }
    },
    stop: function (event, tSecond) {
      this.stop = true
      this.endTime = new Date().getTime()
      var self = this
      let temp = Math.round(self.getTransPos() / self.iWidth)
      self.nextIndex = temp
      let eWrap = document.querySelector('.wrap')
      let iDistance = -(self.nextIndex * self.iWidth)
      eWrap.style.transition = tSecond || 400 + 'ms'
      eWrap.style.transitionTimingFunction = 'ease-in-out'
      eWrap.style.WebkitTransform = eWrap.style.transform = 'translate3d(' + iDistance + 'px, 0, 0)'
      self.curIndex = self.nextIndex
    },
    positionTrick: function () {
      let eWrap = document.querySelector('.wrap')
      let iDistance = 0
      var self = this
      if (this.nextIndex == 0) {
        eWrap.style.transition = '0s'
        iDistance = -3 * self.iWidth
        eWrap.style.WebkitTransform = eWrap.style.transform = 'translate3d(' + iDistance + 'px, 0, 0)'
        self.nextIndex = 3
        self.curIndex = 3
        return
      }
      if (this.nextIndex == 4) {
        eWrap.style.transition = '0s'
        iDistance = -this.iWidth
        eWrap.style.WebkitTransform = eWrap.style.transform = 'translate3d(' + iDistance + 'px, 0, 0)'
        self.nextIndex = 1
        self.curIndex = 1
        return
      }
    },
    getTransPos: function () {
      this.curIndex = this.nextIndex
      let eWrap = document.querySelector('.wrap')
      let transZRegex = /\.*translate3d\((\-?[\d\.]*)px,[\s\S]*/i
      let transPos = ''
      if (eWrap.style.transform && (-transZRegex.exec(eWrap.style.transform).length || -transZRegex.exec(eWrap.style.transform).length > 1)) {
        transPos = -transZRegex.exec(eWrap.style.transform)[1]
      }
      return transPos
    }
  },
  ready: function () {
    this.iWidth = parseInt(document.documentElement.style.fontSize) * 10
    let eWrap = document.querySelector('.wrap')
    eWrap.style.width = (this.imgMessage.count + 2) * 100 + '%'
    let iLoca = - parseInt(document.documentElement.style.fontSize) * 10
    eWrap.style.WebkitTransform = eWrap.style.transform = 'translate3d(' + iLoca + 'px, 0, 0)'
  }
}
</script>
<style lang='less' scoped>
  .wrap{
    position: absolute;
    left:0;
    top:0;
    height: 100%;
    background-color: #f1f1f1;
    overflow: hidden;
  }
  .wrapPaniagation{
    position: absolute;
    width: 100%;
    height: 20/75rem;
    top: 75%;
    left:0;
  }
  .swipecontainer{
    width: auto;
    height: 100%;
    overflow: hidden;
  }
</style>