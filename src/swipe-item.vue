<template>
  <ul class="clearfix ulImg">
	  <li v-for="item in itemsAddTwo" track-by="$index" class="imgLi">
	  	<a href="javascript:void(0)" v-touch:tap="onTap(item.href)" v-touch-options:tap="{time: 250}"><img v-bind:src="item.src" ></a>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    },
    curIndex: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      itemsAddTwo: []
    }
  },
  methods: {
    addFroEnd: function () {
      if (this.items.length >= 1) {
        this.itemsAddTwo = this.itemsAddTwo.concat(this.items)
        this.itemsAddTwo.unshift(this.items[this.items.length - 1])
        this.itemsAddTwo.push(this.items[0])
      }
    },
    onTap: function (link) {
      window.location.assign(link)
    },
    prodRelativeColor: function () {
      let aColor = [];
      for (let i = 0; aColor.length < this.items.length; i++) {
        let tempColor = this.getRandomColor()
        if (aColor.indexOf(tempColor) == -1) {
          aColor.push(tempColor)
        }
      }
      aColor.unshift(aColor[this.items.length - 1])
      aColor.push(aColor[1])
      return aColor
    },
    getRandomColor: function () {
      return '#' + this.getRandomSixH('')
    },
    getRandomSixH: function (color) {
      return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) && (color.length == 6) ? color : this.getRandomSixH(color);
    }
  },
  created () {
    this.addFroEnd()
  },
  ready () {
    let aNode = document.querySelectorAll('.imgLi')
    let aImg = document.querySelectorAll('img')
    let aColor = this.prodRelativeColor();
    for (let i = 0; i < document.querySelectorAll('.imgLi').length; i++) {
      aNode[i].style.width = (1 / (this.items.length + 2)) * 100 + '%'
      if (!this.items[0].src) {
        aNode[i].style.backgroundColor = aColor[i]
        aImg[i].style.display = 'none'
      }
    }
  }
}
</script>
<style lang='less' scoped>
  .ulImg{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  ul li {
    height: 100%;
    float: left;
  }
  img{
    width: 100%;
    height: 100%;
  }
  .imgLi a{
     width: 100%;
     height: 100%;
     display: block;
  }
</style>