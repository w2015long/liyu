import { createStore } from 'redux'
import redurce from './reducer.js'

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(redurce)





export default store