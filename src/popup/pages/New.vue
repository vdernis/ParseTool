<script>
import { uuid } from 'vue-uuid';
export default {
  name: 'new',
  props:["parsers"],
  methods: {
    create: async function (event) {
      // `this` inside methods points to the Vue instance
      self = this
      if(self.name == ''){
        alert("Please enter a name for the parser");
        return false;
      }
      if(self.url == ''){
          alert("Please enter a url for the parser");
          return false;
      }

      let payload = {
          "id":uuid.v1(), "name":self.name, "url":self.url, 
          "useRegex":self.useRegex, "autoUpload":false, 
          "autoParse":false }

      this.$store.dispatch('createParser', payload)
  
    
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "setActiveParser", parserId: payload.id}, function(response){
              self.$router.push('/')
          });
      });

    },
  },
  mounted(){
    self=this
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      self.url = tabs[0].url;
    });
  },
  data: function() {
    return {
      name: "",
      url: "",
      useRegex: false,
    }
  }
  
}

</script>

<template>
        <div class="pt-popup">
        <div class="pt-popup__nav">
        	<router-link to="/">Back</router-link>
        </div>

  <label for="name">Name</label>
  <input type="text" id="name" name="name" v-model="name">

  <label for="url">URL</label>
  <input type="text" id="url" name="url" placeholder="url" v-model="url">
  <br />
  <input type="checkbox" id="regex" v-model="useRegex" /> Use Regex
  <br />
  <button type="submit" value="Submit" id="new_parser" v-on:click="create">Go</button>
        </div>
</template>


