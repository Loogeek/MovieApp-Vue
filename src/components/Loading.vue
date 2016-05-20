<template lang="jade">
  div(:class="['ui-loading-block', 'show', near]", v-if="show")
    div.ui-loading-cnt
      i.ui-loading-bright
</template>

<script>
  export default {
    props: ['show', 'near']
  }
</script>

<style lang="sass" scoped>
	.ui-loading-block {

		&.top {
			.ui-loading-cnt {
				margin-top: -200px;
			}
		}

		.ui-loading-cnt {
			width: 57px;
			height: 57px;

		}

		.ui-loading-bright {
			margin: 10px;
		}
	}
</style>
