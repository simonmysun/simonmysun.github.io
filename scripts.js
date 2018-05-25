var remarkdownCss = document.createElement('link');
remarkdownCss.href = 'https://unpkg.com/remarkdown.css@3.0.0/dist/remarkdown.css';
remarkdownCss.type = 'text/css';
remarkdownCss.rel = "stylesheet"
document.head.append(remarkdownCss);

var customCss = document.createElement('link');
customCss.href = './styles.css';
customCss.type = 'text/css';
customCss.rel = "stylesheet"
document.head.append(customCss);


var renderer = new SharedWorker('worker.js');
var mainDom = document.getElementById('main');
renderer.port.onmessage = function(e) {
  mainDom.innerHTML = e.data;
  mainDom.className = 'remarkdown h1-underline ul-star em-star strong-star a-showurl code-tick pre-tick';
  mainDom.style.whiteSpace = '';
  mainDom.style.maxWidth = '';
  mainDom.style.margin = '';
};
renderer.port.postMessage(mainDom.innerHTML);
