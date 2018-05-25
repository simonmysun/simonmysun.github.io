var remarkdownCss = document.createElement('link');
remarkdownCss.href = 'https://unpkg.com/remarkdown.css@3.0.0/dist/remarkdown.css';
remarkdownCss.type = 'text/css';
remarkdownCss.rel = "stylesheet"
document.head.append(remarkdownCss);

var customCss = document.createElement('link');
customCss.href = './styles.css';
customCss.type = 'text/css';
customCss.rel = 'stylesheet'
document.head.append(customCss);


var mainDom = document.getElementById('main');
if(window.SharedWorker) {
  var renderer = new SharedWorker('worker.js');
  renderer.port.onmessage = function(e) {
    mainDom.innerHTML = e.data;
    mainDom.className = 'remarkdown h1-underline ul-star em-star strong-star a-showurl code-tick pre-tick';
    mainDom.style.whiteSpace = '';
    mainDom.style.maxWidth = '';
    mainDom.style.margin = '';
  };
  renderer.port.postMessage(mainDom.innerHTML);
} else {
  var loadScript = function(url, callback){
    var script = document.createElement('script')
    script.type = 'text/javascript';
    if (script.readyState){  //IE
      script.onreadystatechange = function(){
        if (script.readyState == 'loaded' ||
            script.readyState == 'complete'){
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  //Others
      script.onload = function(){
        callback();
      };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js', function() {
    mainDom.innerHTML = marked(mainDom.innerHTML);
    mainDom.className = 'remarkdown h1-underline ul-star em-star strong-star a-showurl code-tick pre-tick';
    mainDom.style.whiteSpace = '';
    mainDom.style.maxWidth = '';
    mainDom.style.margin = '';
  })
}
