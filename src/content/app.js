import Vue from 'vue'
import '../scss/main.scss';
import App from './App.vue'



import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload, faGlasses, faMousePointer, faObjectGroup, faTrashAlt, faBox, faTimes, faTable, faFileExport, faCog} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUpload);
library.add(faGlasses);
library.add(faMousePointer);
library.add(faTrashAlt);
library.add(faBox);
library.add(faTimes);
library.add(faTable);
library.add(faObjectGroup)
library.add(faFileExport)
library.add(faCog);

Vue.component('font-awesome-icon', FontAwesomeIcon)

import UUID from 'vue-uuid';
Vue.use(UUID);

import store from '../store';


function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function(){
    let vm = null;
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if (request.action == "disconnect_debugger") {
            if(vm != null){
              vm.$children[0].toggleSelector();
              sendResponse({ack: "debugger disconnected"});
            }
            
          }
          if (request.action == "newParser") {
            if(vm != null){
              alert("Only one parser is displayed at a time.")
            }
            else {
              const child = document.querySelector('body').firstChild
              const anchor = document.createElement('DIV')
              document.querySelector('body').insertBefore(anchor, child);
          
              vm = new Vue({
                  el: anchor,
                  store,
                  beforeCreate() {
                    this.$store.commit('setParser', request.parser);
                  },
                  render: h => h(App)
              })
              
            }
            sendResponse({ack: "success"});

          }

          else if(request.action == "setActiveParser"){
            if(vm != null){
              alert("Only one parser is allowed at a time.")
            }
            else {

              const child = document.querySelector('body').firstChild
              const anchor = document.createElement('DIV')
              document.querySelector('body').insertBefore(anchor, child);
          
              vm = new Vue({
                  el: anchor,
                  store,
                  beforeCreate() {
                  },
                  render: h => h(App),
              })
              //vm.$children[0].initFromParser();
            }

            sendResponse({ack: "parser loaded"});

          }

        }
      );

  });

