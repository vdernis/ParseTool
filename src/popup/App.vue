<script>
export default {
  name: 'app',
  data() {
    return {
      isLoaded: false
    }
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'vweReplaceState') {
        this.isLoaded = true;
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
}
</script>

<template>
	<div id="app" v-if="isLoaded">
		<router-view></router-view>
  </div>
</template>


