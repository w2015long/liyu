

//一个二进制的0 或者 1 代表了 1bit(位)
//8bit(位) = 1B(字节) = 2个16进制数
//00000000 - 11111111
//000 - 255
//0 - ff


//1个英文字符 = 1B
console.log(Buffer.from('hello'));//<Buffer 68 65 6c 6c 6f>
//1个汉字 = 3B
console.log(Buffer.from('沉甸甸'));//<Buffer e6 b2 89 e7 94 b8 e7 94 b8>