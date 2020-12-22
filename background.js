//executed as soon as chrome is installed/refreshed
console.log("from background")
let active_tab_id = 0;
chrome.tabs.onActivated.addListener(tab => {
    //console.log(tab)
    chrome.tabs.get(tab.tabId, current_tab_info => {
          active_tab_id = tab.tabId;
          if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
            chrome.tabs.insertCSS(null, {file: "./mystyles.css"});
            chrome.tabs.executeScript(null, {file: "./foreground.js"}, () => console.log("i injected")) // tab id you want to inject script into
          }
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message == 'yo check the storage') {
    chrome.tabs.sendMessage(active_tab_id, {message: 'yo i got your message'});
    //sendResponse({message: 'yo I got your message'});
    chrome.storage.local.get("password", value=> {
      console.log(value);
    })
  }
})
