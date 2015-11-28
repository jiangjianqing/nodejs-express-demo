//var MongoDB=require('mongodb');
//var server=new MongoDB.Server("localhost",27017,{safe:true});
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=mongoose.Schema({
	username:String,
	password:String
});//定义模型，但还未和users集合关联

var userModel={
	
	user:mongoose.model('users',userSchema),//与users集合关联
	
	findUser:function(criteria,callback){
		this.user.find(criteria,function(err,doc){
			console.log(err);
			console.log(doc);
			callback(doc.length>0);
		})	
	}

};

exports.user=userModel;

//var db=monk('localhost:27017/test-app');

//var user=db.get('users');

//user.find({}, function(err, docs) {
//	      console.log(docs)
//});

//products.insert({"name":"orange juice","description":"just so so"})
/*
products.find({"name":"apple juice"}, function(err, docs) {
	   console.log(docs)
})
*/

//exports.user=user;
