var router=require("express").Router();
	
router.get('/logout',function(req,res){
		//释放session
		req.session.destroy();
		res.redirect('index');
	});

module.exports=router;
