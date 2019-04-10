
import React from 'react'
import ReactDOM from 'react-dom'



ReactDOM.render(<h1>Hello React!</h1>,document.getElementById('root')) 

/*
//version 1
import {aNum,b} from './App.js'
console.log(aNum,b)
*/

/*
//version 2
import {a} from './App.js'
console.log(a)
*/

/*
//version 3
import {str as message} from './App.js'
console.log(message)
*/


//version 4

import message from './App.js'

console.log(message)
