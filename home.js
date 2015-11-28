var router=require("express").Router();

	router.get('/home',function(req,res){
		if(req.session.user){
			res.render('home');
		}else{
			req.session.err="请先登录";
			res.redirect('login');
		}
	})

module.exports=router;
