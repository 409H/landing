const async = require('async')

/*

instruments async for sweet deets

*/

module.exports = {
  series: series,
  parallel: parallel,
}

function series(obj, cb){
  var newTasks = wrapTasks(obj)
  async.series(newTasks, cb)
}

function parallel(obj, cb){
  var newTasks = wrapTasks(obj)
  async.parallel(newTasks, cb)
}

function wrapTasks(obj){
  var newTasks = {}
  keyValuesFor(obj).map(function(task){
    var label = task.key
    var taskFn = task.value
    newTasks[label] = function(cb){
      onStart()
      taskFn(function(){
        onEnd()
        cb.apply(null, arguments)
      })
    }

    function onStart(){
      console.log(label, 'start')
    }
    function onEnd(){
      console.log(label, 'end')
    }
    
  })

  return newTasks
}

function keyValuesFor(obj){
  return Object.keys(obj).map(function(key){
    return {
      key,
      value: obj[key],
    }
  })
}