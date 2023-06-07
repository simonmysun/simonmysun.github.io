importScripts('/assets/marked.min.js');
importScripts('/assets/highlight.min.js');

onconnect = function(e) {
  var port = e.ports[0];
  port.onmessage = function(e) {
    port.postMessage(hljs.highlightAuto(marked(e.data)).value);
  };
};

