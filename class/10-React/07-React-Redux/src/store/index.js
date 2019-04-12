import { createStore ,applyMiddleware } from 'redux'
import redurce from './reducer.js'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

const middleware = [thunk];

if(process.env.NODE_ENV != 'production'){
	const logger = createLogger({
  		// ...options
	});

	middleware.push(logger)
}




let store = createStore(redurce, applyMiddleware(...middleware))



export default store