//executed as soon as chrome is installed/refreshed
console.log("from background")
chrome.tabs.onActivated.addListener(tab => {
    //console.log(tab)
    chrome.tabs.get(tab.tabId, current_tab_info => {
        console.log(current_tab_info.url)
    });
});
//chrome.tabs.executeScript(null, {file: "./foreground.js"}, () => console.log("i injected")) // tab id you want to inject script into