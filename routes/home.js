var router=require("express").Router();

	router.get('/home',function(req,res){
		res.render('home');
	})

module.exports=router;
