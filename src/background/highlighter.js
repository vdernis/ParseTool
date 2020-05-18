import TabDebugger from "./tab-debugger/tab-debugger";


let tabDebugger = null;
let rootNodeId = null;


const HIGHLIGHT_COLOR = {
    r: 155,
    g: 11,
    b: 239,
    a: 0.7
};

function disconnectFrontend(tabId){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "disconnect_debugger"}, function(response) {
      });
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "highlight" ) {
            if(rootNodeId != null){
                let selector = request.selector
                tabDebugger.sendCommand('DOM.querySelectorAll', {
                      nodeId: rootNodeId,
                      selector
                    }).then((data) => {
                        //when no results API returns nodeId === 0
                        if(!data.nodeIds) {
                            throw new Error('Node not found.');
                        }

                        data.nodeIds.forEach(function(nodeId,index) {
                            tabDebugger.sendCommand('DOM.highlightNode', {
                                highlightConfig: {
                                  contentColor: HIGHLIGHT_COLOR,
                                  showInfo: false
                                },
                                nodeId: nodeId,
                                selector:selector
                            })
                        })

                        return true;
                    }).catch(() => {
                      throw new Error('Node not found.');
                    });

            }
        }
        
        if (request.message === "turnOn"){
            
            tabDebugger = new TabDebugger(sender.tab.id);
            
            tabDebugger.onDisconnect.addListener(() => disconnectFrontend(sender.tab.id));

            tabDebugger.sendCommand('DOM.enable')
                .then(tabDebugger.sendCommand.bind(tabDebugger, 'CSS.enable'))
                .then(tabDebugger.sendCommand.bind(tabDebugger, 'DOM.getDocument'))
                .then((data) => {

                    if(!data.root) {
                        throw new Error('Document root not available.');
                    }

                    rootNodeId = data.root.nodeId;
                    
                });
        }

        if(request.message === "turnOff"){
            tabDebugger.disconnect();
        }
    }
);