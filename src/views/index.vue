<template lang="jade">
  div.page(v-if="!$loadingRouteData", transition="fade")
    div.wrapper(:class="{'nav-slide' : isSlide}")
      header-bar(:title="title", left="menu", right="search", @nav-slide="handleNavSlide")
      section.ui-panel(v-for="dataitem of resData | orderBy 'index'")
        h2.ui-arrowlink(v-link="{name:'list', params: {type: dataitem.name}}") {{ dataitem.title }}
          span.ui-panel-subtitle {{ dataitem.total }}个
        ul.ui-grid-trisect
          li(v-for="item of dataitem.list", v-link="{name: 'show', params:{id: item.id}}")
            div.ui-grid-trisect-img(v-if = "dataitem.title === '豆瓣电影北美票房榜'")
              img(:src="item.subject.images.large", :alt="item.subject.title")
              p.ui-nowrap {{ item.subject.title }}
            div.ui-grid-trisect-img(v-else)
              img(:src="item.images.large", :alt="item.title")
              p.ui-nowrap {{ item.title }}
  nav.navdrawer(v-show="navHidden")
    article
      header.navdrawer-header
        h2 豆瓣
        ul
          li: a(href="javascript:;").ui-icon-personal
          li: a(href="javascript:;").ui-icon-add-group
          li: a(href="javascript:;").ui-icon-comment
      div.ui-searchbar-wrap.ui-border-b.focus
        div.ui-searchbar.ui-border-radius
          i.ui-icon-search
          div.ui-searchbar-input
            input(type="text", placeholder="请输入关键字", v-link="{name: 'search'}")
      div.navdrawer-content
        h3 电影
        ul
          li: a 电影首页
          li: a 正在上映
          li: a 即将上映
          li: a Top250
          li: a 使用反馈
          li: a 退出登录
  loading(:show="$loadingRouteData")
</template>

<script>
import HeaderBar from '../components/HeaderBar.vue'
import Loading from '../components/Loading.vue'

export default {
  data () {
    return {
      title: '电影',
      resData: [],
      hotwords: [],
      isSlide: false,
      navHidden: false
    }
  },
  route: {
    data (transition) {
      // 如果已请求过首页数据则直接从sessionStorage中取出resData数据
      // 避免多次重复请求
      if (sessionStorage.resData) {
        this.resData = JSON.parse(sessionStorage.resData)
        this.$loadingRouteData = false
        return
      }
      // 正在热映、即将上映、Top250、北美票房榜
      const ResourcesURI = ['in_theaters', 'coming_soon', 'top250']
      // 数据请求
      ResourcesURI.forEach((item, index) => {
        this.$http.jsonp('http://api.douban.com/v2/movie/' + item, {count: 6}).then((response) => {
          // 存储搜索结果
          this.resData.push({
            index: index,                      // 循环显示时通过orderBy该字段按顺序显示
            name: item,
            title: response.data.title.split('-')[0],
            total: response.data.total,
            list: response.data.subjects
          })

          // 将每个分类下对应电影的标题存储到搜索栏中做为搜索提示热词
          response.data.subjects.forEach((item) => {
            this.hotwords.push({
              title: item.title,
              id: item.id
            })
          })
          // 如果数据全部请求返回完毕则将首页数据及搜索热词存储到sessionStorage中
          // 去掉加载动画
          if (this.resData.length === ResourcesURI.length) {
            sessionStorage.resData = JSON.stringify(this.resData)
            sessionStorage.hotwords = JSON.stringify(this.hotwords)
            this.$loadingRouteData = false
          }
        })
      })
    }
  },
  watch: {
    'isSlide': 'delaySlide'
  },
  methods: {
    delaySlide () {
      if (!this.isSlide) {
        window.setTimeout(() => {
          this.navHidden = this.isSlide
        }, 500)
      } else {
        this.navHidden = this.isSlide
      }
    },
    handleNavSlide (isSlide) {
      this.isSlide = isSlide
    }
  },
  components: {
    HeaderBar,
    Loading
  }
}
</script>

<style lang="sass" scoped>
  .wrapper {
    background: #f8f8f8;
    position: relative;
    z-index: 1000;
    transition: all 0.2s linear;
    padding-top: 44px;
    margin-top: -44px;
  }

	.ui-panel {
		padding-bottom: 5px;

		.ui-grid-trisect {
			li {
				position: relative;

				p {
					position: absolute;
					bottom: 0px;
					height: 30px;
					line-height: 30px;
					color: #fff;
					width: 100%;
					text-align: center;
					font-size: 14px;
					background: rgba(0,0,0,0.6);
					padding:0px 5px;
				}
			}
		}
	}

  .nav-slide {
    transform: translateX(80%);
  }

</style>
