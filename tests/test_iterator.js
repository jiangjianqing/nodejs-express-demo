/**
 * Created by cz_jjq on 16/10/23.
 */

var iterator = require('../jsframework/iterator');

var a = [1,2,3];

iterator.forEach(a,function(val,key){
    console.log('key='+key+' , val='+val)
})

var b = {
    't1':'test1',
    't2':'test2'
}

iterator.forEach(b,function(val,key){
    console.log('key='+key+' , val='+val)
})

var a1=iterator.map(a,function(val,key){
    return val*5;
})

var b1=iterator.map(b,function(val,key){
    return val+"_ok";
})

console.log(a1);
console.log(b1);