var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var filesDir = './text';
var word_arr = [];

function checkIfComplete() {
  completedTasks++;
  if (completedTasks == tasks.length) {
    for (var index in wordCounts) {
      word_arr.push(wordCounts[index]);
    }
    var new_word_arr = word_arr.sort();
    console.log(new_word_arr);
  }
}

function countWordsInText(text) {
  var words = text
       .toString()
       .toLowerCase()
       .split(/\W+/)
       .sort();
  for (var index in words) {
    var word = words[index];
    if (word) {
      wordCounts[word] =
           (wordCounts[word]) ?wordCounts[word] + 1 : 1;
    }
  }
}
fs.readdir(filesDir, function (err,files) {
  if(err) throw err;
  for (var index in files) {
    var task = (function(file) {
      return function() {
        fs.readFile(file, function (err,text) {
          if(err) throw err;
          countWordsInText(text);
          checkIfComplete();
        });
      }
    })(filesDir + '/' + files[index]);
    tasks.push(task);
  }
  for (var task in tasks) {
    tasks[task]();
  }
});
