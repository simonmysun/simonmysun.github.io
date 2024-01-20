
var mainDom = document.getElementById('main');

var decorate = function (oldDom, newHTML) {
    oldDom.innerHTML = newHTML;
    oldDom.className = 'remarkdown h1-underline ul-star em-star strong-star a-showurl code-tick pre-tick';
    oldDom.style.whiteSpace = '';
    oldDom.style.fontFamily = '';
    oldDom.style.maxWidth = '';
    oldDom.style.margin = '';
};

var loadJs = function (url, callback) {
    var script = document.createElement('script')
    script.type = 'text/javascript';
    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' ||
                script.readyState == 'complete') {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};

var loadCSS = function (url) {
    var styleEl = document.createElement('link');
    styleEl.href = url;
    styleEl.type = 'text/css';
    styleEl.rel = "stylesheet"
    document.head.append(styleEl);
};

MathJax = {
    tex: {
        inlineMath: [
            ['$', '$'],
            ['\\(', '\\)']
        ],
        displayMath: [
            ['$$', '$$'],
            ['\\[', '\\]']
        ]
    }
};

loadJs('/assets/marked.min.js', function () {
    decorate(mainDom, marked(mainDom.innerText.replace(/&gt;+/g, '>')));
    loadJs('/assets/highlight.min.js', function () {
        hljs.highlightAll();
    });
});
loadJs('/assets/mathjax/tex-mml-svg.js', function () { });

loadCSS('/assets/remarkdown.css');
loadCSS('/assets/hljs-grayscale.css');
loadCSS('/styles.css');