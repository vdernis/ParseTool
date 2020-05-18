<script>
import { uuid } from 'vue-uuid';
import { hasClass, addClass, removeClass, isInternal, isSelectable } from './utils/class';
import { cssPath } from './utils/selector';
import { getDataList } from './utils/queries';
import { mapGetters, mapState } from 'vuex'
import * as types from '../store/mutation-types';

import ParserList from './components/ParserList.vue';
import DataModal from './components/DataModal.vue';
import ExportModal from './components/ExportModal.vue';

export default {
  name: 'app',
	components: {
		ParserList,
		DataModal,
		ExportModal,
  	},
  data(){
  	return {
		dragStyle: false,
		selectorState:"off",
		isDataModalVisible: false,
		isExportModalVisible: false,
		isToolbarOn:false,
  	}
  },

  computed: {
	  ...mapState(['columns']),
	  ...mapGetters(['activeParser', 'columnSet', 'columnInfoSet'])  
  },
  
  methods: {
		
		startDrag(e) {
				e = e || window.event;
				e.preventDefault();
				this.pos3 = e.clientX;
				this.pos4 = e.clientY;
				document.onmouseup = this.stopDrag;
				document.onmousemove = this.doDrag;
		},
		stopDrag() {
				document.onmouseup = null;
				document.onmousemove = null;
		},
		doDrag(e) {
				e = e || window.event;
				e.preventDefault();

				this.pos1 = this.pos3 - e.clientX;
				this.pos2 = this.pos4 - e.clientY;
				this.pos3 = e.clientX;
				this.pos4 = e.clientY;
				this.dragStyle = {top: (this.el.offsetTop - this.pos2) + "px", left: (this.el.offsetLeft - this.pos1) + "px"}
			},

		//selector functions
		toggleSelector(){
			if(this.selectorState == "off"){
				this.selectorState = "on";
				chrome.runtime.sendMessage({"message": "turnOn"});
				this.enableSelector()
			}
			else {
				this.selectorState = "off";
				chrome.runtime.sendMessage({"message": "turnOff"});
				this.disableSelector()
			}
			
		},
		enableSelector(){
			

			document.onmouseover= (e) => {

				var e = e || window.event, el = e.target || el.srcElement;
				if(isSelectable(el)){
					var path = cssPath(el, 3);
					if(!(path.indexOf("pt-") > -1)){
						this.selectedPath = path;
						chrome.runtime.sendMessage({"message": "highlight", "selector": path});
						el.addEventListener('click', this.onSelectorClick);
					}
				}
			};

			document.onmouseout= (e) => {
					var e = e || window.event, el = e.target || el.srcElement;
					this.selectedPath = null;
					el.removeEventListener('click', this.onSelectorClick);


			};
		},
		disableSelector(){
			document.onmouseover = null;
			document.onmouseout = null;
		},
		async onSelectorClick(e){
			var e = e || window.event, el = e.target || el.srcElement;
			
			e.preventDefault();
			e.stopPropagation();

			let dataList = getDataList(document, this.selectedPath);
			let title = dataList[0].id || dataList[0].className || dataList[0].title || `Column ${dataList.length}`;
			let payload = {"id":uuid.v1(), "data":dataList, "title":title, "path":this.selectedPath, "parserId": this.activeParser.id}
			await this.$store.dispatch('createColumn', payload);
			
		},

		showDataModal() {
			this.isDataModalVisible = true;
		},
		closeDataModal() {
			this.isDataModalVisible = false;
		},
		showExportModal() {
			this.isExportModalVisible = true;
		},
		closeExportModal() {
			this.isExportModalVisible = false;
		},
		exportData(e){
			if(this.$store.getters.columns.length == 0){
				e.preventDefault();
				e.stopPropagation();
				return false;
			}			
			var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.$store.getters.columns));
			var downloadAnchorNode = document.createElement('a');
			downloadAnchorNode.setAttribute("href",     dataStr);
			downloadAnchorNode.setAttribute("download", "export.json");
			document.body.appendChild(downloadAnchorNode); // required for firefox
			downloadAnchorNode.click();
			downloadAnchorNode.remove();

		},
	},
	created(){
		self = this;
		
		this.columnInfoSet.forEach(async function(col){
			let dataList = getDataList(document, col.path);
			let column = {"id":col.id, "dataList":dataList, "title":col.title, "path":col.path}
			await self.$store.dispatch('updateColumnData', {columnId: col.id, data: dataList});
		});
		this.isToolbarOn=true;
	},
	mounted(){

		this.unsubscribe = this.$store.subscribe((mutation, state) => {
		});


		this.pos1 = 0
		this.pos2 = 0
		this.pos3 = 0
		this.pos4 = 0
		this.el = document.getElementsByClassName("pt-toolbar")[0]
		window.addEventListener('mouseup', this.stopDrag);
		this.selectedPath = null;
	},
    beforeDestroy() {
    	this.unsubscribe();
  	},
}
</script>

<template>
	<div id="app" class="pt-toolbar" :style="dragStyle" v-if="isToolbarOn">
		<div class="pt-toolbar__header" @mousedown="startDrag">
			<div class="pt-toolbar__logo">
				{{ this.activeParser.name }}
			</div>
			<div class="pt-toolbar__actions">
				<div class="pt-btn pt-btn--primary" @click="toggleSelector" :class="(selectorState === 'on') ? 'pt-btn--selected':'pt-btn--primary'">
					<font-awesome-icon icon="mouse-pointer" />
				</div>
				<div class="pt-btn pt-btn--primary" @click="showDataModal">
					<font-awesome-icon icon="table" />
				</div>
				<div class="pt-btn pt-btn--primary" @click="showExportModal">
					<font-awesome-icon icon="file-export" />
				</div>
			</div>
		</div>
		
		<parser-list :columns='columnSet' />
		<data-modal v-if="isDataModalVisible" @close="closeDataModal" />
		<export-modal v-if="isExportModalVisible" @close="closeExportModal" />

    </div>
</template>