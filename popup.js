
function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
      active: true,
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, (tabs) => {
      // chrome.tabs.query invokes the callback with a list of tabs that match the
      // query. When the popup is opened, there is certainly a window and at least
      // one tab, so we can safely assume that |tabs| is a non-empty array.
      // A window can only have one active tab at a time, so the array consists of
      // exactly one tab.
      var tab = tabs[0];
  
      // A tab is a plain object that provides information about the tab.
      // See https://developer.chrome.com/extensions/tabs#type-Tab
      var url = tab.url;
  
      // tab.url is only available if the "activeTab" permission is declared.
      // If you want to see the URL of other tabs (e.g. after removing active:true
      // from |queryInfo|), then the "tabs" permission is required to see their
      // "url" properties.
      console.assert(typeof url == 'string', 'tab.url should be a string');
  
      callback(url);
    });
}



  function on(){
    var chords = document.querySelector('.js-tab-content');
    if(!chords) return alert('cannot find content element');
    chords.setAttribute('style', 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999999999999; background: #fff; margin: 0; overflow: auto; padding: 20px;');
  }

  function off(){
    var chords = document.querySelector('.js-tab-content');
    if(!chords) return alert('cannot find content element');
    chords.setAttribute('style', '');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    
    getCurrentTabUrl((url) => {

        if(url.indexOf('https://tabs.ultimate-guitar.com/') === 0){
            chrome.tabs.executeScript({
                code: '(' + on.toString() + ')();'
            });

            var button = document.querySelector('#active');
            var buttonWrap = document.querySelector('#active-wrap');
            var onColor = '#05AC05';
            var offColor = '#AC1005';
            var state = {
                active: true
            };

            function toggle(){
                var active = !state.active;
                chrome.tabs.executeScript({
                    code: '(' + (active ? on : off).toString() + ')();'
                });
                button.style.right = (active ? '0px' : '20px');
                button.style.background = (active ? onColor : offColor);
                state.active = active;
            }

            buttonWrap.onclick = toggle;
            
        }


    });
  });