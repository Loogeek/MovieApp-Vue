<template lang="jade">
  div.page(v-if="!$loadingRouteData", transition="fade")
    header-bar(left="back", :title="title")
    ul.ui-list.ui-list-link.ui-border-tb.list-one
      li.ui-border-t(v-for="item of movieLists", v-link="{name: 'show', params: {id: item.id}}", track-by="$index")
        div.ui-list-img
          img(:src="item.images.medium", alt="item.title")
        div.ui-list-info
          h4.ui-nowrap {{ item.title }}
          p.ui-nowrap
            star(:score="item.rating.average")
          p.ui-nowrap {{ item.genres.join(' ') }}
          p.ui-nowrap
            span(v-for="cast of item.casts") {{ cast.name }}/
    div.ui-loading-wrap
      p.ui-txt-info {{ more ? '加载中' : '没有更多了'}}
      i.ui-loading(v-show="more")
  loading(:show="$loadingRouteData")
</template>

<script>
  import HeaderBar from '../components/HeaderBar.vue'
  import Loading from '../components/Loading.vue'
  import Star from '../components/Star.vue'

  export default {
    data () {
      return {
        title: '电影列表',
        movieLists: [],
        page: 1,
        count: 10,
        type: '',
        total: 0,
        more: true,
        load: false
      }
    },
    route: {
      data (transition) {
        this.type = transition.to.params.type
        this.getMoviesData()
        // 监听滚动事件
        window.addEventListener('scroll', this.scroll)
      },
      // 组件移除前删除监听的滚动事件
      deactivate (transition) {
        window.removeEventListener('scroll', this.scroll)
        transition.next()
      }
    },
    methods: {
      // 滚动事件
      // 如果数据已加载完毕，获取当前滚动距离，若已滚动到当前数据页面的底部，则
      // 获取数据并设置加载动画
      scroll () {
        if (!this.$loadingRouteData) {
          let scrollBottom = document.body.scrollHeight - window.screen.height - document.body.scrollTop <= 0
          if (scrollBottom && !this.load) {
            this.load = true
            this.getMoviesData()
          }
        }
      },
      getMoviesData () {
        // 第一次加载时将电影数据存储到sessionStorage中
        // 再次访问该页面数据则直接从sessionStorage中取出
        if (sessionStorage['MovieApp_' + this.type]) {
          this.movieLists = JSON.parse(sessionStorage['MovieApp_' + this.type])
          this.$loadingRouteData = false
          // 如果数据都请求完毕并保存早movieLists数组中，则取消加载动画并提示加载完成
          // 如果数据还未加载完则继续发送请求
          if (this.total <= this.movieLists.length) {
            this.more = false
            this.load = false
            return
          }
        }
        // 数据还未加载完成前执行下面请求操作
        this.$http.jsonp('http://api.douban.com/v2/movie/' + this.type, {
          count: this.count,
          start: (this.page - 1) * this.count
        }).then((response) => {
          // 如果是第一次访问该页面
          if (this.page === 1) {
            this.title = response.data.title.split('-')[0]
            this.total = response.data.total
            this.$loadingRouteData = false
          }
          // 返回数据不为空
          if (response.data && response.data.subjects.length) {
            this.page ++
            this.movieLists = this.movieLists.concat(response.data.subjects)
          // 全部数据请求完毕
          } else {
            this.more = false
          }
          // 将数据存储到对应电影分类的sessionStorage中
          sessionStorage['MovieApp_' + this.type] = JSON.stringify(this.movieLists)
          this.load = false
        })
      }
    },
    components: {
      HeaderBar,
      Loading,
      Star
    }
  }
</script>
