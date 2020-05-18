import { hasClass, addClass, removeClass} from './js/utils/class';
import { cssPath } from './js/utils/selector';
import { Toolbar } from './js/components/toolbar';

import './scss/main.scss';

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}



ready(function() {
    var list;
    let toolbar;

    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.action == "disconnect_debugger") {
          toolbar.onDisconnect();
          sendResponse({ack: "debugger disconnected"});
        }
        if (request.action == "new_parser") {
          alert("success!");
          sendResponse({ack: "new parser created"});
          toolbar = new Toolbar();
        }
      }
    );




})


