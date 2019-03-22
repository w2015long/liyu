


// const m05 = require('D:/liyu/wl2018/11-node.js/01-module/file/m05.js');

// const m05 = require('./m05.js');
/*
首先按照模块的文件名进行查找
如果没有找到,则会在模块名称后面加上.js后缀进行查找
如果还没有找到,则会在模块名称后面加上.json后缀进行查找
如果还没有找到,则会在模块名称后面加上.node 后缀进行查找
如果还没有找到,则会报错
 */

// const m09 = require('./m09')
// const m05 = require('./m05');

const m08 = require('./m08')

console.log(m08);