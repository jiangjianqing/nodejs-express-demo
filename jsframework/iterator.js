/**
 * Created by cz_jjq on 16/10/23.
 */

var isArraylike = function(obj){
    if (Array.isArray(obj))
        return true;

    if (typeof object !== 'object'){
        return false;
    }

    if (obj.length && typeof obj.length === 'number')
        return true;

    return false;
}

var isObject = function(obj){
    return typeof object !== 'object'
}

var forEach = function(obj,iterator,context){
    if(!!context)
        context=this;
    if(isArraylike(obj)){
        for(var i=0,val;val=obj[i];i++){
            iterator.call(context,val,i);
        }
        return;
    }

    if(isObject(obj)){
        var keys=Object.keys(obj);
        for(var i=0,key;key=keys[i++];){
            iterator.call(context,obj[key],key);
        }
        return;
    }
    throw new Error('invalid forEach param!!!!');
}

var arrayMap = function(ary,iterator,context){
    var ret = [];
    forEach(ary,function(val,key){
        ret.push(iterator.call(context,val,key));
    },context);
    return ret;
}

var objectMap = function(obj,iterator,context){
    var ret = {};
    forEach(obj,function(val,key){
        ret[key] = iterator.call(context,val,key);
    },context);
    return ret;
}

var map=function(obj,iterator,context){
    if(!!context)
        context=this;
    /* TODO : 这里考虑加入策略模式
    var checks={
        'isArraylike'
        ,'isObject'};
    for(var i=0,check;check=checks[i++];){
        if(check(obj))
    }*/

    if(isArraylike(obj)){
        return arrayMap.call(this,obj,iterator,context);
    }
    if(isObject(obj)){
        return objectMap.call(this,obj,iterator,context)
    }
    throw new Error('invalid map param!!!!');
}

module.exports.forEach=forEach;
module.exports.map=map;