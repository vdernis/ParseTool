<script type = "text/javascript" >

export default {
	props:['parsers'],
	methods: {
		load: async function (parserId) {
			// `this` inside methods points to the Vue instance
			await this.$store.dispatch('setActiveParser', parserId);
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, { action:"setActiveParser", parserId: parserId }, function(response){
				});
			});
		},
		deleteParser: function(parserId){
			this.$emit("delete", parserId);
		}
  },
};
</script>

<template>
	<div>
		<div class="pt-popup__item" v-for="parser in parsers" v-bind:key="parser.id">
        		<div class="pt-popup__title">
        			<a @click="load(parser.id)">{{ parser.name }}</a>
        		</div>
        		<div class="pt-popup__menu">
        			<div class="pt-popup__action-menu">
        				<div class="pt-popup__action">
							<font-awesome-icon icon="trash-alt" @click="deleteParser(parser.id)" />
        				</div>
        			</div>
        		</div>
        	</div>
	</div>

</template>


<style>
</style>