const vueFswipe = VueFswipe.Swipe;

new Vue({
  el: 'body',
  components: {
    'swipe': vueFswipe,
  },
  data () {
    return {
      imgData: {
        count: 3,
        imgArray: [{src: '', href: 'https://segmentfault.com'}, {src: '', href: 'http://stackoverflow.com'}, {src: '', href: 'https://www.baidu.com'}]
      }
    }
  }
});
