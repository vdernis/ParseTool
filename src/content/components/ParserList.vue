<script type = "text/javascript" >
import { mapGetters } from 'vuex'
import ColumnModal from './ColumnModal.vue';
export default {
	components:{
		ColumnModal
	},
	data() {
		return {
			selectedColumn:false,
			isModalVisible:false,

		}
	},
	mounted() {
	},
	methods: {
		onChangeName: function (event, columnId) {
			let title = event.target.value;
			this.$store.commit('updateColumnTitle', { columnId, title });
			//<input type="text" v-bind:value="column.title" v-on:input="onChangeName($event, column.id)" />
		},
		showModal(column) {
			this.selectedColumn = column;
			this.isModalVisible = true;
			
		  },
      	closeModal() {
			this.selectedColumn = false;
			this.isModalVisible = false;
		  },
	},
	computed: {
      ...mapGetters(['columnData'])
    },
	props:['columns'],
};
</script>

<template>
	<div class="pt-list">
			<div class="pt-list__item" v-for="column in columns" v-bind:key="column.id">
				<div class="pt-list__count">

					{{ columnData[column.info.id].length }}
				</div>
				<div class="pt-list__name">
					{{ column.info.title }}
				</div>
				<font-awesome-icon icon="cog" @click="showModal(column)" />
				<font-awesome-icon icon="trash-alt" @click="$store.dispatch('deleteColumn', column)" />
			</div>
			<column-modal v-if="selectedColumn" @close="closeModal" v-bind:column="selectedColumn" />
	</div>

</template>

<style>
</style>