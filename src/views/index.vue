<template lang="jade">
  div.page(v-if="!$loadingRouteData", transition="fade")
    div.wrapper(:class="{'nav-slide' : isSlide}")
      // 顶部左侧菜单栏事件，当点击菜单选项时header-bar组件将isSlide通
      // 过nav-slide事件冒泡到当前组件，并触发handleNavSlide事件
      header-bar(:title="title", left="menu", @nav-slide="handleNavSlide")
      // 首页显示的电影分类按index先后顺序，即正在上映、即将上映、Top250顺序排序显示
      section.ui-panel(v-for="dataitem of resData | orderBy 'index'")
        h2.ui-arrowlink(v-link="{name:'list', params: {type: dataitem.name}}") {{ dataitem.title }}
          span.ui-panel-subtitle {{ dataitem.total }}个
        ul.ui-grid-trisect
          li(v-for="item of dataitem.list", v-link="{name: 'show', params:{id: item.id}}")
            div.ui-grid-trisect-img
              img(:src="item.images.large", :alt="item.title")
              p.ui-nowrap {{ item.title }}
  // 左侧菜单栏，通过navHidden属性对其显示或隐藏
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
      isSlide: false,           // 获取子组件上传的菜单栏显示或隐藏状态
      navHidden: false          // 经过延迟处理后将isSlide赋值给navHidden属性
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
      // 正在热映、即将上映、Top250
      const ResourcesURI = ['in_theaters', 'coming_soon', 'top250']
      // 数据请求
      ResourcesURI.forEach((item, index) => {
        this.$http.jsonp('http://api.douban.com/v2/movie/' + item, {count: 6}).then((response) => {
          // 存储搜索结果
          this.resData.push({
            index: index,                      // 通过orderBy按请求顺序显示
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
  // 监控isSlide属性变化时执行delaySlide函数
  watch: {
    'isSlide': 'delaySlide'
  },
  methods: {
    delaySlide () {
      // 当点击隐藏菜单栏选项时经过500ms才隐藏左侧菜单栏
      if (!this.isSlide) {
        window.setTimeout(() => {
          this.navHidden = this.isSlide
        }, 500)
      } else {
        this.navHidden = this.isSlide
      }
    },
    // 处理子组件上传的菜单栏显示或隐藏状态
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
