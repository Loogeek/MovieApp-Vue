<template lang="jade">
  div.page(v-if="!$loadingRouteData", transition="fade")
    header-bar(:title="title", left="back")
    div.banner
      div.blur(:style="{backgroundImage: 'url('+ image +')'}")
      div.info
        div.img
          img(:src="image", :alt="title")
        div.txt
          h1.ui-nowrap {{ title }}
          p.ui-nowrap 性别: {{ gender }}
          p.ui-nowrap 地区: {{ born_place }}
    section.ui-panel.summary
      h2
        a 作品
        span.ui-panel-subtitle {{ works.length }} 个
      //- list(:lists="works")
      ul.ui-list.ui-list-link.ui-border-tb.list-one
        li.ui-border-t(v-for="work of works", v-link="{name: 'show', params: {id: work.subject.id}}", track-by="subject.id")
          div.ui-list-img
            img(:src="work.subject.images.medium", alt="work.subject.title")
          div.ui-list-info
            h4.ui-nowrap [{{ work.roles }}] {{ work.subject.title }}
            p.ui-nowrap
              star(:score="work.subject.rating.average")
            p.ui-nowrap {{ work.subject.genres.join(' ') }}
            p.ui-nowrap
              span(v-for="cast of work.subject.casts") {{ cast.name }}
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
        title: '导演',
        image: '',
        gender: '',
        born_place: '',
        works: []
      }
    },
    route: {
      data (transition) {
        this.$http.jsonp('http://api.douban.com/v2/movie/celebrity/' + transition.to.params.id).then((response) => {
          this.title = response.data.name
          this.image = response.data.avatars.large
          this.gender = response.data.gender
          this.born_place = response.data.born_place
          this.works = response.data.works
          this.$loadingRouteData = false
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

<style lang="sass" scoped>
	.ui-panel {
		.ui-panel-subtitle {
			right: 10px;
		}
	}
</style>
