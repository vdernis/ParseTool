<script>
import { mapGetters } from 'vuex';
import ParserList from '../components/ParserList.vue';


//import { store } from '../store/store'

export default {
	name: "Home",
  	components: {
		ParserList,
  	},

  	data() {
	    return {
			loading:false,
			matched: [],
			unmatched: []
	    };
	},

	methods: {
		deleteParser: function (parserId){
			let i = this.matched.findIndex(parser => parser.id == parserId)
			this.matched.splice(i, 1)
			i = this.unmatched.findIndex(parser => parser.id == parserId)
        	this.unmatched.splice(i, 1)
			this.$store.dispatch('deleteParser', parserId)
		}
	}, 
	created() {
		
		self = this;
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			self.parserSet.map(parser => {
				if(parser.useRegex){
					var re = new RegExp(parser.url,"g");
					if(re.test(tabs[0].url)){
						self.matched.push(parser);
					}
					else {
						self.unmatched.push(parser);
					}
				}
				else {
					if(parser.url == tabs[0].url){
						self.matched.push(parser);
					}
					else {
						self.unmatched.push(parser);
					}
				}
			})
		})
    },

	computed: {
		...mapGetters(['parserSet'])
	},
};

</script>


<template>
	<div class="pt-popup">
		<div class="pt-popup__item pt-popup__item--header">
        		Menu
        </div>
    	<div class="pt-popup__item">
    		<div class="pt-popup__title">
    			<router-link :to="{name: 'new'}">Create new</router-link>
    		</div>
    	</div>

		<template v-if="matched.length > 0">
			<div class="pt-popup__divider"></div>
			<div class="pt-popup__item pt-popup__item--header">
					Matched
			</div>
		</template>
    	
        <parser-list :parsers='matched' @delete="deleteParser"></parser-list>
    	<template v-if="unmatched.length > 0">
			<div class="pt-popup__divider"></div>
			<div class="pt-popup__item pt-popup__item--header">
					Unmatched
			</div>
		</template>
		<parser-list :parsers='unmatched' @delete="deleteParser"></parser-list>
		
	</div>
</template>


