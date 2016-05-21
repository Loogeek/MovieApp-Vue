<template lang="jade">
  div.page(transition="fade")
    header.ui-header
      div.ui-searchbar-wrap.ui-border-b.focus
        div.ui-searchbar.ui-border-radius
          i.ui-icon-search
          div.ui-searchbar-input
            input(type="text", placeholder="请输入关键字", v-model="keywords", v-el:keywords, autocapitalize="off", debounce="500")
          i.ui-icon-close(v-if="keywords", @click="clear")
        button.ui-searchbar-cancel(@click="cancel") 取消
    div.hotwords(v-show="!suggests.length")
      h4 大家都在搜
      div.hot-search.ui-txt-info
        span.ui-label(v-for="hotword of hotwords", v-link="{name: 'show', params: {id: hotword.id}}", track-by="$index") {{ hotword.title }}
    div.suggest(v-show="suggests.length")
      ul.ui-list.ui-list-text.ui-list-link.ui-txt-info
        li.ui-border-b(v-for="suggest of suggests",transition="staggered", track-by="$index", v-link="{name: 'show', params: {id: suggest.id}}") {{ suggest.title }}
  loading(:show="loading", near="top")
</template>

<script>
  import Loading from '../components/Loading.vue'

	export default {
    data () {
      return {
        title: '搜索',
        keywords: '',
        hotwords: [],
        suggests: [],
        loading: false
      }
    },
    ready () {
      this.$els.keywords.focus()
    },
    route: {
      data () {
        // 将sessionStorage中存储的搜索热词取出
        this.hotwords = JSON.parse(sessionStorage.hotwords)
      }
    },
    watch: {
      keywords (val, oldVal) {
        if (val.trim()) {
          this.loading = true
          this.$http.jsonp('http://api.douban.com/v2/movie/search?q=' + val).then((response) => {
            this.suggests = response.data.subjects
            this.loading = false
          })
        } else {
          this.suggests = []
        }
      }
    },
    methods: {
      // 取消搜索
      cancel () {
        history.back()
      },
      // 清空输入框
      clear () {
        this.keywords = ''
        this.$els.keywords.focus()
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="sass" scoped>
	.ui-searchbar {
		margin-right: 0px;
		height: 34px;
		line-height: 34px;
	}

	.ui-searchbar-cancel {
		margin-right: 2px;
	}

	.hotwords {
	 	padding: 10px 0px;

	 	h4 {
	 		padding-left: 10px;
	 	}

	 	.hot-search {
	 		background: #fff;
	 		margin-top: 10px;
	 		padding: 0 10px 10px 0;

	 		.ui-label {
				font-size: 14px;
				margin: 10px 0 0 10px;
	 		}
	 	}
	}

	.suggest {
		position: absolute;
		top: 0px;
		left: 0px;
		height: 100vh;
		padding-top: 45px;
		width: 100%;

		.ui-list {
			li {
				padding-right: 10px;
				transition: all .4s ease;
		    overflow: hidden;
		    height: 40px;
		    padding: 0px;
		    line-height: 40px;
		    display: block;
			}
			.staggered-enter, .staggered-leave {
		    opacity: 0;
		    height: 0;
			}

			.staggered-leave {
				transition-duration: 0s;
			}
		}
	}
</style>
