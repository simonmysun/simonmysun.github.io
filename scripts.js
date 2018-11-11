var remarkdownCss = document.createElement('link');
remarkdownCss.href = '/assets/remarkdown.css';
remarkdownCss.type = 'text/css';
remarkdownCss.rel = "stylesheet"
document.head.append(remarkdownCss);

var customCss = document.createElement('link');
customCss.href = '/styles.css';
customCss.type = 'text/css';
customCss.rel = 'stylesheet'
document.head.append(customCss);

var mainDom = document.getElementById('main');

var decorate = function(oldDom, newHTML) {
    oldDom.innerHTML = newHTML;
    oldDom.className = 'remarkdown h1-underline ul-star em-star strong-star a-showurl code-tick pre-tick';
    oldDom.style.whiteSpace = '';
    oldDom.style.maxWidth = '';
    oldDom.style.margin = '';
};


if(window.SharedWorker) {
    var renderer = new SharedWorker('/worker.js');
    renderer.port.onmessage = function(e) {
        decorate(mainDom, e.data)
    };
    renderer.port.postMessage(mainDom.innerHTML.replace(/&gt;+/g, '>'));
} else {
    (function(url, callback){
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
    })('/assets/marked.min.js', function() {
        decorate(mainDom, marked(mainDom.innerHTML.replace(/&gt;+/g, '>')));
    });
}
