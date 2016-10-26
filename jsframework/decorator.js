/**
 * Created by cz_jjq on 16/10/23.
 */
//注意:decorator模式下会导致绑定在本体函数上的自定义属性丢失,所以运用之前要确定本体函数上没有多余的自定义属性

if(!Function.prototype.before){
    //##下面两个函数都可以用于AOP模式的编程
    Function.prototype.before=function(beforeFn){
        var self=this;  //保留函数本体引用
        return function(){  //返回的函数按照顺序执行下面两个函数,而且共用arguments,这意味着在beforeFn中可以对参数进行必要的修改,AOP!!
            //执行新函数,且保证this不会被劫持,很多时候本体函数内部使用了this
            if (beforeFn.apply(this,arguments)===false){    //在beforeFn中返回false代表不用执行本体,这可以应用于校验等场合
                return;
            }
            return self.apply(this,arguments);
        }
    }

    Function.prototype.after=function(afterFn){
        var self=this;
        return function(){  //返回的函数按照顺序执行下面两个函数,而且共用arguments,这意味着在beforeFn中可以对参数进行必要的修改,AOP!!
            var ret = self.apply(this,arguments);
            afterFn.apply(this,arguments);
            return ret;
        }
    }
}

//以下两个函数可以不污染global对象(在浏览器中为windows)
var createBeforeDecoratorFn=function(fn,beforeFn,context){  //context用于指定执行时的上下文环境
    return function(){
        if(!!context){
            context=this;
        }
        if(beforeFn.apply(context,arguments)===false){
            return;
        }
        return fn.apply(context,arguments)
    }
}

var createAfterDecoratorFn=function(fn,afterFn,context){  //context用于指定执行时的上下文环境
    return function(){
        if(!!context){
            context=this;
        }
        var ret = fn.apply(context,arguments);
        afterFn.apply(context,arguments);
        return ret;
    }
}

module.exports={
    'createBeforeDecoratorFn':createBeforeDecoratorFn,
    'createAfterDecoratorFn':createAfterDecoratorFn
}