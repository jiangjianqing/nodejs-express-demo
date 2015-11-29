var express=require('express');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
//var RedisStore = require('connect-redis')(session);


var app=express();

//app.configure(function() {  
	  //默认情况下Express并不知道该如何处理该请求体，因此我们需要增加bodyParser中间件，用于分析  
	  //application/x-www-form-urlencoded和application/json  
	  //请求体，并把变量存入req.body。我们可以像下面的样子来“使用”中间件[这个保证POST能取到请求参数的值]：     
	// app.use(express.bodyParser());  
//}); 

var bodyParser=require('body-parser');
//var multer=require('multer');

//middleware body-parser和multer用于处理和解析post请求的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(multer());
/* 
支持两种数据库进行session持久化
store: new MongoStore({   //创建新的mongodb数据库
         host: 'localhost',    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
         port: 27017,          //数据库的端口号
         db: 'test-app'        //数据库的名称。
     })

var redisOptions = {
    "host": "127.0.0.1",
	    "port": "6379",
		    "ttl": 60 * 60 * 24 * 30,   //session的有效期为30天(秒)
			};
var mongoOptions={
	host:'localhost',
	port:27017,
	db:'test-app'
};
*/

var mongoOptions={
	host:'localhost',
	port:27017,
	db:'test-app'
};

app.use(cookieParser());
app.use(session({
	/*
	    store: new MongoStore(
			mongoOptions
			    ),
			*/
/*
		store: new RedisStore(redisOptions), 
			    */
	    secret:'secret',
	    resave:true,
	    saveUninitialized:false,
	    cookie:{
			        maxAge:1000*60*10  //过期时间设置(单位毫秒)
						    }
}));

//设定静态资源目录
app.use(express.static(require('path').join(__dirname, 'static')));

//修改模板文件的后缀名为html
app.set("view engine",'html');
app.set("views",__dirname+"/views");
//运行ejs模板engine
//app.engine('.html',require('ejs').__express);
//使用handlebars作为模板engine
app.engine("html",require('hbs').__express);

//middleware
//
//中间件的放置顺序很重要，等同于执行顺序。而且，中间件必须放在HTTP动词方法之前，否则不会执行。
//回调函数的next参数，表示接受其他中间件的调用，函数体中的next()，表示将请求数据传递给下一个中间件。
app.use(function(req,res,next){
	//res.locals对象保存在一次请求范围内的响应体中的本地变量值。
	res.locals.user = req.session.user;
	var err=req.session.err;
	res.locals.message="";

	if(err){
		res.locals.message= err;
	}

	//res.cookie('isVisit','i am a cookie',{ maxAge: 20000,httpOnly:true, path:'/'});
	if(req.cookies.isVisit){
	}else{
		res.cookie('isVisit',1,{maxAge:60*1000});
		console.log('欢迎第一次访问');
	}
	console.log("cookies:\n");
	console.log(req.cookies);
	console.log('\nhttp info:')
	console.log("method:"+req.method+"===="+"url:"+req.url);
	console.log("host:"+req.hostname+"====="+"path:"+req.path);
	
	//登录验证
	var url = req.originalUrl;
	console.log("url=%s,user=%s",url,req.session.user);
	if(url!="/login" && !req.session.user){
		req.session.err="请先登录";
		return res.redirect('login');
	}else{
		next();
	}
});

app.all("*",function(req,res,next){
	//设置响应头
	//res.writeHead(200,{..})这样的写法有问题
	res.header({"Content-Type":"text/html;charset=utf-8","my-head":"head1"});
	next();
});

app.get('/',function(req,res){
	//通过req.query获取get请求路径的对象参数值。
	//格式：req.query.参数名；
	if(req.query.n){
		console.log("n参数=%s",req.query.n);
	};
	//res.sendStatus(200);//发送状态码
	//res.send("欢迎来到首页");
	//response跳转
	//res.redirect("http://www.hubwiz.com");
	//res.redirect("login");
	res.render('index');
});

app.get('/index',function(req,res){
	res.render("index");	
});


app.use(require("./login"));
app.use(require("./home"));
app.use(require("./logout"));

//这段代码放在路由的最下端，也就是express模板找不到匹配的路由，就执行最下面的这个404中间件了。
//一般而言中间价都是app.use();定义的，具体的你可以根据你自己的业务经行写，你也可以用来做运行日志。：)
app.use(function(req,res){
			res.render("404");
				 });

app.listen(9090);

