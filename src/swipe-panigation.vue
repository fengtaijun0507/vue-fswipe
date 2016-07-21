<template>
<div class="panigation clearfix">
  <ul>
	  <li v-for="style in styles" v-bind:class="style" track-by="$index">
	  </li>
  </ul>
</div>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
      default: 3
    },
    curIndex: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      styles: ['solid']
    }
  },
  methods: {
    reAssign: function () {
      for (let i = 1; i < this.styles.length + 1; i++) {
        if (i == this.curIndex) {
          this.styles.$set(i - 1, 'solid')
          continue
        }
        this.styles.$set(i - 1, 'empty')
      }
    },
    initStyles: function () {
      for (let i = 0; i < this.index - 1; i++) {
        this.styles.push('empty')
      }
    }
  },
  watch: {
    curIndex: function () {
      this.reAssign()
    }
  },
  created () {
    this.initStyles()
  }
}
</script>
<style lang='less' scoped>
.panigation{position: absolute;width: auto;height:100%;left:50%;top:0;transform:translate3d(-50%, 0, 0);}
.panigation li{float:left;height:10/75rem;width:10/75rem;margin-left:20/75rem;border-radius: 10/75rem;}
.panigation li:nth-of-type(1){margin-left:0;}
.solid{background-color: #00AFE9;border:5/75rem solid #00AFE9;}
.empty{background-color: #cccccc;border:5/75rem solid #cccccc;}
</style>