<template lang="jade">
  header.ui-header.ui-header-positive.ui-border-b.header
    button.btn.back.left(v-if="left == 'back'", @click="back")
      i.ui-icon-return
    button.btn.menu.left(v-if="left == 'menu'", @click="menu")
      i
      i
      i
    button.btn.search.right(v-link="{name: 'search'}")
      i.ui-icon-search
    h1 {{ title }}
</template>

<script>
  export default {
    name: 'HeaderBar',
    props: {
      left: String,
      title: String,
      right: String
    },
    data () {
      return {
        isSlide: false
      }
    },
    methods: {
      // 回退事件
      back () {
        history.back()
      },
      // 顶部左侧菜单栏事件，当点击菜单选项时将isSlide通过nav-slide事件冒泡到父组件
      menu () {
        this.isSlide = !this.isSlide
        this.$dispatch('nav-slide', this.isSlide)
      }
    }
  }
</script>

<style lang="sass">
  // 顶部导航条样式
	.header {
		.btn {
			position: absolute;
			top: 0px;
			height: 45px;
			width: 45px;
		}

		.left {
			left: 0px;
		}

		.right {
			right: 0px;
		}

		.back {
			i {
				top: 1px;
			}
		}

		.search {
			right: 4px;

			i {
				font-size: 54px;
			}
		}

		.menu {
			i {
				width: 20px;
				height: 2px;
				display: block;
				background: #fff;
				margin: 5px 10px;
			}
		}
	}
  // 顶部侧边栏样式
  .navdrawer {
    background: #1e1e1e;
    position: fixed;
    top: 0;
    left: 0;
    right: 20%;
    color: #fff;
    height: 100%;
    // 侧边栏标题样式
    .navdrawer-header {
      height: 44px;
      line-heigth: 44px;
      border-bottom: 1px solid #1f1f1f;
      // 侧边栏左侧标题样式
      h2 {
        font-size: 25px;
        padding: 5px 15px;
        float: left;
      }
      // 侧边栏右侧三小图标样式
      li {
        float: right;
        padding: 0 5px;
        a {
          color: #fff;
        }
      }
    }
    // 侧边栏搜索框样式
    .ui-searchbar-wrap {
      background: #1e1e1e;
      width: 80%;
    }

    .ui-searchbar {
      background: #5f5f5f;
      color: #fff;
    }
    // 侧边栏内容样式
    .navdrawer-content {
      h3 {
        background: #3b3b3b;
        color: #919191;
        padding: 5px 15px;
        font-size: 15px;
        line-height: 13px;
        margin-top: 10px;
      }

      ul {
        list-style: none;

        li {
          padding: 2px;

          a {
            overflow: hidden;
            padding: 13px 15px 13px 0;
            display: block;
            color: #fff;
            font-size: 17px;
            margin-left: 15px;
            border-bottom: 1px solid #282828;
          }
        }
      }
    }
  }
</style>
