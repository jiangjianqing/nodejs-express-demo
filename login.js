"use strict";
var mongoose = require('mongoose');
var user = require('./models/user').user;

mongoose.connect('mongodb://localhost/test-app');

var router=require('express').Router();

	router.get('/login',function(req,res){
		res.render('login');
	});

	router.post('/login',function(req,res){

		console.log(req.body)

		var query_doc = {username: req.body.username, password: req.body.password};
		user.findUser(query_doc,function(isFound){
			if(isFound){
				req.session.user=query_doc;
				req.session.err=null;
				res.sendStatus(200);
			}else{
				req.session.err="";
				res.sendStatus(404);
			};
		});
		/*
		if(req.body.username==user.username&&req.body.password==user.password){
			req.session.user=user;
			req.session.err=null;
			res.sendStatus(200);
		}else{
			req.session.err="用户名或密码不正确";
			res.sendStatus(404);
		}
		*/
	});

module.exports=router;
