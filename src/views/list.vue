<template lang="jade">
  div.page(v-if="!$loadingRouteData", transition="fade")
    header-bar(left="back", :title="title", right="search")
    //- list(:lists="movieLists")
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
            span(v-for="cast of item.casts") {{ cast.name }}
    div.ui-loading-wrap
      p.ui-txt-info {{ more ? '加载中' : '没有更多了'}}
      i.ui-loading(v-show="more")
  loading(:show="$loadingRouteData")
</template>

<script>
  import HeaderBar from '../components/HeaderBar.vue'
  import Loading from '../components/Loading.vue'
  import Star from '../components/Star.vue'
  // import List from '../components/List.vue'

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
        window.addEventListener('scroll', this.scroll)
      },
      deactivate (transition) {
        window.removeEventListener('scroll', this.scroll)
        transition.next()
      }
    },
    methods: {
      scroll (event) {
        if (!this.$loadingRouteData) {
          let scrollBottom = document.body.scrollHeight - window.screen.height - document.body.scrollTop <= 0
          if (scrollBottom && !this.load) {
            this.load = true
            this.getMoviesData()
          }
        }
      },
      getMoviesData () {
        // 如果已请求过首页数据则直接从sessionStorage中取出movieLists数据
        // 避免多次重复请求
        if (sessionStorage['MovieApp_' + this.type]) {
          this.movieLists = JSON.parse(sessionStorage['MovieApp_' + this.type])
          this.$loadingRouteData = false
          if (this.total <= this.movieLists.length) {
            this.more = false
            this.load = false
            return
          }
        }

        this.$http.jsonp('http://api.douban.com/v2/movie/' + this.type, {
          count: this.count,
          start: (this.page - 1) * this.count
        }).then((response) => {
          if (this.page === 1) {
            this.title = response.data.title.split('-')[0]
            this.total = response.data.total
            this.$loadingRouteData = false
          }
          if (response.data && response.data.subjects.length) {
            this.page ++
            this.movieLists = this.movieLists.concat(response.data.subjects)
          } else {
            this.more = false
          }
          sessionStorage['MovieApp_' + this.type] = JSON.stringify(this.movieLists)
          this.load = false
        })
      }
    },
    components: {
      HeaderBar,
      Loading,
      Star
      // List
    }
  }
</script>
