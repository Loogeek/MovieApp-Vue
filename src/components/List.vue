<template lang="jade">
  ul.ui-list.ui-list-link.ui-border-tb.list-one
    //- each list in lists
    //-   - var item = list.subtype === 'movie' ? list : list.subject
    li.ui-border-t(v-for="list of lists", v-link="{name: 'show', params: {id: list.id}}", track-by="id")
      div.ui-list-img
        img(:src="list.images.medium", alt="list.title")
      div.ui-list-info
        h4.ui-nowrap {{ list.title }}
        p.ui-nowrap
          star(:score="list.rating.average")
        p.ui-nowrap {{ list.genres.join(' ') }}
        p.ui-nowrap
          span(v-for="cast of list.casts") {{ cast.name }}
  //- ul.ui-list.ui-list-link.ui-border-tb.list-one
  //-   li.ui-border-t(v-for="work in works", v-link="{name: 'show', params: {id: work.subject.id}}", track-by="subject.id")
  //-     div.ui-list-img
  //-       img(:src="work.subject.images.medium", alt="work.subject.title")
  //-     div.ui-list-info
  //-       h4.ui-nowrap [{{ work.roles }}] {{ work.subject.title }}
  //-       p.ui-nowrap
  //-         star(:score="work.subject.rating.average")
  //-       p.ui-nowrap {{ work.subject.genres.join(' ') }}
  //-       p.ui-nowrap
  //-         span(v-for="cast in work.subject.casts") {{ cast.name }}
</template>

<script>
  import Star from '../components/Star.vue'

  export default {
    name: 'List',
    props: {
      lists: Array
    },
    components: {
      Star
    }
  }
</script>
