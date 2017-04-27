var http = require('http');
var items = [];

var server = http.createServer(function(req,res) {
  if ('/' == req.url) {
    switch (req.method) {
      case 'GET':
        show(res);
        break;
      case 'POST':
        add(req,res);
        break;
      default:
        badRequest(res);
    }
  } else {
    notFound(res);
  }
});

server.listen(3000);

function show(res) {
  var html = '<html><head><title>Todo List </title></head><body>'
             + '<h1>Todo List</h1>'
             + '<ul>'
             + items.map(function(item) {
               return '<li>' + item + '</li>'
             }).join('')
             + '</ul>'
             + '<form method="post" action='/'>'
             + '<p><input type="text" name="item" /></p>'
             + '<p><input type="submit" value="Add Item" /></p>'
             + '</form></body></html>';
  res.setHeader('Content-Type','text/html');
  res.setHeader('Content-Length',Buffer.byteLength(html));
  res.end(html);
}


function notFound(res) {
  res.statusCode = 404;
  res.setHeader('Content-Type','text/plain');
  res.end('Not Found');
}

function badRequest(res) {
  res.statusCode = 400;
  res.setHeader('Content-Type','text/plain');
  res.end('Bad Request');
}

function upload(req,res) {
  if (!isFormData(req)) {
    res.statusCode = 400;
    res.end('Bad Request: expecting multipart/form-data');
    return;
  }
  var form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files) {
    console.log(fields);
    console.log(files);
    res.end('upload complete!');
  });
}

function isFormData(req) {
  var type = req.headers['content-type'] || '';
  return 0 == type.indexOf('multipart/form-data');
}

var qs = require('querystring');
function add(req,res) {
  var body = '';
  req.setEncoding('utf8');
  req.on('data',function(chunk) {
    body += chunk;
  });
  req.on('end',function() {
    var obj = qs.parse(body);
    items.push(obj.item);
    show(res);
  });
}
