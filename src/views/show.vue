<template lang="jade">
  div.page(v-if="!$loadingRouteData", transition="fade")
    header-bar(:title="title", left="back", right="search")
    div.banner
      div.blur(:style="{backgroundImage: 'url('+ image +')'}")
      div.info
        div.img
          img(:src="image", :alt="title")
        div.txt
          h1.ui-nowrap {{ title }}
          p.ui-nowrap
            star(:score="score", size="large")
          p.ui-nowrap 类型: {{ genres.join(' ') }}
          p.ui-nowrap 主演: {{ genres.join(' ') }}
            span(v-for="cast of casts") {{cast.name }}
          p.ui-nowrap 地区: {{ countries.join(' ') }}
    section.ui-panel.summary
      h2
        a 剧情简介
        span.ui-panel-subtitle
      div.ui-whitespace.ui-txt-justify.ui-txt-sub.ui-txt-info {{ summary }}
    section.ui-panel.directors
      h2.ui-arrowlink
        a 导演
        span.ui-panel-subtitle
      div.ui-row.ui-whitespace
        div.ui-col.ui-col-33(v-for="director of directors", v-link="{name: 'director', params: {id: director.id}}")
          img(:src="director.avatars ? director.avatars.large : ''")
          h5.ui-nowrap.ui-arrow {{ director.name }}
            a (查看)
  loading(:show="$loadingRouteData")
</template>

<script>
  import HeaderBar from '../components/HeaderBar.vue'
  import Loading from '../components/Loading.vue'
  import Star from '../components/Star.vue'

  export default {
    data () {
      return {
        title: '电影详情',
        image: '',
        genres: [],
        casts: [],
        score: 0,
        countries: [],
        summary: '',
        directors: []
      }
    },
    route: {
      data (transition) {
        let params = transition.to.params

        this.$http.jsonp('http://api.douban.com/v2/movie/subject/' + params.id).then((response) => {
          this.title = response.data.title
          this.image = response.data.images.large
          this.genres = response.data.genres
          this.casts = response.data.casts
          this.score = response.data.rating.average
          this.countries = response.data.countries
          this.summary = response.data.summary
          this.directors = response.data.directors
          this.$loadingRouteData = false
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

<style lang="sass" scoped>
	.summary {
		padding-bottom: 10px;
	}

	.directors {
		padding-bottom: 10px;

		.ui-row {
			padding-left: 5px;
		}

		.ui-col {
			padding-left: 5px;
		}

		img {
			width: 100%;
		}
	}
</style>
