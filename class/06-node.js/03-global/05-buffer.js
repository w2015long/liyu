

//一个二进制的0 或者 1 代表了 1bit(位)
//8bit(位) = 1B(字节) = 2个16进制数
//00000000 - 11111111
//000 - 255
//0 - ff


//1个英文字符 = 1B
console.log(Buffer.from('hello'));//<Buffer 68 65 6c 6c 6f>
//1个汉字 = 3B
console.log(Buffer.from('沉甸甸'));//<Buffer e6 b2 89 e7 94 b8 e7 94 b8>

const buf1 = Buffer.alloc(8);
console.log(buf1);//<Buffer 00 00 00 00 00 00 00 00>

buf1[0] = 10;//十进制
console.log(buf1);//<Buffer 0a 00 00 00 00 00 00 00>

buf1[1] = 0xff;//十六进制
console.log(buf1);//<Buffer 0a ff 00 00 00 00 00 00>

const buf2 = Buffer.alloc(9);
buf2[0] = 0xe6;
buf2[1] = 0xb2;
buf2[2] = 0x89;
buf2[3] = 0xe7;
buf2[4] = 0x94;
buf2[5] = 0xb8;

console.log(String(buf2));