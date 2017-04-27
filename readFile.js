var fs = require('fs');
fs.readFile('./resource.json','utf8',function(er,data) {
  console.log(data);
})
