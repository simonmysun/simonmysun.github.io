importScripts('/assets/marked.min.js');

onconnect = function(e) {
  var port = e.ports[0];
  port.onmessage = function(e) {
    port.postMessage(marked(e.data));
  };
};

