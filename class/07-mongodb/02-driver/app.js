
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'liyu';

// Create a new MongoClient
const client = new MongoClient(url,{ useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect((err)=> {
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  //Insert a Document
  const school = db.collection('school');
  /*
  school.insertMany(
  		[
  			{name:'Anmy',age:33,major:'computer'},
  			{name:'Leo',age:23,major:'English'}
  		],
	  	
	  	(err,result)=>{
	  		if(err) return console.log('insertMany err',err);
	  		console.log(result);
	  	}
  )
  */
 /*
  school.find({name:'Leo'}).toArray((err, docs)=>{
  		if(err) return console.log('find err',err);
	  	console.log(docs);
  })
	


  school.updateOne({name:'Leo'},{$set:{name:'Mike'}},(err, result)=>{
  		if(err) return console.log('updateOne err',err);
	  	console.log(result);
  })
*/
  school.deleteOne({name:'Anmy'},(err, result)=>{
  		if(err) return console.log('deleteOne err',err);
	  	console.log(result);
  })
  client.close();

});
